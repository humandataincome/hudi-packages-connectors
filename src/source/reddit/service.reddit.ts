import LoggerUtils from "../../utils/logger.utils";
import {ParserUtils} from "../../utils/parser.utils";
import {
    CommentRE,
    CommentsRE,
    FriendRE,
    FriendsRE, GoldInfoEntryRE, GoldInfoRE,
    MessageRE,
    MessagesRE, PostRE,
    PostsRE, StatisticsRE,
    SubscribedSubredditRE
} from "./model.reddit";
import {FileCodeReddit} from "./enum.reddit";
import {ValidatorObject} from "../../validator";

/**
 * Class used to parse most important files into the directory returned by Reddit in CSV format.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceReddit {
    private static readonly logger = new LoggerUtils("Reddit Service");

    /**
     * Abstraction to parse a Reddit file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeReddit, data: Buffer) {
        switch (fileCode) {
            case FileCodeReddit.COMMENTS:
                return this.parseComments(data);
            case FileCodeReddit.FRIENDS:
                return this.parseFriends(data);
            case FileCodeReddit.MESSAGES:
                return this.parseMessages(data);
            case FileCodeReddit.POSTS:
                return this.parsePosts(data);
            case FileCodeReddit.REDDIT_GOLD_INFO:
                return this.parseGoldInfo(data);
            case FileCodeReddit.SUBSCRIBED_SUBREDDITS:
                return this.parseSubscribedSubreddit(data);
            case FileCodeReddit.STATISTICS:
                return this.parseStatistics(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - FileCodeReddit.STATISTICS file in input as Buffer
     */
    static async parseStatistics(data: Buffer): Promise<StatisticsRE | undefined> {
        try {
            const result = ParserUtils.parseCSVfromBuffer(data);
            if (result) {
                const model: StatisticsRE = {};
                result.forEach(({statistic, value})=> {
                    if (statistic === "account name") {
                        (model.accountName = value);
                    } else if (statistic === "export time") {
                        const match = value.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) UTC/);
                        (model.exportDate = new Date(Date.UTC(parseInt(match[1]), match[2], match[3], match[4], match[5], match[6])));
                    } else if (statistic === "is_deleted") {
                        (model.isDeleted = value.toLowerCase() === 'true');
                    } else if (statistic === "registration date") {
                        const match = value.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) UTC/);
                        (model.registrationDate = new Date(Date.UTC(parseInt(match[1]), match[2], match[3], match[4], match[5], match[6])));
                    } else if (statistic === "email verified") {
                        (model.emailVerified = value.toLowerCase() === 'true');
                    } else if (statistic === "email address") {
                        (model.emailAddress = value);
                    }
                });
                return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseStatistics');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeReddit.REDDIT_GOLD_INFO file in input as Buffer
     */
    static async parseGoldInfo(data: Buffer): Promise<GoldInfoRE | undefined> {
        try {
            const result = ParserUtils.parseCSVfromBuffer(data);
            if (result) {
                const model: GoldInfoRE = {list: []};
                model.list = result.map((entry: any) => {
                    const subModel: GoldInfoEntryRE = {};
                    (ValidatorObject.isCSVFieldValid(entry.processor)) && (subModel.processor = entry.processor);
                    (ValidatorObject.isCSVFieldValid(entry.transaction_id)) && (subModel.transactionID = entry.transaction_id);
                    if (ValidatorObject.isCSVFieldValid(entry.date)) {
                        const match = entry.date.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) UTC/);
                        (subModel.date = new Date(Date.UTC(parseInt(match[1]), match[2], match[3], match[4], match[5], match[6])));
                    }
                    (ValidatorObject.isCSVFieldValid(entry.cost)) && (subModel.cost = entry.cost);
                    (ValidatorObject.isCSVFieldValid(entry.payer_email)) && (subModel.payerEmail = entry.payer_email);
                    return subModel;
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseGoldInfo');
        }
        return undefined;
    }
    /**
     * @param data - FileCodeReddit.POSTS file in input as Buffer
     */
    static async parsePosts(data: Buffer): Promise<PostsRE | undefined> {
        try {
            const result = ParserUtils.parseCSVfromBuffer(data);
            if (result) {
                const model: PostsRE = {list: []};
                model.list = result.map((entry: any) => {
                    const subModel: PostRE = {};
                    (ValidatorObject.isCSVFieldValid(entry.id)) && (subModel.id = entry.id);
                    (ValidatorObject.isCSVFieldValid(entry.permalink)) && (subModel.permalink = entry.permalink);
                    if (ValidatorObject.isCSVFieldValid(entry.date)) {
                        const match = entry.date.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) UTC/);
                        (subModel.date = new Date(Date.UTC(parseInt(match[1]), match[2], match[3], match[4], match[5], match[6])));
                    }
                    (ValidatorObject.isCSVFieldValid(entry.ip)) && (subModel.ip = entry.ip);
                    (ValidatorObject.isCSVFieldValid(entry.subreddit)) && (subModel.subreddit = entry.subreddit);
                    (ValidatorObject.isCSVFieldValid(entry.gildings)) && (subModel.gildings = entry.gildings);
                    (ValidatorObject.isCSVFieldValid(entry.title)) && (subModel.title = entry.title);
                    (ValidatorObject.isCSVFieldValid(entry.url)) && (subModel.url = entry.url);
                    (ValidatorObject.isCSVFieldValid(entry.body)) && (subModel.body = entry.body);
                    return subModel;
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePosts');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeReddit.MESSAGES file in input as Buffer
     */
    static async parseMessages(data: Buffer): Promise<MessagesRE | undefined> {
        try {
            const result = ParserUtils.parseCSVfromBuffer(data);
            if (result) {
                const model: MessagesRE = {list: []};
                model.list = result.map((entry: any) => {
                    const subModel: MessageRE = {};
                    (ValidatorObject.isCSVFieldValid(entry.id)) && (subModel.id = entry.id);
                    (ValidatorObject.isCSVFieldValid(entry.permalink)) && (subModel.permalink = entry.permalink);
                    (ValidatorObject.isCSVFieldValid(entry.thread_id)) && (subModel.threadId = entry.thread_id);
                    if (ValidatorObject.isCSVFieldValid(entry.date)) {
                        const match = entry.date.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) UTC/);
                        (subModel.date = new Date(Date.UTC(parseInt(match[1]), match[2], match[3], match[4], match[5], match[6])));
                    }
                    (ValidatorObject.isCSVFieldValid(entry.ip)) && (subModel.ip = entry.ip);
                    (ValidatorObject.isCSVFieldValid(entry.from)) && (subModel.from = entry.from);
                    (ValidatorObject.isCSVFieldValid(entry.to)) && (subModel.to = entry.to);
                    (ValidatorObject.isCSVFieldValid(entry.subject)) && (subModel.subject = entry.subject);
                    (ValidatorObject.isCSVFieldValid(entry.body)) && (subModel.body = entry.body);
                    return subModel;
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseMessages');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeReddit.FRIENDS file in input as Buffer
     */
    static async parseFriends(data: Buffer): Promise<FriendsRE | undefined> {
        try {
            const result = ParserUtils.parseCSVfromBuffer(data);
            if (result) {
                const model: FriendsRE = {list: []};
                model.list = result.map((entry: any) => {
                    const subModel: FriendRE = {};
                    (ValidatorObject.isCSVFieldValid(entry.username)) && (subModel.username = entry.username);
                    (ValidatorObject.isCSVFieldValid(entry.note)) && (subModel.note = entry.note);
                    return subModel;
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseFriends');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeReddit.COMMENTS file in input as Buffer
     */
    static async parseComments(data: Buffer): Promise<CommentsRE | undefined> {
        try {
            const result = ParserUtils.parseCSVfromBuffer(data);
            if (result) {
                const model: CommentsRE = {list: []};
                model.list = result.map((entry: any) => {
                    const subModel: CommentRE = {};
                    (ValidatorObject.isCSVFieldValid(entry.id)) && (subModel.id = entry.id);
                    (ValidatorObject.isCSVFieldValid(entry.permalink)) && (subModel.permalink = entry.permalink);
                    if (ValidatorObject.isCSVFieldValid(entry.date)) {
                        const match = entry.date.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) UTC/);
                        (subModel.date = new Date(Date.UTC(parseInt(match[1]), match[2], match[3], match[4], match[5], match[6])));
                    }
                    (ValidatorObject.isCSVFieldValid(entry.ip)) && (subModel.ip = entry.ip);
                    (ValidatorObject.isCSVFieldValid(entry.subreddit)) && (subModel.subreddit = entry.subreddit);
                    (ValidatorObject.isCSVFieldValid(entry.gildings)) && (subModel.gildings = entry.gildings);
                    (ValidatorObject.isCSVFieldValid(entry.link)) && (subModel.link = entry.link);
                    (ValidatorObject.isCSVFieldValid(entry.parent)) && (subModel.parent = entry.parent);
                    (ValidatorObject.isCSVFieldValid(entry.body)) && (subModel.body = entry.body);
                    return subModel;
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseComments');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeReddit.SUBSCRIBED_SUBREDDITS file in input as Buffer
     */
    static async parseSubscribedSubreddit(data: Buffer): Promise<SubscribedSubredditRE | undefined> {
        try {
            const result = ParserUtils.parseCSVfromBuffer(data);
            if (result && result[0]) {
                const model: SubscribedSubredditRE = {list: []};
                model.list = result.map((entry: any) => {
                    if (ValidatorObject.isCSVFieldValid(entry.subreddit)) {
                        return model.list = entry.subreddit;
                    }
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSubscribedSubreddit');
        }
        return undefined;
    }
}
