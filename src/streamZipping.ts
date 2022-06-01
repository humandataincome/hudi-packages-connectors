
import {ZipInputFile} from "fflate";
export class StreamZipping {


    static async validateZipStream(zipFile: Buffer): Promise<void> {
        const massiveFile = new Uint8Array(zipFile);
        const massiveAgain = ZipInputFile(massiveFile);

    }

}
