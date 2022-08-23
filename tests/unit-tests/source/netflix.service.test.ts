import {ServiceNetflix} from "../../../src";

describe('Amazon Service test', () => {
    const path = require('path');
    const {Parser} = require("../../utils/parser");

    test('parsePersonalInformation', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/netflix/ACCOUNT/AccountDetails.csv`;
        const result = await ServiceNetflix.parsePersonalInformation(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'davide@gmail.it';
        expect(JSON.stringify(result!.emailAddress)).toBe(JSON.stringify(expected));
    });
    test('parsePreferences', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/netflix/CONTENT_INTERACTION/IndicatedPreferences.csv`;
        const result = await ServiceNetflix.parsePreferences(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Sex Education';
        expect(JSON.stringify(result!.list[0].show)).toBe(JSON.stringify(expected));
    });
    test('parseMyList', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/netflix/CONTENT_INTERACTION/MyList.csv`;
        const result = await ServiceNetflix.parseMyList(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Baggio: The Divine Ponytail';
        expect(JSON.stringify(result!.list[0].titleName)).toBe(JSON.stringify(expected));
    });
    test('parseSearchHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/netflix/CONTENT_INTERACTION/SearchHistory.csv`;
        const result = await ServiceNetflix.parseSearchHistory(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'mano';
        expect(JSON.stringify(result!.list[0].queryTyped)).toBe(JSON.stringify(expected));
    });
    test('parseViewingActivity', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/netflix/CONTENT_INTERACTION/ViewingActivity.csv`;
        const result = await ServiceNetflix.parseViewingActivity(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Stagione 1 (Trailer): Squid Game';
        expect(JSON.stringify(result!.list[0].title)).toBe(JSON.stringify(expected));
    });
    test('parsePlaybackEvents', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/netflix/CONTENT_INTERACTION/PlaybackRelatedEvents.csv`;
        const result = await ServiceNetflix.parsePlaybackEvents(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2021-12-10T16:04:03.000Z';
        expect(JSON.stringify(result!.list[0].playbackStartTime)).toBe(JSON.stringify(expected));
    });
    test('parseProfiles', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/netflix/PROFILES/Profiles.csv`;
        const result = await ServiceNetflix.parseProfiles(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Ospiti';
        expect(JSON.stringify(result!.list[0].profileName)).toBe(JSON.stringify(expected));
    });
});
