let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		server: ["./src/server"]
	},
	target: 'node',

	plugins: [
		new ExtractTextPlugin("styles.css"),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.NoErrorsPlugin(),
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
		filename: "[name].bundle.js"
	},
	resolveLoader: {
		modules: [
			path.join(__dirname, "../../node_modules")
		]
	},
	module: {
		rules: [
			{
				test: /\.(tsx?)$/,
				loaders: ['react-hot-loader/webpack', 'ts-loader?silent=true&configFileName=src/tsconfig.json', 'tslint-loader']
			},
			{
				test: /\.(pcss)$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5!postcss-loader?sourceMap'
				})
			},
			{
				test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
				loader: 'file-loader?name=fonts/font-[sha512:hash:base64:7].[ext]'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				loader: 'file-loader?name=images/img-[sha512:hash:base64:7].[ext]'
			}]
	},
	resolve: {
		extensions: ['.js', '.tsx']
	}
};


