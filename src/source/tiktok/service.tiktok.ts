import Logger from "../../utils/logger";
import {FollowerListTK, FollowingListTK, ProfileTK, UserDataTK} from "./model.tiktok";
import {Months} from "../../utils";
import {ValidatorObject} from "../../utils/validator/validator.object";

export class ServiceTiktok {
    private static readonly logger = new Logger("TikTok Service");

    /**
     * @param data - file 'user_data.json' in input as Buffer
     */
    static async parseUserData(data: Buffer): Promise<UserDataTK | undefined> {
        let model: UserDataTK = {};
        try {
            let document = JSON.parse(data.toString());
            if (document && document['Activity']) {
                const activity = document['Activity'];
                //subsection: Favorite Effects
                if (activity['Favorite Effects']) {

                }
                //subsection: Favorite Hashtags
                if (activity['Favorite Hashtags']) {

                }
                //subsection: Favorite Sounds
                if (activity['Favorite Sounds']) {

                }
                //subsection: Favorite Videos
                if (activity['Favorite Videos']) {

                }
                //subsection: Follower List
                if (activity['Follower List']) {
                    if (activity['Follower List'].FansList) {
                        model.followerList = this.buildFollowersModel(activity['Follower List'].FansList);
                    }
                }
                //subsection: Following List
                if (activity['Following List']) {
                    if (activity['Following List'].Following) {
                        model.followingList = this.buildFollowingModel(activity['Following List'].Following);
                    }
                }
                //subsection: Hashtag
                if (activity['Hashtag']) {

                }
                //subsection: Like List
                if (activity['Like List']) {

                }
                //subsection: Login History
                if (activity['Login History']) {

                }
                //subsection: Share History
                if (activity['Share History']) {

                }
                //subsection: Status
                if (activity['Status']) {

                }
                //subsection: Video Browsing History
                if (activity['Video Browsing History']) {

                }
                //subsection: Ads and data
                if (activity['Ads and data']) {

                }
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
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
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
            if (profileMap.PlatformInfo && profileMap.PlatformInfo[0]) {
                (profileMap.PlatformInfo[0].Description) && (model.description = profileMap.PlatformInfo[0].Description);
                (profileMap.PlatformInfo[0].Name) && (model.name = profileMap.PlatformInfo[0].Name);
                (profileMap.PlatformInfo[0].Platform) && (model.platform = profileMap.PlatformInfo[0].Platform);
                (profileMap.PlatformInfo[0]['Profile Photo']) && (model.profilePhoto = profileMap.PlatformInfo[0]['Profile Photo']);
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
        return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
    }
}
