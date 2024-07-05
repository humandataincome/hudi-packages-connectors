import { parse, ParseConfig } from 'papaparse';
import LoggerUtils from './logger.utils';
//USE the pdfjs-dist/legacy/build/pdf version instead of pdfjs-dist to make it compatible with older browser version supported by ts of FE
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

export class ParserUtils {
    private static logger = new LoggerUtils('Parser');

    static parseCSVfromBuffer(
        source: Buffer,
        options: ParseConfig = {
            escapeChar: '"',
            header: true,
            skipEmptyLines: true,
        },
    ) {
        try {
            const data = source.toString();
            const result = parse(data, options);
            return result.data;
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseCSVfromBuffer');
            return undefined;
        }
    }

    static extractJsonFromTwitterFile(file: Buffer): Buffer | undefined {
        try {
            if (file) {
                const text = file.toString();
                //window.aaa.bbb.ccc = [JSON file] OR window.aaa.bbb.ccc = {JSON file}
                const regex =
                    /window(?:\..*)* = ((\[((\n)|(.*))*])|(\{((\n)|(.*))*}))/;
                const match = text.match(regex);
                if (match && match[1]) {
                    if (match[1] !== '[ ]') {
                        return Buffer.from(match[1]);
                    }
                }
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'extractJsonFromTwitterFile');
        }
        return undefined;
    }

    /**
     * Given a PDF file as Buffer, return the whole text as string
     * @param file - PDF as Buffer
     */
    static async parsePdf(file: Buffer) {
        try {
            const document = await pdfjs.getDocument({
                data: file,
                worker: PDFJSWorker,
                disableFontFace: true,
            }).promise;
            let finalString = '';
            for (let i = 1; i <= document.numPages; i++) {
                const page = await document.getPage(i);
                const textContent = await page.getTextContent();
                const textItems = textContent.items as TextItem[];
                let line = 0;
                // Concatenate the string of the item to the final string
                for (const item of textItems) {
                    if (line !== item.transform[5]) {
                        if (line !== 0) {
                            finalString += '\r\n';
                        }
                        line = (textItems[i] as TextItem).transform[5];
                    }
                    finalString += item.str;
                }
            }
            return finalString;
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parsePdf');
            return undefined;
        }
    }
}
