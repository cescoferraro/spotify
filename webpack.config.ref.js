let argv = require('argv');
let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CopyWebpackPlugin = require('copy-webpack-plugin');
let WebpackCleanupPlugin = require('webpack-cleanup-plugin');

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

console.log("dasfdsfds");
console.log(args.options.prod);

let loaders = () => {
    if (args.options.prod) {
        console.log("loaders prod");
        return [
            {
                test: /\.scss$/, loader: ExtractTextPlugin.extract('style?sourceMap',
                'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                'postcss-loader?sourceMap=inline',
                'sass?sourceMap')
            },
            {test: /\.tsx?$/, loader: "ts-loader"},
            {
                test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file?name=images/[name].[ext]'
            },
        ]
    }
    return [
        {
            test: /\.scss$/,
            loaders: [
                'style?sourceMap',
                'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                'postcss-loader?sourceMap=inline',
                'resolve-url-loader',
                'sass?sourceMap'
            ]
        },
        {test: /\.tsx?$/, loader: "ts-loader"},
        {
            test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
            loader: 'file'
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url-loader'
        },
    ]
};


let index = () => {
    if (args.options.prod) {
        console.log("index prod");
        return 'src/prod.html'
    }
    return 'src/dev.html'

};


let preloaders = () => {
    let pre = [
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            loaders: ['typed-css-modules', 'postcss-loader?sourceMap=inline', 'sass']
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {test: /\.js$/, loader: "source-map-loader"}
    ];
    if (args.options.prod) {
        console.log("rules prod");
        return pre
    }
    return pre
};

module.exports = {
    entry: "./src/ts/app.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/www/"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".css", ".otf", ".scss", ".sass", ".tsx", ".js"]
    },
    resolveLoader: {root: path.join(__dirname, "node_modules")},

    module: {
        loaders: loaders(),
        preLoaders: preloaders()
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./src/sass")]
    },

    plugins: [
        // new WebpackCleanupPlugin(),
        new ExtractTextPlugin("styles.css"),
        new CopyWebpackPlugin([{from: index(), to: 'index.html'},
        ])

    ],
    devServer: {
        inline: true,
        port: 8000,
        proxy: {'**': 'http://localhost:8080'},
    }

};
