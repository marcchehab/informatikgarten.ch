
enum LogLevels {
    DEBUG3, // VVV
    DEBUG2, // VV
    DEBUG,
    INFO,
    WARNING,
    ERROR
}
const LOG_LEVEL = LogLevels[process.env.NEXT_PUBLIC_LOG_LEVEL] || LogLevels.DEBUG;

type LogLevelString = 'DEBUG3' | 'DEBUG2' | 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';

export default function log(level: LogLevelString, ...messages) {
    if (LogLevels[level] < LOG_LEVEL) {
        return;
    } else if (LogLevels[level] == LogLevels.ERROR) {
        console.error(`${level}:`, ...messages);
        return;
    } else {
        console.log(`${level}:`, ...messages);
    }
}
