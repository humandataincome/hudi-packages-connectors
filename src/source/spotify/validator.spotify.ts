import Logger from "../../utils/logger";
import {FileCodeSpotify} from "./enum.spotify";
import {ValidatorDatasource} from "../../utils/validator/validator.datasource";

export class ValidatorSpotify extends ValidatorDatasource {
    protected readonly logger = new Logger("Spotify Validator");

    protected DEFAULT_FILE_CODES: FileCodeSpotify[] = [
        FileCodeSpotify.FOLLOW,
        FileCodeSpotify.IDENTIFIERS,
        FileCodeSpotify.INFERENCES,
        FileCodeSpotify.PAYMENTS,
        FileCodeSpotify.PLAYLIST,
        FileCodeSpotify.STREAMING_HISTORY,
        FileCodeSpotify.USERDATA,
        FileCodeSpotify.YOUR_LIBRARY,
    ];

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        if (x[x.length - 2] === 'MyData') {
            return x[x.length - 2] + '/' + x[x.length - 1];
        }
        return path;
    }
}
