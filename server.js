let path = require('path');
let webpack = require('webpack');
let express = require('express');
let config = require('./webpack.config');
let WebpackDevServer = require('webpack-dev-server');
let debug = require('debug');
let app = express();


new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true,
    stats: {
        colors: true,
        reasons: false
    }
}).listen(8000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
});


// let compiler = webpack(config);

// const log = {
//     pack: debug('webpack')
// };
//
// app.use(require('webpack-dev-middleware')(compiler, {
//     publicPath: config.output.publicPath,
//     stats: {
//         colors: true,
//         reasons: false
//     }
// }));
//
// app.use(require('webpack-hot-middleware')(compiler, {
//     log: log.pack,
//     path: '/__webpack_hmr',
//     heartbeat: 10 * 1000
// }));
//
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
//
// app.listen(3000, function (err) {
//     if (err) {
//         return console.error(err);
//     }
//
//     console.log('Listening at http://localhost:3000/');
// });
