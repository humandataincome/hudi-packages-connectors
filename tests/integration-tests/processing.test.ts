import {
    DataSourceCode,
    ProcessorInstagram,
    ValidatorFiles,
} from "../../src";

describe('Processor Test', () => {
    test('Instagram Validation and Processor', async () => {
        const pathToZip = "../../src/mock/datasource/zip files/instagram.zip";
        const result = new TextEncoder().encode(JSON.stringify(await validationAndProcessing(pathToZip), null, 2)).length;
        const expected: number = 28490;
        expect(result).toBe(expected);
    });
});


async function validationAndProcessing(pathToZip: string) {
    const fs = require('fs');
    const path = require('path');
    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    const validation = await ValidatorFiles.validateZip(data,
        {
            filterDataSource: {
                dataSourceCode: DataSourceCode.INSTAGRAM,
            },
        });
    return await ProcessorInstagram.zipAggregatorBuilder(validation!.zipFile);
}
