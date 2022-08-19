import {
    DataSourceCode,
    ProcessorAmazon,
    ProcessorFacebook,
    ProcessorGoogle,
    ProcessorInstagram,
    ValidatorFiles
} from "../src";

export class JsonGenerator {
    static async generateAggregatorJson() {
        await this.generateJson(DataSourceCode.INSTAGRAM);
        /*
        await this.generateJson(DataSourceCode.FACEBOOK);
        await this.generateJson(DataSourceCode.AMAZON);
        await this.generateJson(DataSourceCode.FACEBOOK);
         */
    }

    private static async generateJson(code: DataSourceCode) {
        const fs = require('fs');
        const path = require('path');
        const data = fs.readFileSync(path.join(__dirname, `../src/mock/datasource/zip files/${code.toLowerCase()}.zip`));
        const validation = await ValidatorFiles.validateZip(data,
            {
                filterDataSource: {
                    dataSourceCode: DataSourceCode.INSTAGRAM,
                },
            });
        let result;
        switch (code) {
            case DataSourceCode.AMAZON:
                result = await ProcessorAmazon.aggregatorFactory(validation!.zipFile);
                break;
            case DataSourceCode.INSTAGRAM:
                result = await ProcessorInstagram.aggregatorFactory(validation!.zipFile);
                break;
            case DataSourceCode.FACEBOOK:
                result = await ProcessorFacebook.aggregatorFactory(validation!.zipFile);
                break;
            case DataSourceCode.GOOGLE:
                result = await ProcessorGoogle.aggregatorFactory(validation!.zipFile);
                break;
        }
        fs.writeFileSync(path.join(__dirname, `../generator/aggregator-json/aggregator_${code.toLowerCase()}.json`), JSON.stringify(result, null, 2));
    }
}
JsonGenerator.generateAggregatorJson();
