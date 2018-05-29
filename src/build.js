const peg = require("pegjs");
const fs = require('fs');


// import * as parser from './parser';

function getFileContent(path) {
    return fs.readFileSync(`./${path}`, {
        encoding: 'utf8'
    })
}

function saveAsFile(filePath, content) {
    //recreate file if exist otherwise create
    // fs.closeSync(fs.openSync(filePath, 'w'));//
    fs.writeFileSync(filePath, content, {
        encoding: 'utf8'
    })
}

generateParser = function () {
    var grammar = getFileContent('./code/index.pegjs');
    var content = peg.generate(grammar, {
        optimize: "speed",
        output: 'source',
        format: "commonjs"
    });
    saveAsFile('./output/parser.js', content);
}

generateParser();