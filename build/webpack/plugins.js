let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let StatsWebpackPlugin = require('stats-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const env = process.env.NODE_ENV || 'development';
console.log("==================");
console.log("NODE_ENV at WEBPACK");
console.log(env);
let common = [
		new webpack.NamedModulesPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin(
			{
				name: 'vendor',
				chunks: ['app', 'libs'],
				filename: 'vendor.js'
			}),
		new ExtractTextPlugin("styles.css"),
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(env)
		}),
		new StatsWebpackPlugin('stats.json', {
			chunkModules: true,
			exclude: [/node_modules/]
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			options: {
				context: '/',
				postcss: [
					require("lost")(),
					require("postcss-cssnext")({
						browsers: '> 0%', customProperties: true,
						colorFunction: true, customSelectors: true,
					})]
			},
		})
	]
	;

let client = [
	...common,
	// new CleanWebpackPlugin(['www'], {
	// 	root: path.join(__dirname, "../../"),
	// 	verbose: true
	// }),
	new FaviconsWebpackPlugin({
		logo: './src/frontend/icon/icon.png',
		prefix: 'icons/'
	})
];
if (process.env.NODE_ENV !== "production") {
	client.push(new webpack.HotModuleReplacementPlugin())
}

let server = [...common];

module.exports = {client: client, server: server};
