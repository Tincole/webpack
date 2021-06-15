const chalk = require('chalk');

const languageObj = require('../src/vendor/locales/en');
function findRepeat(words) {
    const hash = {};
    let warnArr = [];
    words.forEach((value, key) => {
        if (hash[value]) {
            warnArr.push(`${value}   --line: ${key + 2}`);
        }
        hash[value] = true;
    });
    return warnArr;
}

class codeCheckWebpackPlugin {
    apply(compiler) {
        compiler.hooks.watchRun.tapAsync('watch-run', (watching, callback) => {
            const changedFile = watching.watchFileSystem.watcher.mtimes;
            if (Object.keys(changedFile).some(v => v.indexOf('\\src\\vendor\\locales\\en.json') !== -1)) {
                const repeatWord = findRepeat(Object.values(languageObj));
                // eslint-disable-next-line no-console
                repeatWord.length > 0 && console.log(chalk.red('en.json中 多语言重复了'), repeatWord);
            }
            callback();
        });
    }
}
module.exports = codeCheckWebpackPlugin;


