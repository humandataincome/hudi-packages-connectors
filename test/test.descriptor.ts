import {DataSourceCode, DescriptorService} from "../src";

async function testDescriptor(){
    await descriptorServiceTest();
}

async function descriptorServiceTest() {
    try {
        console.log(DescriptorService.getAllCodes());
        console.log(DescriptorService.getDescription(DataSourceCode.SHOPIFY_CUSTOMERS));
        //console.log(DescriptorService.getName(DataSourceCode.INSTAGRAM));
        //console.log(DescriptorService.getFormats(DataSourceCode.INSTAGRAM));
        //console.log(DescriptorService.getAllProcedureTypes(DataSourceCode.AMAZON, LanguageCode.ENGLISH));
        //console.log(DescriptorService.getProcedure(DataSourceCode.SHOPIFY_CUSTOMERS, LanguageCode.ENGLISH, RetrievingProcedureType.DESKTOP));
        //console.log(DescriptorService.getAllLanguages(DataSourceCode.INSTAGRAM));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testDescriptor();
