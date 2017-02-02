const env = process.env.NODE_ENV || 'development';


let config = {
	target: 'web',
	name: 'client',
	stats: require("./extras").stats,
	entry: {
		app: [...require("./extras").hotLoaders, "./src/client"]
	},
	output: {
		path: require('path').join(__dirname, "../../www"),
		filename: "js/[name].bundle.js"
	},

	devtool: require("./extras").devtools,
	plugins: require("./plugins").client,
	resolveLoader: require("./extras").resolveLoader,
	module: require("./client-loaders").loaders,
	resolve: require("./extras").resolve,
};

if (env === "production") {
	config.entry.libs = require('./libs');
}

module.exports = config;

