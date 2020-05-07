const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ]
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
    ],
};
