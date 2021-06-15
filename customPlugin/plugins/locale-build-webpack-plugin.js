const fs = require('fs');
const path = require('path');
const basePath = path.resolve('src/vendor/locales');
const outPath = path.resolve('public/js/locale.js');
const chalk = require('chalk');
const {wordMap} = require('../config');


class LocaleBuildWebpackPlugin {
    readLocale (name) {
        const pathanme = basePath + '/' + name;
        const res = fs.readFileSync(pathanme, {encoding: 'utf8'});
        if (!wordMap) {
            return res;
        }
        const reStr = '(' + Object.keys(wordMap).join('|') + ')';
        const re = new RegExp(reStr, 'g');
        return res.replace(re, it => wordMap[it]);
    }
    apply(compiler) {
        // eslint-disable-next-line no-shadow
        compiler.hooks.beforeRun.tapAsync('localeBuild', (compiler, callback)=>{
            let content = ['window.cloudLocale={\n'];
            fs.readdir(basePath, (err, files) => {
                files.forEach(item => {
                    const key = item.replace('.json', '');
                    const value = this.readLocale(item);
                    content.push(key);
                    content.push(':');
                    content.push(value);
                    content.push(',');
                });
                content.push('};');
                fs.writeFileSync(outPath, content.join(''), 'utf8');
                // eslint-disable-next-line no-console
                console.log(chalk.cyan('多语言打包完成'));
                callback();
            });
        });
    }
}
module.exports = LocaleBuildWebpackPlugin;
