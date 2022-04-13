import {FileCode, FileCodeFacebook} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import {InputFileFormat} from "./index";

export class ValidatorFacebook extends ValidatorDatasource{
    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - optional list of paths of file (as FileCode) that we want to keep into the file zip
     * @return buffer containing all useful files that have been found
     */
    static async selectUsefulFilesFromZip(
        zipFile: InputFileFormat,
        fileList: FileCode[] = [
            FileCodeFacebook.ADS_INTERACTED_WITH,
            FileCodeFacebook.COMMENTS,
            FileCodeFacebook.REACTIONS,
            FileCodeFacebook.PAGES_FOLLOWED,
            FileCodeFacebook.PAGES_LIKED,
            FileCodeFacebook.PAGES_RECOMMENDED,
            FileCodeFacebook.LANGUAGE,
            FileCodeFacebook.PROFILE_INFO,
            FileCodeFacebook.RECENTLY_VIEWED,
            FileCodeFacebook.YOUR_POSTS,
            FileCodeFacebook.FRIENDS
        ]): Promise<Buffer | undefined> {
        return super.selectUsefulFilesFromZip(zipFile, fileList);
    }
}
