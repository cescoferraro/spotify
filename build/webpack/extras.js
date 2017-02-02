let path = require('path');
const env = process.env.NODE_ENV || 'development';
const resolveLoader = {
	modules: [
		path.join(__dirname, "../../node_modules")
	]
};

const resolve = {
	extensions: ['.js', '.tsx', '.json', 'pcss']
};


let hotLoaders = [];
if (process.env.NODE_ENV !== "production") {
	hotLoaders = ["react-hot-loader/patch", 'webpack-hot-middleware/client'];
}

let stats = {
	chunks: false,
	context: "../../src/"
};

let devtools = env === "production" ? "cheap-module-source-map" : "cheap-module-eval-source-map"

module.exports = {
	stats: stats,
	hotLoaders: hotLoaders,
	resolve: resolve,
	resolveLoader: resolveLoader,
	devtools: devtools
};
