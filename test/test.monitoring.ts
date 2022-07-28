import {MonitoringService} from "../src/utils/monitoring/monitoring.source";
import {DataSourceCode, FileExtension} from "../src";
import ErrnoException = NodeJS.ErrnoException;

function testMonitoring(){
    testFindNotMappedFiles();
}

function testFindNotMappedFiles() {
    const fs = require('fs');
    const path = require('path');
    fs.readFile(path.join(__dirname, "../src/mock/datasource zip files/facebook2.zip"), async function (err: ErrnoException, data: Buffer) {
        console.log(await MonitoringService.findNotMappedFiles(data, DataSourceCode.FACEBOOK, {permittedFilesExtensions: [FileExtension.JSON, FileExtension.JS, FileExtension.XML, FileExtension.CSV, FileExtension.HTML]}));
        console.log();
        console.log(await MonitoringService.findChangesIntoFiles(data, DataSourceCode.FACEBOOK));
    });
}
testMonitoring();
