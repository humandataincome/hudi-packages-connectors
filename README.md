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
| *LinkedIn*      |     &check;     |      &check;       |       &check;        |         &cross;         |
| *Netflix*       |     Partial     |      &check;       |       &check;        |         &cross;         |
| *Shopify*       |     &check;     |      &check;       |       &check;        |         &cross;         |
| *Twitter*       |     Partial     |      &check;       |       &check;        |         &cross;         |
| *TikTok*        |     Partial     |      &check;       |       &check;        |         &cross;         |
| *Reddit*        |     Partial     |      &check;       |       &check;        |         &cross;         |

## How to use the library:
### How to install the library
```sh
npm i @humandataincome/connectors
```

# Read the Wiki for a better documentation


# How do I retrieve my personal data sources?

### Instagram
You can find the guide at this link: https://help.instagram.com/181231772500920 under the section **Downloading a copy of your data on Instagram**.

Alternately, from Android and iPhone, you can find the **Request Download** under your **Settings** -> **Security** -> **Download data**. From Desktop, you can find it under **Settings** -> **Privacy and security**
-> **Data download** -> **Request download**.
Always select the **JSON** format.

### Facebook
Click on https://www.facebook.com/dyi, select Format **JSON** and Media Quality **High**, select a **Data Range** (**All time** has more information). Scroll at the end of the page and click on the blue button **Request a download**.

### Amazon
Go to https://www.amazon.com/hz/privacy-central/data-requests/preview.html, select **Request All Your Data** from the drop-down menu and then **Submit Request**. Check your email address, find the last Amazon's email and click on **Confirm Data Request**.

### Netflix
Go into one of your account' profiles, click on your account's icon in the top-right corner of the window, click on **Account**, then click **Download your personal data** under Settings paragraph and finish clicking the red button **Send request**.

### Google
You can find the guide at this link: https://takeout.google.com/.

### LinkedIn
From Computer: Click on your icon, click on **Settings and Profile**, **Data privacy**, **Get a copy of your data** and Download the larger Archive.

### Shopify
You can find the guide at this link: https://blog.coupler.io/how-to-export-shopify-data/.

### Twitch
Go to https://privacyportal.onetrust.com/webform/0e674578-2f0b-4638-8943-97e3c8060048/ee57cd1d-b315-4b29-90cd-4def381b86c9 and compile the form.

### Twitter
Go to https://twitter.com/settings/download_your_data.

### TikTok
Go to https://www.tiktok.com/setting and follow the procedure after clicking Download your data.

### Reddit
Go to https://www.reddit.com/settings/data-request, select GDPR and send the request.
