const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/app.js',
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: []
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        filename: 'scripts/bundle.js',
        path: path.resolve(__dirname, 'dist/')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};