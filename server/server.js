const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const fiveMin = 1000 * 60 * 5;
const maxAge = { maxAge: fiveMin };
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(compression());
app.use('/js', express.static(path.join(__dirname, 'js'), maxAge));
app.use('/vendor', express.static(path.join(__dirname, 'vendor'), maxAge));
app.use('/icons', express.static(path.join(__dirname, 'icons'), maxAge));
app.use('/css', express.static(path.join(__dirname, 'css'), maxAge));
app.use('/html', express.static(path.join(__dirname, 'html'), maxAge));
app.use('/images', express.static(path.join(__dirname, 'images'), maxAge));
app.use('/appcache', express.static(path.join(__dirname, 'appcache'), maxAge));
const clientStats = require('./stats.json');
const outputPath = __dirname;

app.get('/service-worker.js', (req, res) => {
  res.sendFile('./service-worker.js', {
    root: './',
    maxAge: fiveMin
  });
});

app.get('/manifest.json', (req, res) => {
  res.sendFile('/manifest.json', {
    root: './icons',
    maxAge: fiveMin
  });
});

app.get('/OneSignalSDKWorker.js', (req, res) => {
  res.sendFile('/OneSignalSDKWorker.js', {
    root: './signal',
    maxAge: fiveMin
  });
});

app.get('/OneSignalSDKUpdaterWorker.js', (req, res) => {
  res.sendFile('/OneSignalSDKUpdaterWorker.js', {
    root: './signal',
    maxAge: fiveMin
  });
});

app.use(
  require('./server/main').default({
    production: true,
    clientStats,
    outputPath
  })
);

app.listen(5000);
