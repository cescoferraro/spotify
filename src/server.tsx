import extracted from "./app/server-render";
import * as express from "express";
import * as React from "react";
declare let require: any;
declare let global: any;
import * as debug  from "debug";
import *  as injectTapEventPlugin from "react-tap-event-plugin";
let path = require("path");
let app = express();
let fs = require("fs");
let PORT = 3000;
debug.enable("*");
injectTapEventPlugin();


app.get("*", (request, response) => {
    let filePath = "./www" + request.url;
    debug("SERVER")("Request for ", request.url);
    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = "text/html";
    let mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".woff": "application/font-woff",
        ".ttf": "application/font-ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "application/font-otf",
        ".svg": "application/image/svg+xml"
    };
    contentType = mimeTypes[extname] || "application/octect-stream";
    fs.readFile(filePath, function (error, content) {
        if (error) {
            debug("SERVER-RENDER")("server-side rendering index.html");
            const html = extracted(request);
            response.send(html);
        }
        else {
            debug("STATIC")("serving ", request.url);
            response.writeHead(200, {
                "Content-Type": contentType,
                "Cache-Expiration": 3600
            });
            response.end(content, "utf-8");
        }
    });
}).listen(PORT, () => {
    debug("SERVER")("listening at http://localhost:" + PORT);
});
