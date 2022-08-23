import {ServiceTiktok} from "../../../src";

describe('TikTok Service test', () => {
    test('parseUserData', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/tiktok/user_data.json`;
        const result = await ServiceTiktok.parseUserData(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'diwxv283491l';
        expect(JSON.stringify(result!.followerList!.followers[3].username)).toBe(JSON.stringify(expected));
    });
});
