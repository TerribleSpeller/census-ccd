const fs = require('fs');
let stockprice = JSON.parse(fs.readFileSync('./const/stockprice.json', 'utf8'));
const {format, subDays, parse, differenceInDays, addDays} = require('date-fns');
let Backgrounddata = JSON.parse(fs.readFileSync('./const/StockMarketBackGroundData.json', 'utf8'));
let processingcache = stockprice;

/*
console.log(format(new Date(), "yyyy-M-dd"))
console.log(stockprice[0].date)
console.log(Backgrounddata.length)
console.log(Backgrounddata[0][0].serviceTime)*/

function stockDataFormat(name, price, nationName, stat, id, eco, AI, shares, ava) {
    this.stockName = name,
    this.stockPrice = price,
    this.nation = nationName,
    this.NS_Stat = stat,
    this.censusid = id,
    this.EcoStat = eco,
    this.AI = AI,
    this.TotalShares = shares,
    this.AvaShares = ava
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
                                    Backgrounddata[Backgrounddata.length - 1][k].censusid,
                                    stockprice[0].stockData[i].AI,
                                    stockprice[0].stockData[i].TotalShares,
                                    stockprice[0].stockData[i].AvaShares
                                );
                                stockDataCache.push(newdata);

                            }
                        }
                    }
                } 
            }
        }
    }

    let SavedCache = new cacheSave(
        Backgrounddata[Backgrounddata.length - 1][0].AverageEcoRating,
        stockprice[0].activeStockNations,
        stockDataCache
    );

    processingcache.push(SavedCache)

    fs.writeFile('./const/stockprice.json', JSON.stringify(processingcache), (err) => {
    if (err) throw err});
}



calculation();





// Formula: Change in Price = 2 x Change in Nation Economy(%) + Change in Industry(%) + Change in Regional Economy(%)