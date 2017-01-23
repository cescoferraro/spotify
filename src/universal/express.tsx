declare let require: any;
const app = require("express")();
app.use(require("express").static("www"));
app.use(require("morgan")("combined").default);
app.use(require("./server").default());
app.listen(3000);
