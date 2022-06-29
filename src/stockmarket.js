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
let FilteredNations = [];
let FilteredNationsData = [];

function NationData(nation, log, time, stat) {
  this.nationName = nation;
  this.savedlog = log;
  this.timeused = time;
  this.data = stat;
};

//To get a NtaionBackgroundData that is required to do math and everything else. 
function NationBackgroundData(nation, time, ecoRating, ecoOutput, employment, taxation, scienceRate) {
  this.nationName = nation;
  this.serviceTime = time;
  this.economyRating = ecoRating;
  this.GDPRating = ecoOutput;
  this.employRating = employment;
  this.taxRating = taxation;
  this.SARate = scienceRate;
}

//To Place all the average Confederation Eco Stats.
function RegionAverageData(time, Eco, GDP, Emp, Tax, Sci) {
  this.serviceTime = time;
  this.AverageEcoRating = Eco;
  this.AverageGDPRating = GDP;
  this.AverageEmpRating = Emp;
  this.AverageTaxRating = Tax;
  this.AverageSciRating = Sci;
}

let CCDEcoTotal = 0;
let CCDGDPTotal = 0;
let CCDempTotal = 0;
let CCDTaxTotal = 0;
let CCDSciTotal = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let delay = 500;

const backgrounddata = async () => {
  let nationList = await axios.get(`https://www.nationstates.net/cgi-bin/api.cgi?region=confederation_of_corrupt_dictators&q=nations`);
  let nationToSearch = nationList.data.split(`<REGION id="confederation_of_corrupt_dictators">\n<NATIONS>`)[1].split(":")
  console.log(`Serving for ${nationToSearch.length - 1} nations`);
  for (let i = 0; i < nationToSearch.length - 1; i++) {
    let waittime = 500 + delay
    console.log(`Serving request ${i}`)
    try {
      let searchData = await axios.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${nationToSearch[i]};q=census;scale=80`) 
      await sleep(waittime)
      let searchData2 = searchData.data.split("\n")[3].split("<")[1].split(">")[1];
      if (searchData2 > 30) {
        FilteredNations.push(nationToSearch[i]);
        console.log(nationToSearch[i]);
        console.log(searchData2);
      }  
      console.log(waittime)
    } catch(e) {
      console.log(e)
    }
  }
  console.log(FilteredNations)
  for (let j = 1; j < FilteredNations.length; j++ ) {
    sleep(delay*4);
    console.log(`Serving request ${j}`);
    console.log(`Nation: ${FilteredNations[j]}`);
    let ecodata = await axios.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${FilteredNations[j]};q=census;scale=1;mode=score`);
    let ecooutputdata = await axios.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${FilteredNations[j]};q=census;scale=76;mode=score`);
    let employdata = await axios.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${FilteredNations[j]};q=census;scale=56;mode=score`);
    let taxdata = await axios.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${FilteredNations[j]};q=census;scale=49;mode=score`);
    let sadata = await axios.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${FilteredNations[j]};q=census;scale=70;mode=score`);
    CCDEcoTotal += Number(ecodata.data.split("\n")[3].split("<")[1].split(">")[1]);
    CCDGDPTotal += Number(ecooutputdata.data.split("\n")[3].split("<")[1].split(">")[1]);
    CCDempTotal += Number(employdata.data.split("\n")[3].split("<")[1].split(">")[1]);
    CCDTaxTotal += Number(taxdata.data.split("\n")[3].split("<")[1].split(">")[1]);
    CCDSciTotal += Number(sadata.data.split("\n")[3].split("<")[1].split(">")[1]);
    const newData = new NationBackgroundData(
      FilteredNations[j],
      new Date(),
      Number(ecodata.data.split("\n")[3].split("<")[1].split(">")[1]),
      Number(ecooutputdata.data.split("\n")[3].split("<")[1].split(">")[1]),
      Number(employdata.data.split("\n")[3].split("<")[1].split(">")[1]),
      Number(taxdata.data.split("\n")[3].split("<")[1].split(">")[1]),
      Number(sadata.data.split("\n")[3].split("<")[1].split(">")[1])
      )
    FilteredNationsData.push(newData);
  }
  console.log(FilteredNationsData);
  let FilternationsAmount = FilteredNations.length;
  console.log(FilternationsAmount);
  let data1 = CCDEcoTotal/FilternationsAmount;
  let data2 = CCDGDPTotal/FilternationsAmount;
  let data3 = CCDempTotal/FilternationsAmount;
  let data4 = CCDTaxTotal/FilternationsAmount;
  let data5 = CCDSciTotal/FilternationsAmount;
  const CCDAverageData = new RegionAverageData(
    new Date(),
    data1, data2, data3, data4, data5 
  )
  console.log(CCDAverageData);

  fs.writeFile(`./cache/StockMarket-Background-${new Date()}.json`, JSON.stringify(FilteredNationsData), (err) => {
    // In case of a error throw err.
    if (err) throw err});

  return CCDAverageData
}

//backgrounddata();



const stockmarketfunc = async () => {
  let backgroundData = await backgrounddata();
  DataCollected.push(backgroundData);

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

  fs.writeFile(`./cache/StockMarket-${new Date()}.json`, JSON.stringify(DataCollected), (err) => {
    // In case of a error throw err.
    if (err) throw err});

}

stockmarketfunc();

module.exports = { stockmarketfunc }