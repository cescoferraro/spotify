const app = require("express")();
const compiler = require('webpack')(require('./build/webpack/config.js'));
app.use(require('webpack-dev-middleware')(compiler));
app.use(require('webpack-hot-middleware')(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(require('webpack-hot-server-middleware')(compiler, {chunkName: 'server'}));
app.use(require("morgan")('combined'));
app.use(require("./www/server.bundle").default);
app.listen(3000, "0.0.0.0");
