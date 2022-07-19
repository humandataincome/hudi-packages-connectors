import Logger from "../utils/logger";
import {ValidatorFiles} from "../validator";
import {Parser} from "../utils/parser";
import {AccountTW} from "../model";

/**
 * Class used to parse most important files into the directory returned by Twitter in JS format.
 * All the files are given in input as Buffer, parsed back to JS and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class TwitterService {
    private static readonly logger = new Logger("Twitter Service");

    /**
     * @param data - file 'data/account.js' in input as Buffer
     */
    static async parseAccount(data: Buffer): Promise<AccountTW | undefined> {
        let model: AccountTW = {};
        try {
            const jsonFormat = Parser.extractJsonFromTwitterFile(data);
            if (jsonFormat) {
                let document = JSON.parse(jsonFormat.toString());
                if (document && document[0] && document[0].account) {
                    document = document[0].account;
                    (document.email) && (model.email = document.email);
                    (document.createdVia) && (model.createdVia = document.createdVia);
                    (document.username) && (model.username = document.username);
                    (document.accountId) && (model.accountId = document.accountId);
                    (document.createdAt) && (model.createdAt = new Date(document.createdAt));
                    (document.accountDisplayName) && (model.accountDisplayName = document.accountDisplayName);
                    return !ValidatorFiles.objectIsEmpty(model) ? model : undefined;
                }
            } else {
                throw Error('It\'s not possible to extract a JSON from the given JS file');
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAccount');
        }
        return undefined;
    }
}
