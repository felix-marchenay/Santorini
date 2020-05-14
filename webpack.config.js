const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',

    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    devServer: {
        contentBase: './public',
        port: 8081
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new CopyWebpackPlugin([{ from: './public/models', to: 'models' }]),
        new CopyWebpackPlugin([{ from: './public/image', to: 'image' }]),
        new VueLoaderPlugin()
    ],
};
