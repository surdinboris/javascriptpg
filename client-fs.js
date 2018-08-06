
const {request} = require("http");
let req=request({
    hostname: "localhost",
    port: 8001,
    method: "POST"
}, response => {
    response.on("data", chunk =>{
        console.log(chunk);
        console.log(process.cwd())
        process.stdout.write(chunk.toString())});
});

req.end("khkhk");
// → HELLO SERVER
