declare const require: any;
let compression = require('compression');

const app = require("express")();

app.use(compression());
app.use(require("express").static("www"));


app.use(require("morgan")("combined"));

-app.use(require("./middleware").default());
app.listen(3000);
