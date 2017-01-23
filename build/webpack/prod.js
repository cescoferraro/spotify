let path = require('path');


let stats = {
	chunks: false,
	context: "../../src/"
};


module.exports = [
	{
		target: 'web',
		name: 'client',
		stats: stats,
		entry: {
			app: [...require("./loaders").hotLoaders, "./src/frontend/client"],
			libs: [
				'react', 'react-dom'
			]
		},
		output: {
			path: path.join(__dirname, "../../www"),
			filename: "js/[name].bundle.js"
		},

		plugins: require("./plugins").client,
		resolveLoader: require("./loaders").resolveLoader,
		module: require("./loaders").loaders,
		resolve: require("./loaders").resolve,
	},
	{
		name: 'server',
		target: 'node',
		entry: {
			server: ["./src/universal/server"],
			express: ["./src/universal/express"]
		},
		output: {
			path: path.join(__dirname, "../../www"),
			filename: "[name].bundle.js",
			libraryTarget: 'commonjs2'
		},
		stats: stats,
		plugins: require("./plugins").server,
		resolveLoader: require("./loaders").resolveLoader,
		module: require("./loaders").loaders,
		resolve: require("./loaders").resolve
	}];


