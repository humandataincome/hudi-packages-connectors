import Logger from "../utils/logger";
import {
    Pages,
    PersonalInformation,
    PlaceLived
} from "../models/facebook.model";
import {CONFIG} from "../config/config.utils";
import {Decoding} from "../utils/decoding";

export class FacebookService{
    private logger = new Logger("Facebook Service");

    async fetchPersonalInformation(): Promise<PersonalInformation | undefined> {
        let personalInfoModel: PersonalInformation = {};
        try {
            let document = require(`${CONFIG.get('PATH')}facebook_json/profile_information/profile_information.json`);
            try {
                personalInfoModel.firstName = Decoding.decodeObject(document.profile_v2.name.first_name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - first_name parameter is missing');
            }
            try {
                personalInfoModel.middleName = Decoding.decodeObject(document.profile_v2.name.middle_name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - last_name parameter is missing');
            }
            try {
                personalInfoModel.lastName = Decoding.decodeObject(document.profile_v2.name.last_name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - last_name parameter is missing');
            }
            try {
                personalInfoModel.emails = Decoding.decodeObject(document.profile_v2.emails.emails);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - emails parameter is missing');
            }
            try {
                personalInfoModel.birthdate = document.profile_v2.birthday;
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - birthdate parameter is missing');
            }
            try {
                personalInfoModel.gender = Decoding.decodeObject(document.profile_v2.gender.gender_option);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - gender parameter is missing');
            }
            try {
                personalInfoModel.currentCity = Decoding.decodeObject(document.profile_v2.current_city.name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - current_city parameter is missing');
            }
            try {
                personalInfoModel.homeTown = Decoding.decodeObject(document.profile_v2.hometown.name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - hometown parameter is missing');
            }
            try {
                personalInfoModel.relationship = {
                    status: Decoding.decodeObject(document.profile_v2.relationship.status),
                    anniversary: document.profile_v2.relationship.anniversary,
                    timestamp: document.profile_v2.relationship.timestamp
                };
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - relationship parameter is missing');
            }
            try {
                personalInfoModel.educationExperiences = Decoding.decodeObject(document.profile_v2.education_experiences);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - education_experiences parameter is missing');
            }

            try {

                personalInfoModel.workExperience = Decoding.decodeObject(document.profile_v2.work_experiences);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - work_experiences parameter is missing');
            }
            try {
                personalInfoModel.languages = Array<string>(document.profile_v2.languages.length);
                for(let i = 0; i < document.profile_v2.languages.length; i++){
                    personalInfoModel.languages[i] = Decoding.decodeObject(document.profile_v2.languages[i].name);
                }
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - languages parameter is missing');
            }
            try {
                personalInfoModel.interestedIn = Decoding.decodeObject(document.profile_v2.interested_in);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - interested_in parameter is missing');
            }
            try {
                personalInfoModel.politicalView = Decoding.decodeObject(document.profile_v2.political_view);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - political_view parameter is missing');
            }
            try {
                personalInfoModel.religiousView = Decoding.decodeObject(document.profile_v2.religious_view);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - religious_view parameter is missing');
            }
            try {
                personalInfoModel.bloodInfo = Decoding.decodeObject(document.profile_v2.blood_info.blood_donor_status);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - blood_info parameter is missing');
            }
            try {
                personalInfoModel.websites = Array<string>(document.profile_v2.websites.length);
                for(let i = 0; i < document.profile_v2.websites.length; i++){
                    personalInfoModel.websites[i] = Decoding.decodeObject(document.profile_v2.websites[i].address);
                }
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - websites parameter is missing');
            }
            try {
                personalInfoModel.address = document.profile_v2.address;
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - address parameter is missing');
            }
            try {
                //to fill
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - phone_numbers parameter is missing');
            }
            try {
                personalInfoModel.placesLived = Array<PlaceLived>(document.profile_v2.places_lived.length);
                for(let i = 0; i < document.profile_v2.places_lived.length; i++){
                    personalInfoModel.placesLived[i] = Decoding.decodeObject(document.profile_v2.places_lived[i]);
                }
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - places_lived parameter is missing');
            }
            try {
                personalInfoModel.pagesInterests = Array<Pages>(document.profile_v2.pages.length);
                for(let i = 0; i < document.profile_v2.pages.length; i++){
                    personalInfoModel.pagesInterests[i] = {
                        category: Decoding.decodeObject(document.profile_v2.pages[i].name),
                        pages: Decoding.decodeObject(document.profile_v2.pages[i].pages)
                    }
                }
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - pages parameter is missing');
            }
            try {
                personalInfoModel.registrationTimestamp = document.profile_v2.registration_timestamp;
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - registration_timestamp parameter is missing');
            }
            try {
                personalInfoModel.profileUri = Decoding.decodeObject(document.profile_v2.profile_uri);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - profile_uri parameter is missing');
            }
            return personalInfoModel;
        } catch {
            this.logger.log('info', 'fetchPersonalInformation - profile_information.json ');
        }
    }
}