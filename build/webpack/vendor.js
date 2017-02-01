const env = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');


module.exports = {
	entry: {
		vendor: [
			'react',
			'react-dom',
			'lodash',
			'rx',
			'css-keyframer',
			'rx-lite',
			'rx-lite-dom',
			'redux',
			'react-redux',
			'react-router',
			'redux-actions',
			'react-md-spinner',
			'material-ui',
			'inline-style-prefixer'
		]
	},

	output: {
		filename: '[name].dll.js',
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


