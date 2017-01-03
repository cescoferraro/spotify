let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8000',
			"./src/frontend/client"]
	},
	target: 'web',
	plugins: [
		new FaviconsWebpackPlugin({
			logo: './src/frontend/icon/icon.png',
			prefix: 'icons/'
		}),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			showErrors: true,
			chunks: ['app'],
			template: 'src/frontend/index.html'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				context: '/',
				postcss: [
					require("lost")(),
					require("postcss-cssnext")(
						{
							browsers: '> 0%',
							customProperties: true,
							colorFunction: true,
							customSelectors: true,
						})
				]
			}
		})],
	output: {
		path: path.join(__dirname, "../../www"),
		filename: "js/[name].bundle.js"
	},

	devtool: 'cheap-module-eval-source-map',
	resolveLoader: {
		modules: [
			path.join(__dirname, "../../node_modules")
		]
	},
	module: {
		rules: [
			{
				test: /\.(tsx?)$/,
				loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader?silent=true&configFileName=src/tsconfig.json', 'tslint-loader']
			},
			{
				test: /\.(pcss)$/,
				loaders: [
					'style-loader',
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5',
					'postcss-loader?sourceMap',
				]
			},
			{
				test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
				loader: 'url-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				loader: 'url-loader'
			}]
	},
	resolve: {
		extensions: ['.webpack.js', '.web.js', '.tsx', '.js', '.jsx', '.ts']
	},
	devServer: {
		inline: true,
		port: 8000,
		proxy: {
			'**': {
				secure: false,
				bypass: function (req) {
					if (req.path.indexOf('/fonts/') !== -1
						|| req.path.indexOf('/icons/') !== -1
						|| req.path.indexOf('/images/') !== -1) {
						return '/'
					}
					return 'http://localhost:8080';
				}
			}
		},
		stats: {
			assets: false,
			warnings: false,
			chunks: true,
			chunkModules: false,
			chunkOrigins: true
		}
	}
};


