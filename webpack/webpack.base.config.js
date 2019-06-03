const path = require('path');
const SmartBannerPlugin = require('smart-banner-webpack-plugin');
const banner = require('../build_helper/license');

module.exports = [{
    name: "sqlweb",
    entry: "./src/index.ts",
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader'
            }
        }]
    },
    mode: 'none',
    resolve: {
        extensions: ['.ts', '.js'] // '' is needed to find modules like "jquery"
    },
    plugins: [
        new SmartBannerPlugin(banner)
    ]
}];