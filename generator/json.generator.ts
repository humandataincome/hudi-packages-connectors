import {
    DataSourceCode, Selector,
    ValidatorFiles
} from "../src";

export class JsonGenerator {
    static async generateAggregatorJson() {
        await this.generateJson(DataSourceCode.AMAZON);
        await this.generateJson(DataSourceCode.FACEBOOK);
        await this.generateJson(DataSourceCode.GOOGLE);
        await this.generateJson(DataSourceCode.INSTAGRAM);
        await this.generateJson(DataSourceCode.LINKEDIN);
    }

    private static async generateJson(code: DataSourceCode) {
        const fs = require('fs');
        const path = require('path');
        const data = fs.readFileSync(path.join(__dirname, `../src/mock/datasource/zip files/private/${code.toLowerCase()}.zip`));
        const validation = await ValidatorFiles.validateZip(data,
            {
                minBytesPerFile: 0,
                maxBytesPerFile: 15e6,
                maxBytesZipFile: Infinity,
                filterDataSource: {
                    dataSourceCode: code,
                },
            });
        const result = await Selector.getZipAggregatorBuilder(code, validation!.zipFile, {
            timeIntervalDays: 180,
            maxEntitiesPerArray: 10000
        });
        fs.writeFileSync(path.join(__dirname, `../generator/aggregator-json/aggregator_${code.toLowerCase()}.json`), JSON.stringify(result, null, 2));
    }
}
JsonGenerator.generateAggregatorJson();
