export type LogLevel = 'error' | 'debug' | 'info';

export default class LoggerUtils {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public log(level: LogLevel, message: string, functionName?: string): void {
        if (functionName) {
            console.log(
                `[${this.name}] [${new Date().toISOString()}] [${level}] [${functionName}] ${message}`,
            );
        } else {
            console.log(
                `[${this.name}] [${new Date().toISOString()}] [${level}] ${message}`,
            );
        }
    }
}
