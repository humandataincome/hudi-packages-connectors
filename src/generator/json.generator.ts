import {
    GDPRDataSourceCode,
    SelectorUtils,
    ValidatorFiles
} from "../index";

export class JsonGenerator {
    static async generateAggregatorJson() {
        /*
        await this.generateJson(GDPRDataSourceCode.AMAZON);
        await this.generateJson(GDPRDataSourceCode.FACEBOOK);
        await this.generateJson(GDPRDataSourceCode.GOOGLE);
        await this.generateJson(GDPRDataSourceCode.INSTAGRAM);
        await this.generateJson(GDPRDataSourceCode.LINKEDIN);
        await this.generateJson(GDPRDataSourceCode.NETFLIX);
        await this.generateJson(GDPRDataSourceCode.REDDIT);
        await this.generateJson(GDPRDataSourceCode.TIKTOK);
        await this.generateJson(GDPRDataSourceCode.TWITTER);
         */
        await this.generateJson(GDPRDataSourceCode.SPOTIFY);
    }

    private static async generateJson(code: GDPRDataSourceCode) {
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
        const result = await SelectorUtils.getZipAggregatorBuilder(code, validation!.zipFile, {
            timeIntervalDays: 180,
            maxEntitiesPerArray: 10000
        });
        fs.writeFileSync(path.join(__dirname, `../generator/aggregator-json/aggregator_${code.toLowerCase()}.json`), JSON.stringify(result, null, 2));
    }
}
JsonGenerator.generateAggregatorJson();
