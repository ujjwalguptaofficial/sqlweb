var {
    createFolderIfNotExist
} = require('./helper');

const fs = require('fs-extra')
fs.copySync('./src/output', './dist');