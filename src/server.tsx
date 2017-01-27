declare const require: any;


const app = require("express")();

app.use(require("express").static("www"));


app.use(require("morgan")("combined"));
app.use(require("./middleware").default());
app.listen(3000);
