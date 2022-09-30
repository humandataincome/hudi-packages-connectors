import {
    APIDataSourceCode,
    DescriptorService,
    GDPRDataSourceCode,
    LanguageCode,
    RetrievingProcedureType
} from "../../src";

describe('Descriptor Test', () => {
    test('getAllCodes', () => {
        const result1 = DescriptorService.getAllGDPRCodes();
        const result2 = DescriptorService.getAllAPICodes();
        const expected1 = GDPRDataSourceCode.TIKTOK;
        const expected2 = APIDataSourceCode.COINBASE;
        expect(JSON.stringify(result1[9])).toBe(JSON.stringify(expected1));
        expect(JSON.stringify(result2[1])).toBe(JSON.stringify(expected2));
    });
    test('getName', () => {
        const result = DescriptorService.getName(GDPRDataSourceCode.INSTAGRAM);
        const expected = 'Instagram';
        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });
    test('getProcedureLists', () => {
        const result = DescriptorService.getProcedureLists(GDPRDataSourceCode.AMAZON, LanguageCode.ENGLISH);
        const expected = 'The Datasource contains all your personal information relating to your use of Amazon. Do not change the composition of the folders and files within them.';
        expect(JSON.stringify(result![0].description)).toBe(JSON.stringify(expected));
    });
    test('getProcedure', () => {
        const result = DescriptorService.getProcedure(GDPRDataSourceCode.SHOPIFY, LanguageCode.ENGLISH, RetrievingProcedureType.DESKTOP, 'Shopify Discounts');
        const expected = 'The file contains all data about your Shopify business\' discounts codes. Do not invalidate the content or the name of the file.';
        expect(JSON.stringify(result!.description)).toBe(JSON.stringify(expected));
    });
    test('getLanguagesList', () => {
        const result = DescriptorService.getLanguagesList(GDPRDataSourceCode.INSTAGRAM);
        const expected = [LanguageCode.ENGLISH, LanguageCode.ITALIAN];
        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });
    test('getFileDescription', () => {
        const result1 = DescriptorService.getFileDescription('PrimeVideo.WatchEvent.2.1/PrimeVideo.WatchEvent.2.1.csv', GDPRDataSourceCode.AMAZON, LanguageCode.ENGLISH);
        const expected1 = undefined;
        expect(JSON.stringify(result1)).toBe(JSON.stringify(expected1));
        const result2 = DescriptorService.getFileDescription('ads_and_businesses/advertisers_using_your_activity_or_information.json', GDPRDataSourceCode.INSTAGRAM, LanguageCode.ENGLISH);
        const expected2 = 'Advertisers that are using your instagram information';
        expect(JSON.stringify(result2)).toBe(JSON.stringify(expected2));
    });
    //todo: getProcedure and getDescription test
});
