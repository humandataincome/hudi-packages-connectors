import {FileCode} from "../descriptor";

interface Validators {
    selectUsefulFilesFromZip: (zipFile: Buffer, fileList: FileCode[]) => Promise<Buffer | undefined>;
}
