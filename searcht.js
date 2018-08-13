
const {basename,sep,resolve} = require("path");

const {readFile, stat,readdir} = require("fs");


let results=[];
let filelist=[];

process.argv.slice(3).forEach(file=>{filelist.push(process.cwd()+sep+file)});
let searchxt =  new RegExp(process.argv[2]);

function searchrun(filelist) {
console.log('filelist',filelist);
filelist.forEach( f=> {
      stat(f, (error, st) => {
        if (error) throw error;
        if (st.isDirectory()) {
            console.log(f, 'is directory,getting content');
            readdir(f, (error, dirlist)=>{
                if (error) throw error;
               dirlist.forEach(file =>(searchrun([resolve(f,file)])))
            });
        }
        else {
             readFile(f, "utf8",  (error, text) => {
                if (error) throw error;
                else {

                    console.log(`The file ${basename(f)} ${searchxt.test(text) ? 'contains' : 'not contains'} ${process.argv[2]}`);
                    if(searchxt.test(text)) results.push(basename(f))
                }
            })
        }
    });
})};

searchrun(filelist)

console.log(results)