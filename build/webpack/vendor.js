const env = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');


module.exports = {

	entry: {
		vendor: require("./libs")
	},

	output: {
		filename: '[name].js',
		path: path.join(__dirname, "../../www"),
		library: '[name]',
		libraryTarget: "var"
	},

	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.join(__dirname, "../../www/[name].json")
		})
	]
};


