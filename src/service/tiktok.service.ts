import Logger from "../utils/logger";
import {ValidatorFiles} from "../validator";
import {UserDataTK} from "../model";

export class TikTokService {
    private static readonly logger = new Logger("TikTok Service");

    /**
     * @param data - file 'user_data.json' in input as Buffer
     */
    static async parseUserData(data: Buffer): Promise<UserDataTK | undefined> {
        let userDataModel: UserDataTK = {};
        try {
            let document = JSON.parse(data.toString());
            if (document && document['Activity']) {
                document = document['Activity'];
                //subsection: Favorite Effects
                if (document['Favorite Effects']) {

                }
                //subsection: Favorite Hashtags
                if (document['Favorite Hashtags']) {

                }
                //subsection: Favorite Sounds
                if (document['Favorite Sounds']) {

                }
                //subsection: Favorite Videos
                if (document['Favorite Videos']) {

                }
                //subsection: Follower List
                if (document['Follower List']) {

                }
                //subsection: Following List
                if (document['Following List']) {

                }
                //subsection: Hashtag
                if (document['Hashtag']) {

                }
                //subsection: Like List
                if (document['Like List']) {

                }
                //subsection: Login History
                if (document['Login History']) {

                }
                //subsection: Share History
                if (document['Share History']) {

                }
                //subsection: Status
                if (document['Status']) {

                }
                //subsection: Video Browsing History
                if (document['Video Browsing History']) {

                }
                //subsection: Ads and data
                if (document['Ads and data']) {

                }
                //subsection: App Settings
                if (document['App Settings']) {

                }
                //subsection: Comment
                if (document['Comment']) {

                }
                //subsection: Direct Messages
                if (document['Direct Messages']) {

                }
                //subsection: Profile
                if (document['Profile']) {

                }
                //subsection: Tiktok Live
                if (document['Tiktok Live']) {

                }
                //subsection: Tiktok Shopping
                if (document['Tiktok Shopping']) {

                }
                //subsection: Video
                if (document['Video']) {

                }
            }
            return !ValidatorFiles.objectIsEmpty(userDataModel) ? userDataModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseUserData');
            return undefined;
        }
    }
}
