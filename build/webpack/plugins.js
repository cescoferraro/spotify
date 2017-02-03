let path = require('path');
let webpack = require('webpack');
let StatsWebpackPlugin = require('stats-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const env = process.env.NODE_ENV || 'development';
let Visualizer = require('webpack-visualizer-plugin');
let SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

let server = [
	new Visualizer(),
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
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
	new SWPrecacheWebpackPlugin(
		{
			cacheId: 'spotify',
			filename: 'sw.js',
			maximumFileSizeToCacheInBytes: 4194304,
			minify: true,
			runtimeCaching: [{
				handler: 'cacheFirst',
				urlPattern: '/',
			}],
		}
	),
];


// HOT-MODULE-REPLACEMENT
if (process.env.NODE_ENV !== "production") {
	client.push(new webpack.HotModuleReplacementPlugin());
	client.push(
		new webpack.DllReferencePlugin({
			context: '.',
			manifest: require('../../www/vendor.json')
		}));

} else {
	client.push(new webpack.optimize.CommonsChunkPlugin(
		{
			name: 'vendor',
			chunks: ['app', 'libs'],
			filename: 'vendor.js'
		}));
}


module.exports = {client: client, server: server};
