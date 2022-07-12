const {format, subDays, parse, differenceInDays, addDays} = require('date-fns')
const fs = require('fs')
let stockPrice = JSON.parse(fs.readFileSync('./const/stockprice.json', 'utf8'));

/*
let testDate = format(new Date(), "yyyy-M-dd");
console.log(testDate);
let testDate2 = format(subDays(parse(testDate, 'yyyy-M-dd', new Date()), 1), "yyyy-M-dd");
console.log(testDate2);
*/
/*
function Dataparsing() {
    //const importedData = fs.readFileSync('./const/stockprice.js', 'utf8')

    //console.log(SPdata) //Its an Object - Actually an Array
    console.log(stockPrice);

    console.log(typeof(stockPrice));
    //console.log(Object.keys(stockPrice)) //Access using '0'
    console.log(`Accessed Json data is ${stockPrice[0].date}`);
    let today = format(new Date(), "yyyy-M-dd");
    console.log(today)
    let diff = differenceInDays(parse(stockPrice[0].date, 'yyyy-M-dd', new Date()), parse(today, 'yyyy-M-d', new Date()));
    console.log(`${today}, is Today's Date. The Difference is ${diff} `)
    let test = format(subDays(parse(today, 'yyyy-M-d', new Date()), Math.abs(diff)), "yyyy-M-dd");
    console.log(test)
    stockPrice.push("Test")
    console.log(stockPrice)
    console.log(Object.keys(stockPrice[0]))
    //console.log(stockPrice[0].stockData.find(({ name }) => name === 'AAA'))

    const nationData = JSON.parse(fs.readFileSync(`./cache/StockMarket-${today}`))
    console.log(nationData);
}

Dataparsing();
*/


