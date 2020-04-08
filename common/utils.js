const chalk = require('chalk');

// log
function log() {
  console.log.apply(console, arguments);
}

log.error = function(msg, exit) {
  log(chalk.red(msg));
  exit && process.exit(0);
}

log.warn = function(msg) {
  log(chalk.yellow(msg));
}

log.info = function(msg) {
  log(chalk.greenBright(msg));
}

// getVersionStr
function getVersionStr(str) {
  let res = str.match(/_(\S*).zip/)[1];
 return res || str;
}

module.exports = { log, getVersionStr };