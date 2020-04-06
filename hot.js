// <<<<<<< HEAD
// const app = require("express")();
// const vendor = require('webpack')(require('./build/webpack/vendor.js'));
// vendor.run(function (err, stats) {
// 		console.log("DLL READY");
// 		const compiler = require('webpack')(require('./build/webpack/dev.js'));
// 		app.use(require('webpack-dev-middleware')(compiler));
// 		app.use(require('webpack-hot-middleware')(compiler.compilers.find(compiler => compiler.name === 'client')));
// 		app.use(require('webpack-hot-server-middleware')(compiler, {chunkName: 'server'}));
// 		app.use(require("morgan")('combined'));
// 		app.listen(3000, "0.0.0.0");
// 	}
// );
// =======Vkuu
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('./webpack.config.js')({ production: false });
const clientConfig = require('./webpack.client.js')({ production: false });
const app = express();
const compiler = webpack(config);
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;

app.use('/dll', express.static(path.join(__dirname, 'dll')));
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath }));
app.use(
  webpackHotMiddleware(compiler.compilers.find(comp => comp.name === 'client'))
);
app.use(
  webpackHotServerMiddleware(compiler, {
    serverRendererOptions: {
      outputPath,
      production: false
    }
  })
);

app.listen(5000, '0.0.0.0', () => {
  console.log('Server started: http://localhost:5000');
});
// >>>>>>> release/1.0.0
