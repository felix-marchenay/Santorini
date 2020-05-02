module.export = {
    entry: './src/index.js',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['css-loader', 'sass-loader'],
            }
        ]
    },
};