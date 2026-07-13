const { merge } = require('webpack-merge');
const common = require('./webpack.common');

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
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            }
        ],
    },
});