var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var server = http.createServer(function(req,res){    
    var pathname = url.parse(req.url).pathname;
    if(pathname == "/"){
        pathname = "index.html";
    }
    var fileURL = "./" + path.normalize("./static/" + pathname);
    var extname = path.extname(pathname);
    fs.readFile(fileURL,function(err,data){
        if(err){            
            res.writeHead(404,{"Content-Type":"text/html;charset=UTF8"})
            res.end("404,Request file does not exist:" + fileURL);
        }      
        getMime(extname,function(mime){
            res.writeHead(200,{"Content-Type":mime})
            res.end(data);
 console.log("extname:" + extname);
        });
    });
});

server.listen(8080,"127.0.0.1");

function getMime(extname,callback){
    fs.readFile("./mime.json",function(err,data){
        if(err){
            throw Error("./mime.json:" + extname);
            return;
        }        
        var mimeJSON = JSON.parse(data);
        var mime =  mimeJSON[extname]  || "text/plain";
        callback(mime);
    });
}