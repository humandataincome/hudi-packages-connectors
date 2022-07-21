import {MonitorSource} from "../src/utils/monitoring/monitoring.source";
import {DataSourceCode, FileExtension} from "../src";

function testMonitoring(){
    testFindNotMappedFiles();
}

function testFindNotMappedFiles() {
    console.log(MonitorSource.findNotMappedFiles(['test1.json', 'godus.js', 'account_information/personal_information.json'], DataSourceCode.INSTAGRAM, {permittedFilesExtensions: [FileExtension.JSON]}));
}

testMonitoring();
