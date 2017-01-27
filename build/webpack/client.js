const env = process.env.NODE_ENV || 'development';

module.exports = {
	target: 'web',
	name: 'client',
	stats: require("./loaders").stats,
	entry: {
		app: [...require("./loaders").hotLoaders, "./src/client"],
		libs: [
			'react',
			'react-dom',
			'lodash',
			'rx',
			'css-keyframer',
			'rx-dom',
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
		path: require('path').join(__dirname, "../../www"),
		filename: "js/[name].bundle.js"
	},

	devtool: env === "production" ? "cheap-module-source-map" : "cheap-module-eval-source-map",
	plugins: require("./plugins").client,
	resolveLoader: require("./loaders").resolveLoader,
	module: require("./loaders").loaders,
	resolve: require("./loaders").resolve,
};


