import {FileCode} from "../descriptor";
import {InputFileFormat} from "./validator";
import {ValidatorDatasource} from "./validator.datasource";

export class ValidatorFacebook extends ValidatorDatasource{
    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - optional list of paths of file (as FileCode) that we want to keep into the file zip
     * @return buffer containing all useful files that have been found
     */
    static async selectUsefulFilesFromZip(
        zipFile: InputFileFormat,
        fileList: FileCode[] = [
            FileCode.FACEBOOK_ADS_INTERACTED_WITH,
            FileCode.FACEBOOK_COMMENTS,
            FileCode.FACEBOOK_REACTIONS,
            FileCode.FACEBOOK_PAGES_FOLLOWED,
            FileCode.FACEBOOK_PAGES_LIKED,
            FileCode.FACEBOOK_PAGES_RACCOMENDED,
            FileCode.FACEBOOK_LANGUAGE,
            FileCode.FACEBOOK_PROFILE_INFO,
            FileCode.FACEBOOK_RECENTLY_VIEWED,
            FileCode.FACEBOOK_YOUR_POSTS,
            FileCode.FACEBOOK_FRIENDS
        ]): Promise<Buffer | undefined> {
        return super.selectUsefulFilesFromZip(zipFile, fileList);
    }
}
