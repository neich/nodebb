const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: [
        'bootstrap-loader', path.join(__dirname, './src/js/main.js')
    ],
    output: {
        path:  path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
    },
    optimization: {
    splitChunks: {
        chunks: "all",
            minSize: 0
    }
},
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            Backbone: 'backbone',
            _: 'underscore'
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
             title: 'Exemple PEW',
             template: path.join(__dirname, 'src/index.html'),
         }),
        new webpack.SourceMapDevToolPlugin({})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug'
                ]
            }
        ]
    }
};
