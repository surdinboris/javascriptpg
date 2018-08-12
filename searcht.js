
const {sep} = require("path");
const {readFile} = require("fs");
let searchxt =  new RegExp(process.argv[2]);
let filelist=[];
process.argv.slice(3).forEach(file=>{filelist.push(process.cwd()+sep+file)});
console.log(filelist);

filelist.forEach(async f=>{
    await readFile(f, "utf8", (error, text) => {
        if (error) throw error;
        console.log(`The file ${f} ${searchxt.test(text)? 'contains': 'not contains'} ${process.argv[2]}`);
    })

})
//processFiles(filelist)