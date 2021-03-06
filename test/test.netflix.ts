import {NetflixService} from "../src";

async function testNetflix(){
    await testService();
}

async function testService() {
    try {
        const path = require('path');
        const {Parser} = require('./utils/parser');
        console.log(await NetflixService.parsePersonalInformation(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/netflix/ACCOUNT/AccountDetails.csv`))));
        console.log(await NetflixService.parsePreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/netflix/CONTENT_INTERACTION/IndicatedPreferences.csv`))));
        console.log(await NetflixService.parseMyList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/netflix/CONTENT_INTERACTION/MyList.csv`))));
        console.log(await NetflixService.parseSearchHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/netflix/CONTENT_INTERACTION/SearchHistory.csv`))));
        console.log(await NetflixService.parseViewingActivity(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/netflix/CONTENT_INTERACTION/ViewingActivity.csv`))));
        console.log(await NetflixService.parsePlaybackEvents(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/netflix/CONTENT_INTERACTION/PlaybackRelatedEvents.csv`))));
        console.log(await NetflixService.parseProfiles(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/netflix/PROFILES/Profiles.csv`))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testNetflix();
