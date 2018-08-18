const {createServer} = require("http");
const {createReadStream} = require("fs");
const {stat, readdir,readFile} = require("fs").promises;
const {resolve, sep} = require("path");
const baseDirectory = process.cwd();
const mime = require("mime");
const {parse} = require("url");

const index=baseDirectory + sep + 'index.html';
createServer((request,response)=> {
    if(request.method=='GET') {
        //let bodyp = createReadStream(index);

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
                ///////{body, status = 200, type = "text/plain"} ---unpackingwith fallbacks  for object returned from handler
                .then(({body, status = 200, type = "text/html"}) => {

                    response.writeHead(status, {"Content-Type": type});

                    if (body && body.pipe) body.pipe(response);

                    else  {
                        response.write(ind);
                        response.write(body);
                        response.end(body);
                    }


                })

        })
    }

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
        let urllist=(await readdir(path)).map((c)=>{
            return `<a href=${request.url}${c}/>${c}</a><br>`});
        return {body: urllist.join("\n")};
    } else {
        return {body: createReadStream(path),
            type: mime.getType(path)};
    }
};