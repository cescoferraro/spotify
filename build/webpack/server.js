module.exports = (env = {prod: false}) => {
	let extras = require("./extras");
	extras.set_node_env("server", env);

	return {
		name: 'server',
		target: 'node',
		entry: {
			server: [env.prod ? "./src/server" : "./src/middleware"]
		},
		output: {
			path: require('path').join(__dirname, "../../www"),
			filename: "[name].bundle.js",
			libraryTarget: 'commonjs2'
		},
		devtool: extras.devtools(env),
		stats: extras.stats,
		plugins: require("./plugins").server,
		resolveLoader: extras.resolveLoader,
		module: require("./server-loaders").loaders,
		resolve: extras.resolve
	}
};


