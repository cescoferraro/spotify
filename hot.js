const webpack = require("webpack"),
	vendorConfig = require('./build/webpack/vendor.js')(),
	vendorCompiler = webpack(vendorConfig);

vendorCompiler.run(function (err, stats) {
		console.log("DLL READY");
		const app = require("express")(),
			morgan = require("morgan"),
			webpackDevMiddleware = require("webpack-dev-middleware"),
			webpackHotMiddleware = require('webpack-hot-middleware'),
			webpackHotServerMiddleware = require('webpack-hot-server-middleware'),
			devConfig = require('./build/webpack/dev.js')(),
			compiler = webpack(devConfig);

		app.use(webpackDevMiddleware(compiler));
		app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
		app.use(webpackHotServerMiddleware(compiler, {chunkName: 'server'}));
		app.use(morgan('combined'));
		app.listen(3000, "0.0.0.0");

	}
);
