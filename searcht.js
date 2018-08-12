
const {basename,sep} = require("path");

const {readFile, stat} = require("fs");

let searchxt =  new RegExp(process.argv[2]);
let filelist=[];
process.argv.slice(3).forEach(file=>{filelist.push(process.cwd()+sep+file)});


 function searchrun(filelist) {
console.log('filelist',filelist);
filelist.forEach(async f=> {

    await  stat(f, async (err, st) => {
        //console.log(st);
        if (st.isDirectory()) {
            console.log(f, 'is directory,getting content')
            searchrun([f]);
        }
        else {
            await readFile(f, "utf8", async (error, text) => {

                if (error) throw error;

                else {

                    console.log(`The file ${basename(f)} ${searchxt.test(text) ? 'contains' : 'not contains'} ${process.argv[2]}`);
                }
            })
        }

    });
})};

searchrun(filelist)