import Logger from "../utils/logger";
import {ValidatorFiles} from "../validator";
import {FollowerListTK, FollowingListTK, ProfileTK, UserDataTK} from "../model";
import {Months} from "../utils";

export class TikTokService {
    private static readonly logger = new Logger("TikTok Service");

    /**
     * @param data - file 'user_data.json' in input as Buffer
     */
    static async parseUserData(data: Buffer): Promise<UserDataTK | undefined> {
        let model: UserDataTK = {};
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
                    if (document['Follower List'].FansList) {
                        model.followerList = this.buildFollowersModel(document['Follower List'].FansList);
                    }
                }
                //subsection: Following List
                if (document['Following List']) {
                    if (document['Following List'].Following) {
                        model.followingList = this.buildFollowingModel(document['Following List'].Following);
                    }
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
                    model.profile = this.buildProfileModel(document['Profile']);
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
            return !ValidatorFiles.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseUserData');
            return undefined;
        }
    }

    private static buildFollowersModel<T extends { Date: string, UserName: string }>(list: T[]): FollowerListTK | undefined {
        const model: FollowerListTK = {followers: []};
        list.map((follower: T) => {
            if (follower && follower.Date && follower.UserName) {
                model.followers.push({
                    date: new Date(follower.Date),
                    username: follower.UserName
                });
            }
        });
        return (model.followers.length > 0) ? model : undefined;
    }

    private static buildFollowingModel<T extends { Date: string, UserName: string }>(list: T[]): FollowingListTK | undefined {
        const model: FollowingListTK = {followingList: []};
        list.map((follower: T) => {
            if (follower && follower.Date && follower.UserName) {
                model.followingList.push({
                    date: new Date(follower.Date),
                    username: follower.UserName
                });
            }
        });
        return (model.followingList.length > 0) ? model : undefined;
    }

    private static buildProfileModel(profile: any): ProfileTK | undefined {
        const model: ProfileTK = {};
        if (profile && profile['Profile Information'] && profile['Profile Information'].ProfileMap) {
            const profileMap = profile['Profile Information'].ProfileMap;
            if (profileMap.PlatformInfo) {
                (profileMap.PlatformInfo.Description) && (model.description = profileMap.PlatformInfo.Description);
                (profileMap.PlatformInfo.Name) && (model.name = profileMap.PlatformInfo.Name);
                (profileMap.PlatformInfo.Platform) && (model.platform = profileMap.PlatformInfo.Platform);
                (profileMap.PlatformInfo['Profile Photo']) && (model.profilePhoto = profileMap.PlatformInfo['Profile Photo']);
            }
            (profileMap.bioDescription) && (model.bioDescription = profileMap.bioDescription);
            if (profileMap.birthDate) {
                const match = profileMap.birthDate.match(/(\d+)-(\w+)-(\d+)/);
                const monthIndex = Months[match[2].toUpperCase()];
                model.birthDate = new Date (Date.UTC(parseInt(match[3]), parseInt(monthIndex)-1, parseInt(match[1])));
            }
            (profileMap.emailAddress) && (model.emailAddress = profileMap.emailAddress);
            (profileMap.likesReceived) && (model.likesReceived = profileMap.likesReceived);
            (profileMap.profilePhoto) && (model.profilePhoto = profileMap.profilePhoto);
            (profileMap.profileVideo) && (model.profileVideo = profileMap.profileVideo);
            (profileMap.telephoneNumber) && (model.telephoneNumber = profileMap.telephoneNumber);
            (profileMap.userName) && (model.userName = profileMap.userName);
        }
        return !ValidatorFiles.objectIsEmpty(model) ? model : undefined;
    }
}
