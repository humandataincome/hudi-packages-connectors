import {ParserUtils} from "../../../utils/parser.utils";
import {BloodAnalysisModel, TestModel} from "./model.blood-analysis";

export class ServiceBloodAnalysis {
    /**
     * Parse a Pdf containing blood analysis data and return a Json
     * @param file - file as Buffer
     */
    static async parsePdfToJson(file: Buffer): Promise<BloodAnalysisModel> {
        const text = await ParserUtils.parsePdf(file);

        const model: BloodAnalysisModel = {list: []};
        const regex = /(?<test>\w+|(?:\w+\s#)|(?:\w+\s%)|(?:\w+-\w+)|(?:\w+\s)+|(?:\w+\s?\/\s?\w+)|(?:ALT\s\(G\.P\.T\.\))|(?:GAMMA\sGT))\s?\r\n(?:\((?:\w|\.|\s|-|\/)+\)\r\n)?(?:\s?\*\s)?(?<result>\d+[.,]?\d*)\s?\r\n(?<unit>(?:\d+\^\d+\/\w+)|(?:\w+\/\w+)|\w+\/μL|%|\w+)(?:\s?\r?\n?)(?<range>(?:\d+(?:[.,]\d+)?\s?-\s?\d+(?:[.,]\d+)?)|(?:\s?[<>]=?(?:[.,]\d+)?\s?\d+))\s?\r\n/g;

        let match: RegExpExecArray | null;
        while ((match = regex.exec(text!)) !== null) {
            if (match[1] && match[2] && match[3] && match[4]) {
                const test: TestModel = {
                    test: match[1],
                    result: match[2],
                    unit: match[3],
                    range: match[4]
                };
                model.list.push(test);
            }
        }
        return model;
    }
}
