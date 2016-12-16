let argv = require('argv');
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

let args = argv.option({
    name: 'prod',
    short: 'p',
    type: 'boolean',
    description: 'Defines an option for your script',
    example: "'script --opiton=value' or 'script -o value'"
}).run();

if (args.options.prod === undefined) {
    args.options.prod = false
}


let plugins = () => {
    let basePLUGINS = [
        new HtmlWebpackPlugin({
            chunks: ['app'],
            body: true,
            chunksSortMode: 'dependency',
            env: {
                Prod: args.options.prod
            },
            template: 'src/index.ejs'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                sassLoader: {
                    includePaths: [path.resolve(__dirname, "./src/sass")]
                },
                context: '/',
                postcss: [
                    require("postcss-cssnext")(
                        {
                            browsers: '> 0%',
                            customProperties: true,
                            colorFunction: true,
                            customSelectors: true,
                        })
                ]
            }
        }),


    ];
    if (args.options.prod) {
        basePLUGINS.push(
            new ExtractTextPlugin({
                filename: "styles.css",
                disable: false,
                allChunks: true,
                sourceMapFilename: '[file].map'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false},
                output: {comments: false},
                sourceMap: true
            })
        );
        return basePLUGINS
    }
    basePLUGINS.push(new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin());
    return basePLUGINS

};


let rules = () => {
    let rules = [
        // {
        //     enforce: 'pre',
        //     test: /\.js$/,
        //     loader: "source-map-loader"
        // },
        {
            enforce: 'pre',
            test: /\.css$/,
            loader: "source-map-loader!postcss-loader?sourceMap"
        },
        {test: /\.tsx?$/, loader: ["react-hot-loader", "ts-loader"]}];

    if (args.options.prod) {
        console.log("rules prod");
        rules.push({
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    {
                        notExtractLoader: 'style-loader',
                        loader: 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5!postcss-loader?sourceMap!sass-loader?sourceMap'
                    }
                )
            },
            {
                test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            });
        return rules
    }
    rules.push({
            test: /\.scss$/,
            loaders: [
                'style-loader',
                'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5',
                'postcss-loader?sourceMap',
                'sass-loader?sourceMap'
            ]
        },
        {
            test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
            loader: 'url-loader'
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url-loader'
        }
    );
    return rules


};


module.exports = {
    entry: {
        app: ["./src/ts/app.tsx",
            'webpack-dev-server/client?http://localhost:8000',
            'webpack/hot/dev-server',
        ],
        vendor1: ['react'],
        vendor2: ['react-dom']
    },
    plugins: plugins(),
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "www")
    },

    devtool: "cheap-module-source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".css", ".otf", ".scss", ".sass", ".tsx", ".js"]
    },
    resolveLoader: {modules: [path.join(__dirname, "node_modules")]},
    module: {
        rules: rules()
    },
    devServer: {
        contentBase: "./www",
        inline: true,
        port: 8000,
        proxy: {
            '**': 'http://localhost:8080'
        }
    }
};
