const path = require('path');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');

const libraryTarget = [{
    type: "commonjs2",
    name: 'sqlweb.node.js'
}];

function getConfigForTaget(target) {
    return {
        target: "node",
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "../build"),
            filename: target.name,
            library: 'SqlWeb',
            libraryTarget: target.type
        }
    }
}

function createConfigsForAllLibraryTarget() {
    var configs = [];
    libraryTarget.forEach(function (target) {
        configs.push(merge(baseConfig[0], getConfigForTaget(target)));
    })
    return configs;
}

module.exports = [...createConfigsForAllLibraryTarget()]