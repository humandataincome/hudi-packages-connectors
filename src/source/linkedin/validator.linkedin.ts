import {ValidatorDatasource} from "../../utils/validator/validator.datasource";
import Logger from "../../utils/logger";
import {FileCodeLinkedIn} from "./enum.linkedin";

export class ValidatorLinkedIn extends ValidatorDatasource  {
    protected readonly logger = new Logger("Netflix Validator");

    protected DEFAULT_FILE_CODES: FileCodeLinkedIn[] = [
        FileCodeLinkedIn.JOBS_APPLICATIONS,
        FileCodeLinkedIn.JOBS_SEEKER_PREFERENCES,
        FileCodeLinkedIn.ADS_CLICKED,
        FileCodeLinkedIn.ADS_TARGETING,
        FileCodeLinkedIn.COMPANY_FOLLOWS,
        FileCodeLinkedIn.CONNECTIONS,
        FileCodeLinkedIn.EDUCATION,
        FileCodeLinkedIn.EMAIL_ADDRESSES,
        FileCodeLinkedIn.ENDORSEMENT_RECEIVED_INFO_1,
        FileCodeLinkedIn.INFERENCES_ABOUT_YOU,
        FileCodeLinkedIn.LEARNING,
        FileCodeLinkedIn.POSITIONS,
        FileCodeLinkedIn.PROFILE,
        FileCodeLinkedIn.SEARCH_QUERIES,
        FileCodeLinkedIn.SKILLS,
    ];

    protected extractCompatiblePath(path: string): string {
        let x: string[] = path.split('/');
        if (x[x.length - 2] === 'Jobs') {
            return x[x.length - 2] + '/' + x[x.length - 1];
        }
        return x[x.length - 1];
    }
}
