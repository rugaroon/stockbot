const readline = require("readline");
const colors = require('colors')
const axios = require('axios')
const today = new Date();

const key = '' // get key from https://marketstack.com/
    //const { font } = require('./font.js')
let interface = `  
   ██
░███████╗████████╗░█████╗░░█████╗░██╗░░██╗██████╗░░█████╗░████████╗
██╔██╔══╝╚══██╔══╝██╔══██╗██╔══██╗██║░██╔╝██╔══██╗██╔══██╗╚══██╔══╝
╚██████╗░░░░██║░░░██║░░██║██║░░╚═╝█████═╝░██████╦╝██║░░██║░░░██║░░░
░╚═██╔██╗░░░██║░░░██║░░██║██║░░██╗██╔═██╗░██╔══██╗██║░░██║░░░██║░░░
███████╔╝░░░██║░░░╚█████╔╝╚█████╔╝██║░╚██╗██████╦╝╚█████╔╝░░░██║░░░
╚══██═══╝░░░╚═╝░░░░╚════╝░░╚════╝░╚═╝░░╚═╝╚═════╝░░╚════╝░░░╚═╝░░░

Type "end" to close the stock app`

console.clear()
setTimeout(function() {}, 1000);

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\n> ",
});

//function convertFont(str) {
//   str = str.split('')
//   for (let i = 0; i < str.length; i++) {
//      console.log(`${font[str[i]]}`)
// }
//}


console.log(colors.green(interface))

cli.prompt();
cli.on("line", (line) => {
    if (line == 'end') {
        cli.close()
    } else if (line == 'clear') {
        console.clear()
        setTimeout(function() {}, 1000);
        console.log(colors.green(interface))
        cli.prompt();
    } else {
        axios(`http://api.marketstack.com/v1/tickers/${line}/eod/latest?access_key=${key}`)
            .then(i => {
                let symbol = i.data.symbol
                    //convertFont(symbol)
                console.log(`
                SYMBOL: ${colors.blue(symbol)}

                Volume: ${colors.blue(i.data.volume.toLocaleString())}
                Open: ${colors.blue(i.data.open)}
                High: ${colors.blue(i.data.high)}
                Low: ${colors.blue(i.data.low)}
                Close: ${colors.blue(i.data.close)}
                Exchange: ${colors.blue(i.data.exchange)}
                Date: ${today.toLocaleDateString("en-US")}
                
                `)
            }).catch(e => {
                console.log(`Error found searching for "${line}"`)
            })

        cli.prompt();
    }
});