import * as dotenv from 'dotenv';
import * as fs from 'fs';

class ConfigUtils {
    private readonly envConfig: Record<string, any>;

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
export const CONFIG = new ConfigUtils(`process.${process.env.NODE_ENV}.env`);