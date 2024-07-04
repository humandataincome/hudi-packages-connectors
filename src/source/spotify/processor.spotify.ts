import {staticImplements} from "../../utils/decorator.utils";
import LoggerUtils from "../../utils/logger.utils";
import {SpotifyDataAggregator} from "./model.spotify";
import {Unzipped, unzipSync} from "fflate";
import {FileCodeSpotify} from "./enum.spotify";
import {ServiceSpotify} from "./service.spotify";
import {ProcessorGDPRDatasource, ProcessorOptions} from "../../processor";
import {ValidatorObject} from "../../validator";

@staticImplements<ProcessorGDPRDatasource>()
export class ProcessorSpotify {
    private static readonly logger = new LoggerUtils("Processor Spotify");

    static initAggregator(): SpotifyDataAggregator {
        return {};
    }

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from Spotify datasource
     */
    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<SpotifyDataAggregator | undefined> {
        try {
            if (zipFile) {
                const files: Unzipped = unzipSync(zipFile);
                const model: SpotifyDataAggregator = this.initAggregator();
                for (let pathName in files) {
                    const file = files[pathName];
                    const data = Buffer.from(file, file.byteOffset, file.length);
                    if (!ValidatorObject.isDirectory(pathName)) {
                        await this.aggregatorBuilder(data, pathName, model, options = {...options});
                    }
                }
                if (!ValidatorObject.objectIsEmpty(model)) {
                    model.creationDate = new Date();
                    return model;
                }
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'zipAggregatorBuilder'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }


    static async aggregatorBuilder(data: Buffer, pathName: string, model: SpotifyDataAggregator, options: ProcessorOptions = {}) {
        let result, regex;
        if ((regex = new RegExp(FileCodeSpotify.FOLLOW)) && (regex.test(pathName))) {
            result = await ServiceSpotify.parseFollow(data);
            (result) && (model.follow = result);
        } else if ((regex = new RegExp(FileCodeSpotify.IDENTIFIERS)) && (regex.test(pathName))) {
            result = await ServiceSpotify.parseIdentifiers(data);
            (result) && (model.identifiers = result);
        } else if ((regex = new RegExp(FileCodeSpotify.INFERENCES)) && (regex.test(pathName))) {
            result = await ServiceSpotify.parseInferences(data);
            (result) && (model.inferences = result);
        } else if ((regex = new RegExp(FileCodeSpotify.PLAYLIST)) && (regex.test(pathName))) {
            result = await ServiceSpotify.parsePlaylists(data);
            (result) && (model.playlists = result);
        } else if ((regex = new RegExp(FileCodeSpotify.STREAMING_HISTORY)) && (regex.test(pathName))) {
            result = await ServiceSpotify.parseStreamingHistory(data);
            (result) && (model.streamingHistory = result);
        } else if ((regex = new RegExp(FileCodeSpotify.USERDATA)) && (regex.test(pathName))) {
            result = await ServiceSpotify.parseUserdata(data);
            (result) && (model.userData = result);
        } else if ((regex = new RegExp(FileCodeSpotify.YOUR_LIBRARY)) && (regex.test(pathName))) {
            result = await ServiceSpotify.parseYourLibrary(data);
            (result) && (model.yourLibrary = result);
        }
    }

}
