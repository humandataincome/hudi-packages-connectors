import {MonitoringService} from "../../src/utils/monitoring/monitoring.source";
import {GDPRDataSourceCode, FileExtension} from "../../src";

describe('Monitoring Test', () => {
    const pathToZip1 = "../../src/mock/datasource/zip files/instagram_part_1.zip";
    test('findNotMappedFiles 1', async () => {
        const result = JSON.stringify(await findNotMappedFiles(pathToZip1));
        const expected = JSON.stringify( []);
        expect(result).toBe(expected);
    });
    const pathToZip2 = "../../src/mock/datasource/zip files/instagram_part_2.zip";
    test('findNotMappedFiles 2', async () => {
        const result = JSON.stringify(await findNotMappedFiles(pathToZip2));
        const expected = JSON.stringify(["wrong_folder/wrong_file_name.json"]);
        expect(result).toBe(expected);
    });
    //TODO: add test findChangesIntoFiles when the function will be completed
});

async function findNotMappedFiles(pathToZip: string) {
    const fs = require('fs');
    const path = require('path');
    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    return await MonitoringService.findNotMappedFiles(data, GDPRDataSourceCode.INSTAGRAM, {
        permittedFilesExtensions: [FileExtension.JSON, FileExtension.JS, FileExtension.XML, FileExtension.CSV, FileExtension.HTML]
    });
}

async function findChangesIntoFiles(pathToZip: string) {
    const fs = require('fs');
    const path = require('path');
    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    return await MonitoringService.findChangesIntoFiles(data, GDPRDataSourceCode.INSTAGRAM);
}
