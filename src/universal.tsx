import extracted from "./app/server-render";
import * as express from "express";
import * as React from "react";
declare let require: any;
declare let global: any;

let path = require("path");
let app = express();
let fs = require("fs");
let PORT = 3000;

app.get("*", (request, response) => {
    console.log("request for ", request.url);
    global.navigator = {
        userAgent: request.headers["user-agent"]
    };
    let filePath = "./www" + request.url;
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
            console.log("server-side rendering");
            const html = extracted(request.url);
            response.send(html);
            return;

        }
        else {
            console.log("serving static file");
            response.writeHead(200, {"Content-Type": contentType});
            response.end(content, "utf-8");
        }
    });
});


app.listen(PORT, () => {
    console.log("listening at http://localhost:" + PORT)
});
