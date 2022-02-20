//import * as zip from "@zip.js/zip.js";

export class ZipManager {

    async unzipFile(file: Uint8Array): Promise<Array<File>> {
        const zip = require("@zip.js/zip.js");
        const reader = new zip.ZipReader(new zip.Uint8ArrayReader(file));
        const entries = await reader.getEntries();

        const returnedFiles: Array<File> = [];
        entries.map(async (entry: any) => {
            if(entry){
                returnedFiles.push(entry.getData(new zip.BlobWriter()));
            }
        });
        return returnedFiles;
    }


    async zipFiles() {

    }
}