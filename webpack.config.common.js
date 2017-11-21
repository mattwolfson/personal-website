var webpack = require('webpack');

module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'raw-loader' }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=.+)?$/, loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ],
        exprContextCritical: false

    }
};