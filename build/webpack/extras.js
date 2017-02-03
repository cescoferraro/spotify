let path = require('path');

const resolveLoader = {
	modules: [
		path.join(__dirname, "../../node_modules")
	]
};

const resolve = {
	extensions: ['.js', '.tsx', '.json', 'pcss']
};


let hotLoaders = (env) => {
	let hotLoaders = [];
	if (!env.prod) {
		hotLoaders = ["react-hot-loader/patch", 'webpack-hot-middleware/client'];
	}
	return hotLoaders;
};

let stats = {
	chunks: false,
	context: "../../src/"
};

let devtools = env => {
	return env.prod ? "cheap-module-source-map" : "cheap-module-eval-source-map";
};



let node_env = (step, env) => {
	console.log(step, " env: ", env.prod);
	if (env.prod) {
		process.env['NODE_ENV'] = 'production';
	}
};

module.exports = {
	set_node_env: node_env,
	stats: stats,
	hotLoaders: hotLoaders,
	resolve: resolve,
	resolveLoader: resolveLoader,
	devtools: devtools
};
