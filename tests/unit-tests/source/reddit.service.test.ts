import {ServiceReddit} from "../../../src/source";

describe('Reddit Service test', () => {
    const path = require('path');
    const {Parser} = require('../../utils/parser');

    test('parsePersonalInformation', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/reddit/subscribed_subreddits.csv`;
        const result = await ServiceReddit.parseSubscribedSubreddit(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'elex';
        expect(JSON.stringify(result!.list[0])).toBe(JSON.stringify(expected));
    });
});


