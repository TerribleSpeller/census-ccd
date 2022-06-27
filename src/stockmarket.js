const CensusScale = require('./const/census');
const {nationCensusId} = require('./const/nations');
const axios = require('axios');
const fs = require('fs');
const minelegotipony = require('./const/nations');
const aeioux = require('./const/nations');
const minelegotiaandequestria = require('./const/nations');
const ridnez = require('./const/nations');
const tdvp = require('./const/nations');
const sal = require('./const/nations');
const deman = require('./const/nations');
const joco = require('./const/nations');
const nde = require('./const/nations');
const giu = require('./const/nations');
const dix = require('./const/nations');
const fet = require('./const/nations');
const { throws } = require('assert');

//This is specific to Stock Market - Collects Regional Economic Rating, Each Nation's Economic Rating and Each Stock's Industry's Stat
//@TODO: Make a base query method with a delaying mechanism. 
//console.log(nationNameList[0]);
//console.log(nationCensusId["minelegotipony"]);
let DataCollected = [];
function NationData(nation, log, time, stat) {
  this.nationName = nation;
  this.savedlog = log;
  this.timeused = time;
  this.data = stat;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const stockmarketfunc = async () => {
  for (let i = 0; i < nationCensusId.length; i++) {
    for (let j = 1; j < nationCensusId[i].length; j++) {
      let FirstDate = Number(new Date());
      console.log(`Serving Query at ${new Date()}`);
      let Querylog = `Querying: ${nationCensusId[i][0]}: ${Object.keys(CensusScale)[nationCensusId[i][j]]}(${nationCensusId[i][j]}): https://www.nationstates.net/cgi-bin/api.cgi?nation=${nationCensusId[i][0]};q=census;scale=${nationCensusId[i][j]};mode=score`;
      console.log(`${Querylog}, querying at ${new Date()}`);
      let unprocessedData = await axios.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${nationCensusId[i][0]};q=census;scale=${nationCensusId[i][j]};mode=score`);
      await sleep(1000);
      let processedData = unprocessedData.data.split("\n")[3].split("<")[1].split(">")[1];
      console.log(processedData);
      let SecondDate = Number(new Date());
      console.log(`Finished Serving Query at ${new Date()}`);
      let timechanged = SecondDate - FirstDate;
      const newNationData = new NationData(nationCensusId[i][0], Querylog, timechanged, processedData);
      DataCollected.push(newNationData);
    }
  }

  console.log(DataCollected);
  console.log(`Stock Done!`);

  fs.writeFile(`./cache/StockMarket-${new Date()}.txt`, JSON.stringify(DataCollected), (err) => {
    // In case of a error throw err.
    if (err) throw err});

}

stockmarketfunc();

module.exports = { stockmarketfunc }