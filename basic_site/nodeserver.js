const {createServer} = require("http");
const {createReadStream} = require("fs");
const {resolve, sep} = require("path");
const baseDirectory = process.cwd();
const mime = require("mime");

const index=baseDirectory + sep + 'index.html';
createServer((request,response)=> {
    if(request.method=='GET') {
        let body = createReadStream(index);
        let type= mime.getType(index);
        response.writeHead(200, {"Content-Type": type});
        body.pipe(response)
        // response.end(body);
    }




}).listen(8000);