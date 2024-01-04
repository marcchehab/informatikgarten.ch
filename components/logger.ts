
enum LogLevels {
    DEBUG,
    INFO,
    WARN,
    ERROR
}
const LOG_LEVEL = LogLevels[process.env.LOG_LEVEL] || LogLevels.DEBUG;

type LogLevelString = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';

export default function log(level: LogLevelString, ...messages) {
    if (LOG_LEVEL > LogLevels[level]) {
        return;
    } else if (LOG_LEVEL === LogLevels[level]) {
        console.error(`${level}:`, ...messages);
        return;
    } else {
        console.log(`${level}:`, ...messages);
    }
}
