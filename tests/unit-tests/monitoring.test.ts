import {MonitoringService} from "../../src/utils/monitoring/monitoring.source";
import {DataSourceCode, FileExtension} from "../../src";

describe('Monitoring Test', () => {
    const pathToZip = "../../src/mock/datasource/zip files/instagram.zip";
    test('findNotMappedFiles 1', async () => {
        const result = await findNotMappedFiles(pathToZip);
        const expected = '';
        expect(result).toBe(expected);
    });
    test('findNotMappedFiles 2', async () => {
        const result = await findNotMappedFiles(pathToZip);
        const expected = '';
        expect(result).toBe(expected);
    });
    //TODO: add test findChangesIntoFiles
});

async function findNotMappedFiles(pathToZip: string) {
    const fs = require('fs');
    const path = require('path');
    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    return await MonitoringService.findNotMappedFiles(data, DataSourceCode.FACEBOOK, {permittedFilesExtensions: [FileExtension.JSON, FileExtension.JS, FileExtension.XML, FileExtension.CSV, FileExtension.HTML]});
}

async function findChangesIntoFiles(pathToZip: string) {
    const fs = require('fs');
    const path = require('path');
    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    return await MonitoringService.findChangesIntoFiles(data, DataSourceCode.FACEBOOK);
}
