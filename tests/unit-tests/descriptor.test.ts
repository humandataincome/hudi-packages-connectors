import {DataSourceCode, DescriptorService, FileExtension, LanguageCode, RetrievingProcedureType} from "../../src";

describe('Descriptor Test', () => {
    test('getAllCodes', () => {
        const result = JSON.stringify(DescriptorService.getAllCodes().pop());
        const expected = JSON.stringify(DataSourceCode.REDDIT);
        expect(result).toBe(expected);
    });
    test('getName', () => {
        const result = DescriptorService.getName(DataSourceCode.INSTAGRAM);
        expect(result).toBe('Instagram');
    });
    test('getFormats', () => {
        const result = JSON.stringify(DescriptorService.getFormats(DataSourceCode.INSTAGRAM));
        const expected = JSON.stringify([FileExtension.ZIP]);
        expect(result).toBe(expected);
    });
    test('getAllProcedureTypes', () => {
        const result = JSON.stringify(DescriptorService.getAllProcedureTypes(DataSourceCode.AMAZON, LanguageCode.ENGLISH));
        const expected = JSON.stringify([RetrievingProcedureType.DESKTOP]);
        expect(result).toBe(expected);
    });
    test('getAllLanguages', () => {
        const result = JSON.stringify(DescriptorService.getAllLanguages(DataSourceCode.INSTAGRAM));
        const expected = JSON.stringify([LanguageCode.ENGLISH, LanguageCode.ITALIAN]);
        expect(result).toBe(expected);
    });
    test('getFileDescription', () => {
        const result = DescriptorService.getFileDescription('amazon/PrimeVideo.WatchEvent.2.1.csv', DataSourceCode.AMAZON, LanguageCode.ENGLISH);
        expect(result).toBe(undefined);
    });
    //todo: getProcedure and getDescription test
});
