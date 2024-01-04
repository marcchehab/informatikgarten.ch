
enum LogLevels {
    DEBUG,
    INFO,
    WARNING,
    ERROR
}
const LOG_LEVEL = LogLevels[process.env.LOG_LEVEL] || LogLevels.DEBUG;

type LogLevelString = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';

export default function log(level: LogLevelString, ...messages) {
    if (LogLevels[level] < LOG_LEVEL) {
        console.log(`${level}:`, "ignored");
        return;
    } else if (LogLevels[level] == LogLevels.ERROR) {
        console.error(`${level}:`, ...messages);
        return;
    } else {
        console.log(`${level}:`, ...messages);
    }
}
