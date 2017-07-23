const path = require("path")

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
        template: './client/index.html',
        filename: 'index.html',
        inject: 'body'
})


module.exports = {
        entry: {
                react: './client/index.js'
        },
        output: {
                path: path.join(__dirname, "dist"),
                filename: 'output.js'
        },
        module: {
                loaders: [
                        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
                        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
                        { test: /\.css$/, loader: "style-loader!css-loader" },
                        {
                                test: /\.(jpe?g|png|gif|svg)$/i,
                                use: [{
                                        loader: 'file-loader',
                                        options: {
                                                // path where the images will be saved
                                                name: 'assets/img/[name].[ext]'
                                        }
                                }, {
                                        loader: 'image-webpack-loader',
                                        options: {

                                                mozjpeg: {
                                                        quality: 65
                                                },
                                                pngquant: {
                                                        quality: "10-20",
                                                        speed: 4
                                                },
                                                svgo: {
                                                        plugins: [
                                                                {
                                                                        removeViewBox: false
                                                                },
                                                                {
                                                                        removeEmptyAttrs: false
                                                                }
                                                        ]
                                                },
                                                gifsicle: {
                                                        optimizationLevel: 7,
                                                        interlaced: false
                                                },
                                                optipng: {
                                                        optimizationLevel: 7,
                                                        interlaced: false
                                                }
                                        }
                                }]
                        }
                ]
        },
        watch: true,
        plugins: [HtmlWebpackPluginConfig]
}