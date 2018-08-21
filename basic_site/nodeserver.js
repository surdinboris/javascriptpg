const {createServer} = require("http");
const {createReadStream, createWriteStream } = require("fs");
const {stat, readdir,readFile} = require("fs").promises;
const {resolve, sep} = require("path");
const baseDirectory = process.cwd();
const mime = require("mime");
const querystring = require("querystring").parse;
const { parse } = require('url');
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
const index=baseDirectory + sep + 'index.html';
createServer((request,response)=> {
    if(request.method=='GET') {
        let type = mime.getType(index);
        response.writeHead(200, {"Content-Type": type});
        //lets try to put files
        //bodyp.pipe(response);

        readFile(index).then(ind => {
            filedir(request)
                .catch(error => {

                    if (error.status != null) return error;

                    return {body: String(error), status: 500};
                })
                .then(({body, status = 200, type = "text/html"}) => {

                    response.writeHead(status, {"Content-Type": type});
                    //response.writeHead(status, {"Content-Type": 'html'})
                    //sending mime file contents in case of file opening
                    if (type=='file') {//body.pipe(response);
                       console.log('bodypath',body);
                        readFile(body, "utf8").then(b=>{
                            response.write(`<!DOCTYPE html>
                            <textarea name="textar"  form="usrform" rows="30" cols="50">
                            ${b.replaceAll("<","&lt;")
                                .replaceAll(">","&gt;")}</textarea>
                            <form action=\"${request.url}\" id="usrform" method="POST">
                            <input type="submit">
                            </form>
`);
                            response.end()
                    })}

                    //generating page with dir content
                    else  {
                        response.write(ind);
                        response.end(body);
                    }
                })

        })
    }

    else if(request.method=='POST') {

            filedir(request).catch(error => {
                if (error.status != null) return error;
                return {body: String(error), status: 500};
            }).then(({body, status = 200, type = "text/html"}) =>{
                let data ='';

                request.on("data", chunk => {
                    data+=chunk});

                request.on('end', () => {
                    console.log('data', querystring(data));
                    let file=createWriteStream(body);
                    file.write(querystring(data).textar);
                    response.end('saved')
        })})}




}).listen(8000);

function urlPath(url) {
    let {pathname} = parse(url);
    let path = resolve(decodeURIComponent(pathname).slice(1));

    if (path != baseDirectory &&
        !path.startsWith(baseDirectory + sep)) {
        throw {status: 403, body: "Forbidden"};
    }
    return path;
}

function pipeStream(from, to) {
    return new Promise((resolve, reject) => {
        from.on("error", reject);
        to.on("error", reject);
        to.on("finish", resolve);
        from.pipe(to);
    });
}
let filedir= async function(request) {
    let path = urlPath(request.url);

    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        console.log(error);
        if (error.code != "ENOENT") throw error;
        else return {status: 404, body: "File not found"};
    }
    if (stats.isDirectory()) {
        let urllist=await Promise.all((await readdir(path)).map(async (c)=>{
            console.log('path',path+sep+c)
            let dirfilestat = await stat(path+sep+c)

            if(dirfilestat.isDirectory()) return `<a class="dir" href=${request.url}${c}/>${c}</a><br>`;
           // return `<a href=${request.url}${c}/>${c}</a><button type="submit" value="${request.url}${c}">Edit</button>  <br> `
       return `<a href="#" onclick='window.open("${request.url}${c}/");return false;'>${c}</a><br>`;

        //    return `<a  href=${request.url}${c}/>${c}</a><br>`;
    }));
        return {body: urllist.join("\n"),
            type: 'dir'};
    }

    else {
        //return {body: createReadStream(path),
        return {body: path,
            type: 'file'};
    }
};
