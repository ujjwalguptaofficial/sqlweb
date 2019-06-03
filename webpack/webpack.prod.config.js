const path = require('path');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
module.exports = [merge(baseConfig[0], {
    output: {
        path: path.join(__dirname, "../build"),
        filename: "sqlweb.min.js",
        library: 'SqlWeb'
    },
    mode: 'production'
})]