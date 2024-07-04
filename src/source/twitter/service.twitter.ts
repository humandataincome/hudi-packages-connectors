import LoggerUtils from "../../utils/logger.utils";
import {ParserUtils} from "../../utils/parser.utils";
import {AccountTW} from "./model.twitter";
import {ValidatorObject} from "../../utils/validator/validator.object";
import {FileCodeTwitter} from "./enum.twitter";

/**
 * Class used to parse most important files into the directory returned by Twitter in JS format.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceTwitter {
    private static readonly logger = new LoggerUtils("Twitter Service");

    /**
     * Abstraction to parse a Twitter file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeTwitter, data: Buffer) {
        switch (fileCode) {
            case FileCodeTwitter.ACCOUNT:
                return this.parseAccount(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - file 'data/account.js' in input as Buffer
     */
    static async parseAccount(data: Buffer): Promise<AccountTW | undefined> {
        let model: AccountTW = {};
        try {
            const jsonFormat = ParserUtils.extractJsonFromTwitterFile(data);
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
                    return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
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
