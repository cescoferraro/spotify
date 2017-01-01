let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8000',
			// 'webpack/hot/only-dev-server',
			"./src/index"]
	},
	target: 'web',
	plugins: [
		new FaviconsWebpackPlugin({
			logo: './src/icon/icon.png',
			prefix: 'icons/'
		}),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			showErrors: true,
			chunks: ['app'],
			template: 'src/index.ejs'
		}),
		new FaviconsWebpackPlugin({
			logo: './src/icon/icon.png',
			prefix: 'icons/'
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
		path: path.join(__dirname, "www"),
		filename: "js/[name].bundle.js"
	},

	devtool: 'cheap-module-eval-source-map',
	resolveLoader: {
		modules: [
			path.join(__dirname, "node_modules")
		]
	},
	module: {
		rules: [
			{
				test: /\.(tsx?)$/,
				loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader?silent=true', 'tslint-loader']
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
				bypass: function (req, res, opt) {
					//your custom code to check for any exceptions
					//console.log('bypass check', {req: req, res:res, opt: opt});
					if (req.path.indexOf('/img/') !== -1 || req.path.indexOf('/public/') !== -1) {
						return '/'
					}

					if (req.headers.accept.indexOf('html') !== -1) {
						return '/index.html';
					}
				}
			}
		},
		stats: {
			// Config for minimal console.log mess.
			// assets: false,
			warnings: true,
			chunks: true,
			chunkModules: false,
			chunkOrigins: true
		}
	}
};


