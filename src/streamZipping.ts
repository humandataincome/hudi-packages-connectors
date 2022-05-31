import * as JSZip from "jszip";
import {ValidatorFacebook} from "./validator";
import {ZipEntry} from "node-stream-zip";

export class StreamZipping {
/*
    static async validateZipStream(streamRead: NodeJS.ReadableStream) {
        let zipFiles: JSZip = await JSZip.loadAsync(streamRead);
        let newZipFile = JSZip();

        for (let pathName of Object.keys(zipFiles.files)) {
            const file = zipFiles.files[pathName];
            if (file && !file.dir) {
                const validPath = await ValidatorFacebook.getInstance().getValidPath(pathName);
                if(validPath) {
                    newZipFile.file(validPath+Math.random() * (1000 - 1) + 1, file.nodeStream('nodebuffer'));
                    zipFiles.remove(pathName);
                }
            }
        }
        console.log("AAA");
        return newZipFile.generateInternalStream({type: 'nodebuffer'}).accumulate();
    }
 */
    static async validateZipStream(zipFile: string) {
        const StreamZip = require('node-stream-zip');
        const zip = new StreamZip.async({ file: zipFile });

        zip.on('entry', (entry: ZipEntry) => {
            console.log(entry)
            //console.log(`Read entry ${entry.name}`);
        });
        zip.on('end', () => zip.close());
    }

}
