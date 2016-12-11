webpack = require('webpack');

module.exports = {
    entry: './client/client.js',

    output: {
        path: 'public',
        filename: 'bundle.js',
        publicPath: ''
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }]
    },
    devtool: process.env.NODE_ENV === 'production' ? '' : "#inline-source-map",

    plugins: process.env.NODE_ENV === 'production' ? [
        // for react removing dev warnings (wtf => https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build)
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [],
};

