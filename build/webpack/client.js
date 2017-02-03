module.exports = (env = {prod: false}) => {
	let extras = require("./extras");
	extras.set_node_env("client",env);

	let base = {
		target: 'web',
		name: 'client',
		stats: extras.stats,
		entry: {
			app: [...extras.hotLoaders(env), "./src/client"]
		},
		output: {
			path: require('path').join(__dirname, "../../www"),
			filename: "js/[name].bundle.js"
		},

		devtool: extras.devtools(env),
		plugins: require("./plugins").client,
		resolveLoader: require("./extras").resolveLoader,
		module: require("./client-loaders").loaders,
		resolve: extras.resolve,
	};

	if (env.prod) {
		base.entry.libs = require('./libs');
	}

	return base


};



