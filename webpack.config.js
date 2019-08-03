const { resolve } = require('path');

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: resolve(__dirname, 'dist'),
        publicPath: "dist/"
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.ts?$/,
                use: "source-map-loader"
            },
            {
                test: /\.ts?$/,
                use: [
                    { loader: "babel-loader" },
                    {
                        loader: "ts-loader"
                    }
                ],
                exclude: /(?:node_modules)/,
            }
        ]
    },
    devtool: 'inline-source-map',
};