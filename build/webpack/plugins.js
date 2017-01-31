let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let StatsWebpackPlugin = require('stats-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const env = process.env.NODE_ENV || 'development';
let Visualizer = require('webpack-visualizer-plugin');

let server = [
	new Visualizer(),
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new webpack.optimize.CommonsChunkPlugin(
		{
			name: 'vendor',
			chunks: ['app', 'libs'],
			filename: 'vendor.js'
		}),

	new webpack.DefinePlugin({
		'NODE_ENV': JSON.stringify(env)
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
				})],
			tslint: {
				emitErrors: false,
				failOnHint: false,
				resourcePath: 'src',
				configFile: 'src/tsconfig.json'
			}
		},
	})
];

let client = [
	...server,
	new FaviconsWebpackPlugin({
		logo: './src/icon/icon.png',
		prefix: 'icons/'
	}),
	new StatsWebpackPlugin('stats.json', {
		chunkModules: true,
		exclude: [/node_modules/]
	}),
	new ExtractTextPlugin("styles.css")
];



// HOT-MODULE-REPLACEMENT
if (process.env.NODE_ENV !== "production") {
	client.push(new webpack.HotModuleReplacementPlugin())
}


module.exports = {client: client, server: server};
