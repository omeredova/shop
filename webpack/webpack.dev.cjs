const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            }
        ],
    },
});
