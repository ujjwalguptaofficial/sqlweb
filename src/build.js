const peg = require("pegjs");
const fs = require('fs');


// import * as parser from './parser';

function getFileContent(path) {
    return fs.readFileSync(`${path}`, {
        encoding: 'utf8'
    })
}

function saveAsFile(filePath, content) {
    fs.writeFileSync(filePath, content, {
        encoding: 'utf8'
    })
}

function createFolderIfNotExist(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

const getFilesContent = function (files) {
    var contents = "";
    files.forEach(file => {
        var content = getFileContent(file);
        contents += content;
    });

    return contents;
};

generateParser = function () {
    var grammar = getFilesContent(
        [
            'src/code/grammar/index.pegjs',
            'src/code/grammar/create.pegjs',
            'src/code/grammar/insert.pegjs',
            'src/code/grammar/remove.pegjs',
            'src/code/grammar/count.pegjs',
            'src/code/grammar/select.pegjs',
            'src/code/grammar/update.pegjs',
            'src/code/grammar/open.pegjs',
            'src/code/grammar/is_db_exist.pegjs',
            'src/code/grammar/common.pegjs',
            'src/code/grammar/constant.pegjs'
        ]);
    //console.log(grammar);
    saveAsFile('./src/output/grammar.pegjs', grammar);
    var content = peg.generate(grammar, {
        optimize: "speed",
        output: 'source',
        format: "commonjs"
    });
    saveAsFile('./src/output/parser.js', content);
}
createFolderIfNotExist('./src/output');
generateParser();