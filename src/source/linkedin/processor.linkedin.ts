import {staticImplements} from "../../utils/decorator.utils";
import {ProcessorGDPRDatasource, ProcessorOptions, ValidatorObject} from "../../utils";
import LoggerUtils from "../../utils/logger.utils";
import {Unzipped, unzipSync} from "fflate";
import {LinkedInDataAggregator} from "./model.linkedin";
import {ServiceLinkedin} from "./service.linkedin";
import {FileCodeLinkedIn} from "./enum.linkedin";

@staticImplements<ProcessorGDPRDatasource>()
export class ProcessorLinkedin {
    private static readonly logger = new LoggerUtils("Processor LinkedIn");

    static initAggregator(): LinkedInDataAggregator {
        return {profile: {}, jobs: {}, ads:{}};
    }

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from LinkedIn datasource
     */
    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<LinkedInDataAggregator | undefined> {
        try {
            const files: Unzipped = unzipSync(zipFile);
            const model: LinkedInDataAggregator = this.initAggregator();
            for (let pathName in files) {
                const file = files[pathName];
                const data = Buffer.from(file, file.byteOffset, file.length);
                if (!ValidatorObject.isDirectory(pathName)) {
                    await this.aggregatorBuilder(data, pathName, model, options);
                }
            }
            if (!ValidatorObject.objectIsEmpty(model)) {
                model.creationDate = new Date();
                return model;
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'zipAggregatorBuilder'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;

            }
        }
        return undefined;
    }

    static async aggregatorBuilder(data: Buffer, pathName: string, model: LinkedInDataAggregator, options: ProcessorOptions = {}) {
        let result, regex;
        if ((regex = new RegExp(FileCodeLinkedIn.EMAIL_ADDRESSES)) && (regex.test(pathName))) {
            result = await ServiceLinkedin.parseEmails(data);
            (result) && (model.profile.emails = result);
        } else if ((regex = new RegExp(FileCodeLinkedIn.PROFILE)) && (regex.test(pathName))) {
            result = await ServiceLinkedin.parseProfile(data);
            (result) && (model.profile.info = result);
        } else if ((regex = new RegExp(FileCodeLinkedIn.JOBS_APPLICATIONS)) && (regex.test(pathName))) {
            result = await ServiceLinkedin.parseJobApplications(data);
            (result) && (model.jobs.applications = result);
        } else if ((regex = new RegExp(FileCodeLinkedIn.JOBS_SEEKER_PREFERENCES)) && (regex.test(pathName))) {
            result = await ServiceLinkedin.parseJobSeekerPreferences(data);
            (result) && (model.jobs.seekerPreferences = result);
        } else if ((regex = new RegExp(FileCodeLinkedIn.POSITIONS)) && (regex.test(pathName))) {
            result = await ServiceLinkedin.parseWorkingPositions(data);
            (result) && (model.jobs.workingPositionHistory = result);
        } else if ((regex = new RegExp(FileCodeLinkedIn.ADS_CLICKED)) && (regex.test(pathName))) {
            result = await ServiceLinkedin.parseAdsClicked(data);
            (result) && (model.ads.clicked = result);
        } else if ((regex = new RegExp(FileCodeLinkedIn.ADS_TARGETING)) && (regex.test(pathName))) {
            result = await ServiceLinkedin.parseAdsTargeting(data);
            (result) && (model.ads.targeting = result);
        } else if ((regex = new RegExp(FileCodeLinkedIn.EDUCATION)) && (regex.test(pathName))) {
            result = await ServiceLinkedin.parseEducationHistory(data);
            (result) && (model.education = result);
        } else if ((regex = new RegExp(FileCodeLinkedIn.SKILLS)) && (regex.test(pathName))) {
            result = await ServiceLinkedin.parseSkills(data);
            (result) && (model.skills = result);
        }
    }
}
