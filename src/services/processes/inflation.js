const fs = require('fs');
let stockprice = JSON.parse(fs.readFileSync('./src/const/stockprice.json', 'utf8'));
const {format, subDays, parse, differenceInDays, addDays} = require('date-fns');
let Backgrounddata = JSON.parse(fs.readFileSync('./src/const/StockMarketBackGroundData.json', 'utf8'));
let processingcache = stockprice;

const inflation = async () => {
    let EcoRating1 = Backgrounddata[Backgrounddata.length - 1][0].AverageEcoRating
    
}