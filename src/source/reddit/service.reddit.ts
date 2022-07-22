import Logger from "../../utils/logger";
import {Parser} from "../../utils/parser";
import {SubscribedSubredditRE} from "./model.reddit";

/**
 * Class used to parse most important files into the directory returned by Reddit in CSV format.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceReddit {
    private static readonly logger = new Logger("Reddit Service");

    /**
     * @param data - file 'subscribed_subreddits.csv' in input as Buffer
     */
    static async parseSubscribedSubreddit(data: Buffer): Promise<SubscribedSubredditRE | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result && result[0]) {
                let modelInfo: SubscribedSubredditRE = {listSubreddits: []};
                modelInfo.listSubreddits = result.map((entry: any) => {
                    if (entry['subreddit'] != '') {
                        return modelInfo.listSubreddits = entry['subreddit'];
                    }
                });
                return modelInfo;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSubscribedSubreddit');
        }
        return undefined;
    }
}
