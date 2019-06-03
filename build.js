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
            'src/grammar/index.pegjs',
            'src/grammar/create.pegjs',
            'src/grammar/insert.pegjs',
            'src/grammar/remove.pegjs',
            'src/grammar/count.pegjs',
            'src/grammar/select.pegjs',
            'src/grammar/update.pegjs',
            'src/grammar/open.pegjs',
            'src/grammar/is_db_exist.pegjs',
            'src/grammar/common.pegjs',
            'src/grammar/constant.pegjs'
        ]);
    //console.log(grammar);
    saveAsFile('./build/grammar.pegjs', grammar);
    var content = peg.generate(grammar, {
        optimize: "speed",
        output: 'source',
        format: "commonjs"
    });
    saveAsFile('./build/parser.js', content);
}
createFolderIfNotExist('./build');
generateParser();