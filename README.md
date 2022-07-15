# HUDI-PACKAGE-CONNECTORS

## What is this repository for?
A set of connectors to parse, describe, validate and process the data sources provided by websites and social networks. Compatible with NodeJS and with Browsers.

### Features included in the package
- A set of **Service Classes** to parse the files received by the data sources' zip files.
- A set of **Validators** for the file received: a generic validation for raw zip files and a specific validator for each data source supported to filter wanted files from the others.
- A set of **Processors** for each specific data source supported to aggregate the data contained into them.


| Datasource Name | Parsing Support | Descriptor Support |  Validator Support   |    Processor Support    |
|:----------------|:---------------:|:------------------:|:--------------------:|:-----------------------:|
| *Amazon*        |     Partial     |      &check;       |       &check;        |         &check;         |
| *Facebook*      |     Partial     |      &check;       |       &check;        |         &check;         |
| *Google*        |     Partial     |      &check;       |       &check;        |         &check;         |
| *Instagram*     |     Partial     |      &check;       |       &check;        |         &check;         |
| *LinkedIn*      |     Partial     |      &check;       |       &check;        |         &cross;         |
| *Netflix*       |     Partial     |      &check;       |       &check;        |         &cross;         |
| *Shopify*       |     &check;     |      &check;       |       &check;        |         &cross;         |
| *Twitter*       |     &cross;     |      &check;       |       &check;        |         &cross;         |
| *TikTok*        |     &cross;     |      &cross;       |       &cross;        |         &cross;         |
| *Twitch*        |     &cross;     |      &cross;       |       &cross;        |         &cross;         |

## How to use the library:
### How to install the library
```sh
npm i @humandataincome/connectors
```
### How to import the library
```ts
import * as Connector from '@humandataincome/connectors';
```

### How to use a Service
```ts
import {InstagramService} from '@humandataincome/connectors';
```
```ts
//fileBuffer is the file 'account_information/personal_information.json' into the Instagram data source, as Buffer

let result = await InstagramService.parsePersonalInformation(fileBuffer);
```
Instagram in particular needs the **language** of the files given in input to parse some files, it can be changed with one of the supported languages codes (default is ENGLISH):
```ts
InstagramService.languagePrefix = LanguageCode.ITALIAN;
```
At the moment the **languages supported** for the Instagram service are: **ENGLISH**, **ITALIAN**, **SPANISH**, **GERMAN**, **FRENCH**, **HINDI** and **CHINESE SIMPLIFIED**.


### How to use Descriptor
```ts
import {DescriptorService} from '@humandataincome/connectors';
```
```ts
const codes = DescriptorService.getAllCodes();
const instagramDescription = DescriptorService.getDescription(DataSourceCode.INSTAGRAM);
const instagramProcedure = DescriptorService.getProcedure(DataSourceCode.SHOPIFY_CUSTOMERS, LanguageCode.ENGLISH, RetrievingProcedureType.DESKTOP);
```
How to retrieve the **descriptor.json** file containing the description of the supported sources:
```ts
const file = require('@humandataincome/connectors/src/descriptor/descriptor.json');
```

### How to use ValidatorFiles
The method **validateZip** takes in input a zip file as Uint8Array.

