import {getProgramFromFiles, generateSchema, CompilerOptions, PartialArgs} from "typescript-json-schema";
import {DataSourceCode} from "../src";

export class SchemaGenerator {
    static generateAggregatorSchemas(): void {
        const path = require('path');
        const fs = require('fs');
        const settings: PartialArgs = {
            required: true,
        };
        const compilerOptions: CompilerOptions = {
            strictNullChecks: true,
        };
        //INSERT HERE all the datasource that have both a model and an aggregator and then can have a schema
        const codes = [DataSourceCode.INSTAGRAM]
        codes.forEach((code: DataSourceCode) => {
            const datasource = code.toLowerCase();
            const program = getProgramFromFiles(
                [path.resolve(`src/source/${datasource}/model.${datasource}.ts`)],
                compilerOptions,
                ''
            );

            const schema = generateSchema(program, `${datasource[0].toUpperCase()}${datasource.slice(1)}DataAggregator`, settings);
            fs.writeFileSync(path.join(__dirname,`/aggregator-schema/aggregator_${datasource}_schema.json`), JSON.stringify(schema, null, 2));
        });
    }
}
SchemaGenerator.generateAggregatorSchemas();
