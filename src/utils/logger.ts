import * as winston from 'winston';
import { LogLevel } from './utils.enum';

export default class Logger {
    private logger: winston.Logger;
    private readonly name: string;

    private format = winston.format.printf(({level, message, timestamp}) => {
        return `[${this.name}] [${timestamp}] [${level}] ${message}`;
    });

    constructor(name: string) {
        this.name = name;
        this.logger = winston.createLogger({
            format: winston.format.combine(winston.format.timestamp(), this.format),
            transports: [
                //new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.Console()
            ],
        });
    }
    public log(level: LogLevel, message: string): void {
        this.logger.log(level, message);
    }
}
