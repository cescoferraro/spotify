let argv = require('argv');
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');


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

let index = () => {
    if (args.options.prod) {
        console.log("index prod");
        return 'src/prod.html'
    }
    return 'src/dev.html'

};


let plugins = () => {
    let basePLUGINS = [
        new CopyWebpackPlugin([{from: index(), to: 'index.html'}]),
        new webpack.LoaderOptionsPlugin({
            options: {
                sassLoader: {
                    includePaths: [path.resolve(__dirname, "./src/sass")]
                },
                context: '/',
                postcss: [
                    require("postcss-cssnext")({browsers: '> 0%',
                        customProperties:true,
                        colorFunction:true,
                        customSelectors:true,
                    })
                    // require('autoprefixer')({browsers: '> 0%'})
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
                // compress: {warnings: true},
                // output: {comments: true},
                sourceMap: true
            })
            // new CleanWebpackPlugin(['www'], {
            //     path: path.join(__dirname, "www"),
            //     verbose: true,
            //     dry: false
            // })
        );
        return basePLUGINS
    }
    basePLUGINS.push(new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin());
    return basePLUGINS

};

let rules = () => {
    let rules = [
        {
            enforce: 'pre',
            test: /\.js$/,
            loader: "source-map-loader"
        },

        {
            enforce: 'pre',
            test: /\.css$/,
            loader: "source-map-loader!postcss-loader?sourceMap"
        },
        {test: /\.tsx?$/, loader: "ts-loader"}];

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
    entry: "./src/ts/app.tsx",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "www")
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-maps",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".css", ".otf", ".scss", ".sass", ".tsx", ".js"]
    },
    resolveLoader: {modules: [path.join(__dirname, "node_modules")]},

    module: {
        rules: rules()
    },

    plugins: plugins(),
    devServer: {
        contentBase: "./www",
        inline: true,
        port: 8000,
        proxy: {
            '**': 'http://localhost:8080'
        }
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

};
