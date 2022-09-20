import {staticImplements} from "../../utils/decorator";
import {ProcessorGDPRDatasource, ProcessorOptions, ValidatorObject} from "../../utils";
import Logger from "../../utils/logger";
import {TiktokDataAggregator} from "./model.tiktok";
import {FileCodeTikTok} from "./enum.tiktok";
import {ServiceTiktok} from "./service.tiktok";
import {Unzipped, unzipSync} from "fflate";

@staticImplements<ProcessorGDPRDatasource>()
export class ProcessorTiktok {
    private static readonly logger = new Logger("Processor TikTok");

    static initAggregator(): TiktokDataAggregator {
        return {
            userData: {}
        };
    }

    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<TiktokDataAggregator | undefined> {
        try {
            const files: Unzipped = unzipSync(zipFile);
            const model: TiktokDataAggregator = this.initAggregator();
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

    static async aggregatorBuilder(data: Buffer, pathName: string, model: TiktokDataAggregator, options: ProcessorOptions = {}) {
        let result, regex;
        if ((regex = new RegExp(FileCodeTikTok.USER_DATA)) && (regex.test(pathName))) {
            result = await ServiceTiktok.parseUserData(data);
            if (result) {
                (result.favoriteVideos) && (model.userData.favoriteVideos = result.favoriteVideos);
                (result.followersList) && (model.userData.followersList = result.followersList);
                (result.followingList) && (model.userData.followingList = result.followingList);
                (result.videoLiked) && (model.userData.videoLiked = result.videoLiked);
                (result.searchHistory) && (model.userData.searchHistory = result.searchHistory);
                (result.shareHistory) && (model.userData.shareHistory = result.shareHistory);
                (result.videoBrowsingHistory) && (model.userData.videoBrowsingHistory = result.videoBrowsingHistory);
                (result.profile) && (model.userData.profile = result.profile);
            }
        }
    }
}
