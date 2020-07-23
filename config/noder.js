
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


const pluginEntries = function () {
    const pluginRoot = resolveApp('src/plugins');
    return glob.sync(pluginRoot + '/*/*.tsx').reduce((acc, filePath) => {
        const fileName = filePath.replace(/.*\/(\w+)\/\w+(\.html|\.tsx)$/, (rs, $1) => $1);
        return { ...acc, [fileName]: filePath };
    }, {});
};

console.log(pluginEntries());