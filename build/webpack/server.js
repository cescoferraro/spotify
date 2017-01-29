const env = process.env.NODE_ENV || 'development';

module.exports = {
	name: 'server',
	target: 'node',
	entry: {
		server: [env === "production" ? "./src/server" : "./src/middleware"]
	},
	output: {
		path: require('path').join(__dirname, "../../www"),
		filename: "[name].bundle.js",
		libraryTarget: 'commonjs2'
	},
	devtool: env === "production" ? "cheap-module-source-map" : "cheap-module-eval-source-map",
	stats: require("./extras").stats,
	plugins: require("./plugins").server,
	resolveLoader: require("./extras").resolveLoader,
	module: require("./server-loaders").loaders,
	resolve: require("./extras").resolve
};


