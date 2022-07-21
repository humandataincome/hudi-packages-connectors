import {TikTokService} from "../../src";

async function testInstagram(){
    await testService();
}

async function testService() {
    try {
        const x = await TikTokService.parseUserData(Buffer.from(JSON.stringify(require(`src/mock/datasource files/tiktok/user_data.json`))));
        console.log(x!.followerList!.followers);
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testInstagram();
