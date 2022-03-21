import {FileCode} from "../descriptor";
import * as JSZip from "jszip";
import {ValidationErrorEnums} from "./validator.error";

export class ValidatorFacebook {

    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - optional list of paths of file (as FileCode) that we want to keep into the file zip
     * @return {Promise<Buffer | undefined>} - buffer containing all useful files that have been found
     */
    static async selectUsefulFilesFromZip(
        zipFile: Buffer,
        fileList: Array<FileCode> = [
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
        let hasAnyFile = false;
        let usefulFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let data = await file.async('nodebuffer');
                if (fileList.includes(<FileCode>this.extractCompatiblePath(pathName))) {
                    usefulFiles.file(this.extractCompatiblePath(pathName), data, {comment: file.comment});
                    (!hasAnyFile) && (hasAnyFile = true);
                }
            }
        }
        if(hasAnyFile) {
            return await usefulFiles.generateAsync({type: "nodebuffer"});
        } else {
            throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: File ZIP has not any useful file`);
        }
    }

    /**
     * @param path - get a raw path in input
     * @return {string} - return a path compatible with the FileCode enumeration
     * @private
     */
    private static extractCompatiblePath(path: string): string {
        const arrayDir: string[] = path.split('/');
        if(arrayDir.length > 3) {
            //case FACEBOOK_CONVERSATION: 'messages/inbox/alebarry_vz29qw/message_1.json
            if(arrayDir[arrayDir.length - 1] === 'message_1.json' && arrayDir[arrayDir.length - 3] === 'inbox' && arrayDir[arrayDir.length - 4] === 'messages') {
                return (arrayDir[arrayDir.length-4] + '/' + arrayDir[arrayDir.length-3] + '/' + arrayDir[arrayDir.length-1]);
            }
        }
        return (arrayDir[arrayDir.length-2] + '/' + arrayDir[arrayDir.length-1]);
    }
}