The method **validateZipStream** is very useful when dealing with huge zip files in input and takes in input a ReadableStream.
It also takes an optional parameter called **options**:
```ts
const validatedZip: ValidationReturn = await ValidatorFiles.validateZip(zipFile,
    {
        permittedFileExtensions: [FileExtension.ZIP, FileExtension.JSON, FileExtension.CSV, FileExtension.HTML],
        filterDataSource: {
            dataSourceCode: DataSourceCode.GOOGLE,
            fileCodesIncluded: [
                FileCodeGoogle.ACCOUNT_INFO,
                FileCodeGoogle.SEMANTIC_LOCATION_HISTORY,
            ]
        },
        throwExceptions: true, //default is false
        maxBytesPerFile: 20e6,
        minBytesPerFile: 2e3,
        maxBytesZipFile: 30e9,
    });
```
```ts
import { ReadableStream } from 'node:stream/web';

const readStream = fs.createReadStream(path.join(__dirname,"../src/mock/datasource zip files/facebook.zip"));

const readableStream = new ReadableStream({
    async start(controller) {
        readStream.on("data", (chunk: Buffer|string) => controller.enqueue(chunk));
        readStream.on("end", () => controller.close());
        readStream.on("error", () => controller.error())
    }
});

const validatedZip: ValidationReturn = await ValidatorFiles.validateZipStream(readableStream, {
    filterDataSource: {
        dataSourceCode: DataSourceCode.FACEBOOK,
    }});
```
```ts
interface ValidationReturn {
    zipFile: Uint8Array;
    includedFiles: string[];
    excludedFiles: string[];
}
```
ValidatorFiles class has two parameters to filter files based on their bytes sizes that can be changed:
```ts
ValidatorService.MAX_BYTE_FILE_SIZE = 7e20; //default value is 6 MB
ValidatorService.MIN_BYTE_FILE_SIZE = 100;  //default value is 30 B
ValidatorService.MAX_BYTE_ZIP = 2e9; //default value is 1 GB
```

Example of **ValidatorInstagram** usage:
```ts
import {ValidatorInstagram} from '@humandataincome/connectors';
```

The method **filterFilesIntoZip** can get in input an optional list of FilesCode to filter out from the zip the data source's unwanted files, otherwise it will use a default list.
```ts
let validatedZip = await ValidatorInstagram.getInstance().filterFilesIntoZip(zipFile);
```


### How to use Processor
Example of **ProcessorInstagram** usage: 
```ts
import {ProcessorInstagram} from '@humandataincome/connectors';
```
The **aggregatorFactory** method take in input the zipFile as Buffer and an optional set of parameters like **timeIntervalDays** that indicates the number of days from Today to consider an information valid (default is 365).
```ts
let aggregator = await ProcessorInstagram.aggregatorFactory(zipFile, {
    timeIntervalDays: 180,
    throwExceptions: false,
});
```

# How do I retrieve my personal data sources?

### Instagram Data Source
You can find the guide at this link: https://help.instagram.com/181231772500920 under the section **Downloading a copy of your data on Instagram**.

Alternately, from Android and iPhone, you can find the **Request Download** under your **Settings** -> **Security** -> **Download data**. From Desktop, you can find it under **Settings** -> **Privacy and security**
-> **Data download** -> **Request download**.
Always select the **JSON** format.

### Facebook Data Source
Click on https://www.facebook.com/dyi, select Format **JSON** and Media Quality **High**, select a **Data Range** (**All time** has more information). Scroll at the end of the page and click on the blue button **Request a download**.

### Amazon Data Source
Go to https://www.amazon.com/hz/privacy-central/data-requests/preview.html, select **Request All Your Data** from the drop-down menu and then **Submit Request**. Check your email address, find the last Amazon's email and click on **Confirm Data Request**.

### Netflix Data Source
Go into one of your account' profiles, click on your account's icon in the top-right corner of the window, click on **Account**, then click **Download your personal data** under Settings paragraph and finish clicking the red button **Send request**.

### Google Data Source
You can find the guide at this link: https://takeout.google.com/.

### LinkedIn Data Source
From Computer: Click on your icon, click on **Settings and Profile**, **Data privacy**, **Get a copy of your data** and Download the larger Archive.

### Shopify Data Source
You can find the guide at this link: https://blog.coupler.io/how-to-export-shopify-data/.

### Twitch Data Source
Go to https://privacyportal.onetrust.com/webform/0e674578-2f0b-4638-8943-97e3c8060048/ee57cd1d-b315-4b29-90cd-4def381b86c9 and compile the form.

### Twitter Data Source
Go to https://twitter.com/settings/download_your_data.
