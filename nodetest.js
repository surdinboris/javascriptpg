const {readdirSync} = require("fs");
const {createServer} = require("http");


let myserver= createServer((request,response) => {
    //response.writeHead(200, {"Content-Type": "text/html"});
    //root drive
    if (request.url == '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
        let rootdir = readdirSync("/");
        let fileLinks=rootdir.map((val)=> `<a href=http://localhost:8000/${val}>${val}</a>`);
        response.write(`
    
    <h1>NodeJS</h1>
        
    <p>${fileLinks.join("<br>")}</p>`);

        response.end();
    }

    else if (request.url == '/file'){
        let {readFile}=require("fs").promises;
        response.writeHead(200,{"Content-Type": "text/html"});
        readFile('/Gpl').then((res )=>{
            let lines = res.toString().split("\n");
            lines.forEach(l=>response.write(l.concat('<br>')))
            response.end()
            })


    }
    //pull    http://www.aquarium.ru/
    else if(request.url == '/aquarium'){

        const fetch = require('node-fetch');
        fetch('http://aquarium.ru')
            .then(res => res.text()).then((body) => {


        response.writeHead(200, {"Content-Type": "text/html"});
            response.write(`
    <h1>NodeJS</h1>

    <p>${body}</p>`);
            response.end()
        });
    }
    //request to eloquent
    else if(request.url == '/eloquent') {
        const {request} = require("http");
        let requestStream =
            request({
                hostname: "eloquentjavascript.net",
                path: "/20_node.html",
                method: "GET",
                headers: {Accept: "text/html"}
            }, resp => {
                console.log("Server responded with status code",
                resp.statusCode);
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(`
    <h1>NodeJS</h1>

    <p>${JSON.stringify(resp.headers)}</p>`);

                response.end()

            });
        requestStream.end();
    }
//ivalid request
    else {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write(`
    <p style="font-size: 50px; font-family: 'Franklin Gothic Medium'">
    404 <br> </p>
    Resourse not availalable <br>
    <code>${request.url}</code>`);

        response.end();

    }
})

myserver.listen(8000);
console.log("Listening! (port 8000)");

let cnt =0;
///8001

createServer((request, response) => {
    console.log(request.method);
    console.log('url',request.url);

    response.writeHead(200, {"Content-Type": "text/plain"});
    request.on("data", chunk =>{
        console.log(chunk);
        response.write(chunk.toString().toUpperCase())});

   request.on("end", () => response.end(78));

}).listen(8001);

console.log("Listening! (port 8001)");