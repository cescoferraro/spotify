let ExtractTextPlugin = require("extract-text-webpack-plugin");
let path = require('path');

const resolveLoader = {
	modules: [
		path.join(__dirname, "../../node_modules")
	]
};

const resolve = {
	extensions: ['.js', '.tsx', '.json']
};

const loaders = {
	rules: [
		{
			test: /\.(tsx?)$/,
			loaders: ['react-hot-loader/webpack', 'ts-loader?silent=true&configFileName=src/tsconfig.json', 'tslint-loader']
		},
		{
			test: /\.(pcss)$/,
			loader: ExtractTextPlugin.extract({
				fallbackLoader: "style-loader",
				loader: 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]___[hash:base64:5!postcss-loader?sourceMap'
			})
		},
		{
			test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
			loader: 'file-loader?name=fonts/font-[sha512:hash:base64:7].[ext]'
		},
		{
			test: /\.(jpe?g|png|gif|svg)$/,
			loader: 'file-loader?name=images/img-[sha512:hash:base64:7].[ext]'
		}
	]
};

let hotLoaders = [];
if (process.env.NODE_ENV !== "production") {
	hotLoaders = ["react-hot-loader/patch", 'webpack-hot-middleware/client'];
}


module.exports = {hotLoaders: hotLoaders, loaders: loaders, resolve: resolve, resolveLoader: resolveLoader};
