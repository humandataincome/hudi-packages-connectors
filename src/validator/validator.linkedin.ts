import {FileCodeLinkedIn} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import Logger from "../utils/logger";

export class ValidatorLinkedIn extends ValidatorDatasource  {
    protected readonly logger = new Logger("Netflix Validator");

    protected DEFAULT_FILE_CODES: FileCodeLinkedIn[] = [
        FileCodeLinkedIn.JOBS_APPLICATIONS,
        FileCodeLinkedIn.JOBS_SEEKER_PREFERENCES,
        FileCodeLinkedIn.JOBS_SAVED_JOBS,
        FileCodeLinkedIn.ACCOUNT_STATUS_HISTORY,
        FileCodeLinkedIn.ADS_CLICKED,
        FileCodeLinkedIn.ADS_TARGETING,
        FileCodeLinkedIn.COMPANY_FOLLOWS,
        FileCodeLinkedIn.CONNECTIONS,
        FileCodeLinkedIn.EDUCATION,
        FileCodeLinkedIn.EMAIL_ADDRESSES,
        FileCodeLinkedIn.ENDORSEMENT_RECEIVED_INFO_1,
        FileCodeLinkedIn.ENDORSEMENT_RECEIVED_INFO_2,
        FileCodeLinkedIn.INFERENCES_ABOUT_YOU,
        FileCodeLinkedIn.INVITATIONS,
        FileCodeLinkedIn.JOB_APPLICANT_SAVED_ANSWERS,
        FileCodeLinkedIn.JOB_APPLICANT_SAVED_QUESTION_RESPONSES,
        FileCodeLinkedIn.LEARNING,
        FileCodeLinkedIn.MEMBER_FOLLOWS,
        FileCodeLinkedIn.PHONE_NUMBERS,
        FileCodeLinkedIn.POSITIONS,
        FileCodeLinkedIn.PROFILE,
        FileCodeLinkedIn.SAVED_JOBS_ALERTS,
        FileCodeLinkedIn.SEARCH_QUERIES,
        FileCodeLinkedIn.SKILLS,
        FileCodeLinkedIn.VOTES,
    ];

    protected extractCompatiblePath(path: string): string {
        let x: string[] = path.split('/');
        if (x[x.length - 2] === 'Jobs') {
            return x[x.length - 2] + '/' + x[x.length - 1];
        }
        return x[x.length - 1];
    }
}
