import LoggerUtils from "../../utils/logger.utils";
import {ProcessorGDPRDatasource, ProcessorOptions, ValidatorObject} from "../../utils";
import {Unzipped, unzipSync} from "fflate";
import {staticImplements} from "../../utils/decorator.utils";
import {FileCodeReddit} from "./enum.reddit";
import {ServiceReddit} from "./service.reddit";
import {RedditDataAggregator} from "./model.reddit";

@staticImplements<ProcessorGDPRDatasource>()
export class ProcessorReddit {
    private static readonly logger = new LoggerUtils("Processor Reddit");

    static initAggregator(): RedditDataAggregator {
        return {};
    }

    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<RedditDataAggregator | undefined> {
        try {
            const files: Unzipped = unzipSync(zipFile);
            const model: RedditDataAggregator = this.initAggregator();
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

    static async aggregatorBuilder(data: Buffer, pathName: string, model: RedditDataAggregator, options: ProcessorOptions = {}) {
        let result, regex;
        if ((regex = new RegExp(FileCodeReddit.SUBSCRIBED_SUBREDDITS)) && (regex.test(pathName))) {
            result = await ServiceReddit.parseSubscribedSubreddit(data);
            (result) && (model.subreddits = result);
        } else if ((regex = new RegExp(FileCodeReddit.COMMENTS)) && (regex.test(pathName))) {
            result = await ServiceReddit.parseComments(data);
            (result) && (model.comments = result);
        } else if ((regex = new RegExp(FileCodeReddit.FRIENDS)) && (regex.test(pathName))) {
            result = await ServiceReddit.parseFriends(data);
            (result) && (model.friends = result);
        } else if ((regex = new RegExp(FileCodeReddit.MESSAGES)) && (regex.test(pathName))) {
            result = await ServiceReddit.parseMessages(data);
            (result) && (model.messages = result);
        } else if ((regex = new RegExp(FileCodeReddit.POSTS)) && (regex.test(pathName))) {
            result = await ServiceReddit.parsePosts(data);
            (result) && (model.posts = result);
        } else if ((regex = new RegExp(FileCodeReddit.REDDIT_GOLD_INFO)) && (regex.test(pathName))) {
            result = await ServiceReddit.parseGoldInfo(data);
            (result) && (model.goldInfo = result);
        } else if ((regex = new RegExp(FileCodeReddit.STATISTICS)) && (regex.test(pathName))) {
            result = await ServiceReddit.parseStatistics(data);
            (result) && (model.statistics = result);
        }
    }
}
