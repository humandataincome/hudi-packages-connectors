import {FileCode} from "../descriptor";
import * as JSZip from "jszip";
import {ValidationErrorEnums} from "./validator.error";

export class ValidatorAmazon {
    static async selectUsefulFilesFromZip(
        zipFile: Buffer,
        fileList: FileCode[] = [
            FileCode.AMAZON_ADV_AUDIENCES,
            FileCode.AMAZON_ADV_CLICKS,
            FileCode.AMAZON_AUDIENCES,
            FileCode.AMAZON_ADV_THIRDPARTIES,
            FileCode.AMAZON_AUDIBLE_LISTENING,
            FileCode.AMAZON_AUDIBLE_LIBRARY,
            FileCode.AMAZON_AUDIBLE_MEMBERSHIP_BILLINGS,
            FileCode.AMAZON_AUDIBLE_MEMBERSHIP_EVENT,
            FileCode.AMAZON_DIGITAL_SUBSCRIPTION,
            FileCode.AMAZON_PRIMEVIDEO_VIEW_COUNT,
            FileCode.AMAZON_RETAIL_LIGHT_WEIGHT_INTERACTIONS,
            FileCode.AMAZON_RETAIL_SELLER_FEEDBACK,
            FileCode.AMAZON_RETAIL_ORDER_HISTORY,
            FileCode.AMAZON_RETAIL_REGION_AUTHORITY,
        ]): Promise<Buffer | undefined> {
        let hasAnyFile = false;
        let usefulFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let data = await file.async('nodebuffer');
                if (this.isPatchMatching(this.extractCompatiblePath(pathName), fileList)) {
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

    private static isPatchMatching(pathName: string, codes: FileCode[]): boolean {
        let found = false;
        codes.forEach((code: FileCode) => {
            if(pathName.match(code)) {
                found = true;
            }
        })
        return found;
    }

    private static extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        return (x[x.length-2] + '/' + x[x.length-1]);
    }
}
