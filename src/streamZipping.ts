import * as ZipJS from "@zip.js/zip.js";

export class StreamZipping {



    static async validateZipStream(zipFile: Uint8Array): Promise<void> {
        const ZipJS = require("@zip.js/zip.js");
       const zipReader = new ZipJS.ZipReader(new ZipJS.Uint8ArrayReader(zipFile));
       await zipReader.getEntries({
           onprogress: ((progress: number, total: number, entry: ZipJS.Entry) => {
               console.log(progress);
               console.log(total);
               console.log(entry)
           })
       });
    }

}
