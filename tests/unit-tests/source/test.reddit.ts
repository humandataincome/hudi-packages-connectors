import {ServiceReddit} from "../../../src/source";


async function testReddit(){
    await testService();
}

async function testService() {
    try {
        const path = require('path');
        const {Parser} = require('../../utils/parser');
        console.log(await ServiceReddit.parseSubscribedSubreddit(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/datasource/raw files/reddit/subscribed_subreddits.csv`))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testReddit();
