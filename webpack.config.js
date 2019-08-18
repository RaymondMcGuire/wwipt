const { resolve } = require('path');
let webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        wwipt: "./src/index.ts",
        ww_ray_tracing_lambertian_worker: "./src/worker/ww-ray-tracing-lambertian.worker.ts"
    },
    output: {
        filename: "[name].js",
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