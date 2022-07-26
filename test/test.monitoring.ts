import {MonitoringService} from "../src/utils/monitoring/monitoring.source";
import {DataSourceCode, FileExtension} from "../src";
import ErrnoException = NodeJS.ErrnoException;

function testMonitoring(){
    testFindNotMappedFiles();
}

function testFindNotMappedFiles() {
    const fs = require('fs');
    const path = require('path');
    fs.readFile(path.join(__dirname, "../src/mock/datasource zip files/instagram.zip"), async function (err: ErrnoException, data: Buffer) {
        console.log(await MonitoringService.findNotMappedFiles(data, DataSourceCode.INSTAGRAM, {permittedFilesExtensions: [FileExtension.JSON]}));
        console.log(await MonitoringService.findChangesIntoFiles(data, DataSourceCode.INSTAGRAM));
    });
}
testMonitoring();
