# HUDI-PACKAGE-CONNECTORS #

## What is this repository for? ##
A set of connectors to describe, parse and process the data sources provided by websites and social networks. Compatible with NodeJS and on Browsers.

## Which data sources are supported? ##
- **Instagram** (full support for English, Italian, Spanish and Hindi languages)
- **Facebook** (full support)
- **Google** (only parsing)
- **Amazon** (only parsing)
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

## How to use Instagram Service ##
```
//fileBuffer is the file 'account_information/personal_information.json' into the Instagram data source, as Buffer

let service = new Connector.InstagramService(LanguageCode.ENGLISH);
let result = await service.parsePersonalInformation(fileBuffer);
```

## How to use Facebook Service ##
```
//fileBuffer is the file 'profile_information/profile_information.json' into the Facebook data source, as Buffer

let service = new Connector.FacebookService();
let result = await service.parsePersonalInformation(fileBuffer);
```

## How to use Google Service ##
```
//fileBuffer is the file 'Takeout/Profile/Profile.json' into the Google data source, as Buffer

let service = new Connector.GoogleService(LanguageCode.ENGLISH);
let result = await service.parseProfile(fileBuffer);
```

## How to use Amazon Service ##
```
//fileBuffer is the file 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv' into the Amazon data source, as Buffer

let service = new Connector.AmazonService();
let result = await service.parsePrimeVideoWatchlist(fileBuffer);
```

## How to use Netflix Service ##
```
//fileBuffer is the file 'ACCOUNT/AccountDetails.csv' into the Netflix data source, as Buffer

let service = new Connector.NetflixService();
let result = await service.parsePersonalInformation(fileBuffer);
```

## How to use LinkedIn Service ##
```
//fileBuffer is the file 'linkedin/Ads Clicked.csv' into the LinkedIn data source, as Buffer

let service = new Connector.LinkedInService();
let result = await service.parseAdsClicked(fileBuffer);
```

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
let codes = await DescriptorService.getAllDataSourcesCodes();
```

## How to use Validator ##
Example of **ValidatorService** usage:
```
//zipFile is a zip file as Buffer

let service = new Connector.ValidatorService();
let validatedZip = await service.validateZIP(zipFile);
```
Example of **ValidatorInstagram** usage:
```
import {ValidatorInstagram} from '@humandataincome/connectors';
```
```
let validatedZip = await ValidatorInstagram.selectUsefulFilesFromZip(zipFile);
```

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

