//
// const {request} = require("http");
// let req=request({
//     hostname: "localhost",
//     port: 8001,
//     method: "POST"
// }, response => {
//     response.on("data", chunk =>{
//         console.log(chunk);
//         process.stdout.write(chunk.toString())});
// });
//
// req.end("khkhk");
// → HELLO SERVER


const {request} = require("http");
let req=request({
    host: "localhost",
    port: 8000,
    //path: "/uppercase",
    method: "POST"
}, (response) => {
     response.on("data", chunk =>{
     //console.log(chunk);
     process.stdout.write(chunk.toString())});

    // response.on("error", ch =>{
    //     console.log("error",ch );
    // });

});
req.write("khkhk");
req.write("\n");
req.write("khkhk");
req.end();
// → HELLO SERVER

///
//
// let hj=function({body, status = 200, type = "text/plain"}){
// console.log(body)
//     return {
//         status: 405,
//         body: `Method kaka not allowed.`
//     };
//
// };
//
// hj('Method');