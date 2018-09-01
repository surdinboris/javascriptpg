// exports.reverse = function(string) {
//     return Array.from(string).reverse().join("");
// };

const fetch = require("node-fetch");


//console.log(encodeURIComponent("https://eloquentjavascript.net/21_skillsharing.html"))
function fetchOK(url, options) {
    return fetch(url, options).then(response => {
        if (response.status < 400) return response;
        else throw new Error(response.statusText);
    });
}

async function pollTalks(update) {

    let
      res = await fetchOK("https://eloquentjavascript.net/21_skillsharing.html", {
          method: "GET",
//    headers: {"Content-Type": "application/json"},
          headers: undefined,
          // body: JSON.stringify({
          //     author: "gg",
          //     message: "ff"
          //})

      })

    update(res)
}



pollTalks(console.log)