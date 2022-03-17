import {FileCode} from "../descriptor";
import * as JSZip from "jszip";

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
            FileCode.FACEBOOK_FRIEND_REQUESTS_SENT
        ]): Promise<Buffer | undefined> {
        let usefulFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let data = await file.async('nodebuffer');
                if (fileList.includes(<FileCode>this.extractCompatiblePath(pathName))) {
                    usefulFiles.file(this.extractCompatiblePath(pathName), data, {comment: file.comment});
                }
            }
        }
        return await usefulFiles.generateAsync({type: "nodebuffer"});
    }

    private static extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        return (x[x.length-2] + '/' + x[x.length-1]);
    }
}
