const fs = require('fs');
let stockprice = JSON.parse(fs.readFileSync('./src/const/stockprice.json', 'utf8'));
const {format, subDays, parse, differenceInDays, addDays} = require('date-fns');
let Backgrounddata = JSON.parse(fs.readFileSync('./src/const/StockMarketBackGroundData.json', 'utf8'));
let processingcache = stockprice;

/*
console.log(format(new Date(), "yyyy-M-dd"))
console.log(stockprice[0].date)
console.log(Backgrounddata.length)
console.log(Backgrounddata[0][0].serviceTime)*/

function stockDataFormat(name, price, nationName, stat, id, eco, AI, shares, ava, internalid) {
    this.stockName = name,
    this.stockPrice = price,
    this.nation = nationName,
    this.NS_Stat = stat,
    this.censusid = id,
    this.EcoStat = eco,
    this.AI = AI,
    this.TotalShares = shares,
    this.AvaShares = ava
    this.internalID = internalid
};

function cacheSave(ecostat, activeNations, stockData) {
    this.date = format(new Date(), "yyyy-M-dd"),
    this.RegionEcoStat = ecostat,
    this.activeStockNations = activeNations,
    this.stockData = stockData
};

let stockDataCache = [];



const calculation = async () => {
    /*
    console.log(Number(Backgrounddata[(Backgrounddata.length - 1)][0].AverageEcoRating) - Number(Backgrounddata[(Backgrounddata.length - 2)][0].AverageEcoRating))
    console.log(Backgrounddata[(Backgrounddata.length - 1)][0].AverageEcoRating)
    console.log(Backgrounddata[(Backgrounddata.length - 2)][0].AverageEcoRating)
    */
    console.log(stockprice[0].stockData);

    for (let i = 0; i < stockprice[0].stockData.length; i++) {
        for (let j = 0; j < Backgrounddata[(Backgrounddata.length -1)].length; j++) {
            //Cycling allows us to find the stock's nation and allows us to access the necessary data related to that stock.
            if (stockprice[0].stockData[i].nation === Backgrounddata[Backgrounddata.length -1][j].nationName) {
                if (stockprice[0].stockData[i].censusid === Backgrounddata[Backgrounddata.length -1][j].censusid) {
                    console.log(`Processing stock of ${Backgrounddata[Backgrounddata.length -1][j].nationName} now. ${stockprice[0].stockData[i].stockName}, census ID of ${stockprice[0].stockData[i].censusid}`);
                    console.log(`Stat Deviation of ${(Backgrounddata[Backgrounddata.length -1][j].data) - Backgrounddata[Backgrounddata.length -2][j].data}`);
                    for (let k = 0; k < Backgrounddata[(Backgrounddata.length -1)].length; k++) {
                        //Cycling in order to obtain the Economic Data of the Stock's nation. 
                        if (stockprice[0].stockData[i].nation === Backgrounddata[Backgrounddata.length -1][k].nationName) {
                            if (Backgrounddata[Backgrounddata.length -1][k].censusid === 1) {
                                console.log(`Economic Deviation of ${Backgrounddata[Backgrounddata.length -1][k].data - Backgrounddata[Backgrounddata.length - 2][k].data}`);
                                console.log(`Intial Price: of ${stockprice[0].stockData[i].stockName}: ${stockprice[0].stockData[i].StockPrice}`);
                                let change = (2)*((Backgrounddata[Backgrounddata.length - 1][k].data/Backgrounddata[Backgrounddata.length - 2][k].data)-1) + ((Backgrounddata[Backgrounddata.length -1][j].data)/(Backgrounddata[Backgrounddata.length -2 ][j].data)) + ((Backgrounddata[Backgrounddata.length - 1][0].AverageEcoRating)/(Backgrounddata[Backgrounddata.length - 2][0].AverageEcoRating));
                                console.log(change);
                                let newPrice = (stockprice[0].stockData[i].StockPrice)*((change/100)+1);
                                console.log(`New Price: of ${stockprice[0].stockData[i].stockName}: ${newPrice}`);
                                let newdata = new stockDataFormat(
                                    stockprice[0].stockData[i].stockName,
                                    newPrice,
                                    stockprice[0].stockData[i].nation,
                                    Backgrounddata[Backgrounddata.length - 1][j].data,
                                    Backgrounddata[Backgrounddata.length - 1][j].censusid,
                                    Backgrounddata[Backgrounddata.length - 1][k].data,
                                    stockprice[0].stockData[i].AI,
                                    stockprice[0].stockData[i].TotalShares,
                                    stockprice[0].stockData[i].AvaShares,
                                    stockprice[0].stockData[i].internalID
                                );
                                stockDataCache.push(newdata);

                            }
                        }
                    }
                } 
            }
        }
        if (stockprice[0].stockData[i].AI === true) {
            console.log(`Processing NPC stock now. ${stockprice[0].stockData[i].stockName}, with a Census ID of ${stockprice[0].stockData[i].censusid}`);
            let arbitaryDiff = (Math.random()*(10 - 0 + 1));
            let newEcoStat = stockprice[0].RegionEcoStat + arbitaryDiff;
            console.log(`Economic Deviation of ${arbitaryDiff}`);
            console.log(`Initial Price of ${stockprice[0].stockData[i].stockName}: ${stockprice[0].stockData[i].StockPrice}`)
            let arbitaryDiffInd = (Math.random()*(100 - 0 + 1));
            let newIndustryStat = stockprice[0].stockData[i].NS_Stat + arbitaryDiffInd
            let changeAI = (2)*(arbitaryDiff) + arbitaryDiffInd + ((Backgrounddata[Backgrounddata.length - 1][0].AverageEcoRating)/(Backgrounddata[Backgrounddata.length - 2][0].AverageEcoRating))
            console.log(changeAI);
            let newPrice = (stockprice[0].stockData[i].StockPrice)+((changeAI/100)+1);
            console.log(`New Price of ${stockprice[0].stockData[i].stockName}: ${newPrice}`);
            let newdata = new stockDataFormat(
                stockprice[0].stockData[i].stockName,
                newPrice,
                stockprice[0].stockData[i].nation,
                newIndustryStat,
                stockprice[0].stockData[i].censusid,
                newEcoStat,
                stockprice[0].stockData[i].AI,
                stockprice[0].stockData[i].TotalShares,
                stockprice[0].stockData[i].AvaShares,
                stockprice[0].stockData[i].internalID
            );
            stockDataCache.push(newdata)
        }
    }
    

    let SavedCache = new cacheSave(
        Backgrounddata[Backgrounddata.length - 1][0].AverageEcoRating,
        stockprice[0].activeStockNations,
        stockDataCache
    );

    processingcache.push(SavedCache)

    fs.writeFile('./src/const/stockprice.json', JSON.stringify(processingcache), (err) => {
    if (err) throw err});
}



calculation();

module.exports = { calculation };




// Formula: Change in Price = 2 x Change in Nation Economy(%) + Change in Industry(%) + Change in Regional Economy(%)