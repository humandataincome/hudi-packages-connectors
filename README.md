# HUDI-PACKAGE-CONNECTORS #

## What is this repository for? ##
A set of connectors to describe, parse and process the data sources provided by websites and social networks. Compatible with NodeJS and with Browsers.

### Features included in the package ###
- A set of **Service Classes** to parse the files received by the data sources' zip files.
- A set of **Validators** for the file received: a generic validation for raw zip files and a specific validator for each data source supported to filter that useful files from the others.
- A set of **Processors** for each specific data source supported to aggregate the data contained into them.


## Which data sources are supported? ##
- **Instagram** (full support on validation, processing and parsing)
- **Facebook** (full support on validation, processing and parsing)
- **Amazon** (only parsing)
- **Google** (only parsing)
- **Netflix** (only parsing)
- **LinkedIn** (only parsing)
- **Twitch** (not supported yet)



# Tutorial #
## How to install the library ##
```
npm i @humandataincome/connectors
```
## How to import the library ##
```
import * as Connector from '@humandataincome/connectors';
```

## How to use a Service (Instagram service in the example) ##
```
import {InstagramService} from '@humandataincome/connectors';
```
```
//fileBuffer is the file 'account_information/personal_information.json' into the Instagram data source, as Buffer

let result = await InstagramService.parsePersonalInformation(fileBuffer);
```
Instagram needs the **language** of the files given in input, it can be changed with one of the supported languages codes (default is ENGLISH):
```
InstagramService.languagePrefix = LanguageCode.ITALIAN;
```
At the moment the **languages supported** for the Instagram service are: **ENGLISH**, **ITALIAN**, **SPANISH**, **GERMAN**, **FRENCH**, **HINDI** and **CHINESE SIMPLIFIED**.
## How to use Descriptor ##
How to retrieve the **descriptor.json** file containing the description of the supported sources:
```
const file = require(@humandataincome/connectors/src/descriptor/descriptor.json);
```

Example of **DescriptorService** usage:
```
import {DescriptorService} from '@humandataincome/connectors';
```
```
let codes = DescriptorService.getAllDataSourcesCodes();
```

## How to use Validator ##
Example of **ValidatorService** usage:
```
let validatedZip = await ValidatorService.validateZIP(zipFile);
```
The function **validateZIP** take in input a zip file. The allowed types are: string, number[], Blob, NodeJS.ReadableStream, Uint8Array, ArrayBuffer.

Validator class has two parameters to filter files based on their bytes sizes that can be changed:
```
ValidatorService.MAX_BYTE_FILE_SIZE = 7e10; //default value is 6 MB
ValidatorService.MIN_BYTE_FILE_SIZE = 100;  //default value is 50 B
```

Example of **ValidatorInstagram** usage:
```
import {ValidatorInstagram} from '@humandataincome/connectors';
```
```
let validatedZip = await ValidatorInstagram.selectUsefulFilesFromZip(zipFile);
```
The function **selectUsefulFilesFromZip** can get in input an optional list of FilesCode to filter out from the zip the data source's unwanted files.
## How to use Processor ##
Example of **ProcessorInstagram** usage: 
```
import {ProcessorInstagram} from '@humandataincome/connectors';
```
```
let aggregator = await ProcessorInstagram.aggregatorFactory(zipFile, 180);
```

# How do I retrieve my personal data sources? #

### Instagram Data Source ###
You can find the guide at this link: https://help.instagram.com/181231772500920 under the section **Downloading a copy of your data on Instagram**.

Alternately, from Android and iPhone, you can find the **Request Download** under your **Settings** -> **Security** -> **Download data**. From Desktop, you can find it under **Settings** -> **Privacy and security**
-> **Data download** -> **Request download**.

Always select the **JSON** format.


### Facebook Data Source ###
Click on https://www.facebook.com/dyi, select Format **JSON** and Media Quality **High**, select a **Data Range** (**All time** has more information). Scroll at the end of the page and click on the blue button **Request a download**.

### Amazon Data Source ###
Go to https://www.amazon.com/hz/privacy-central/data-requests/preview.html, select **Request All Your Data** from the drop down menu and then **Submit Request**.

### Netflix Data Source ###
Go into one of your account' profiles, click on your account's icon in the top-right corner of the window, click on **Account**, then click **Download your personal data** under Settings paragraph and finish clicking the red button **Send request**.

### Google Data Source ###
You can find the guide at this link: https://support.google.com/accounts/answer/162744?hl=en.

### LinkedIn Data Source ###
From Computer: Click on your icon, click on **Settings and Profile**, **Data privacy**, **Get a copy of your data** and Download the larger Archive.

### Twitch Data Source ###
Go to https://privacyportal.onetrust.com/webform/0e674578-2f0b-4638-8943-97e3c8060048/ee57cd1d-b315-4b29-90cd-4def381b86c9 and compile the form.

