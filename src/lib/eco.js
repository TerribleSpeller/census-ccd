const Axios = require('axios');
const censuslist = require('../const/census.js');

let format = 'https://www.nationstates.net/cgi-bin/api.cgi?nation=';
let format2 = '&q=census;scale=';
let format3 = ';mode=score';
const collectedDataEco = [];
const collectedDataElse = [];
console.log(`Started at ${new Date()}`);
async function nationDataCCD() {
  let rawData = await Axios.get(
    'https://www.nationstates.net/cgi-bin/api.cgi?region=confederation_of_corrupt_dictators&q=nations',
  );
  let rawDataGood = rawData.data;
  //console.log(rawDataGood);
  let rawDataGood2 = rawDataGood.split('<NATIONS>')[1].split('\n');
  //console.log(rawDataGood2);
  let rawDataGood3 = rawDataGood2[0];
  //console.log(rawDataGood3)
  //console.log(typeof(rawDataGood3));
  return rawDataGood3;
}

async function arraymaker() {
  const data = await nationDataCCD();
  const dataArray = data.toString().split(':');
  //console.log(dataArray);
  //console.log(dataArray.length)
  return dataArray;
}

async function fetchEcofunction(base, nation, base2, id, base3) {
  let query = base.concat(nation, base2, id, base3);
  console.log(nation, new Date());
  const promise = new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  const result = await promise;
  console.log(nation, new Date());
  const foo = async () => {
    try {
      const res = await Axios.get(query);
      return res;
    } catch (e) {
      console.error(e);
    }
  };
  return foo();
}

const schedule = async (func, a, b, c, d, e) => {
  const now = Number(new Date());
  const delay = Math.max(minInterval - now + lastCall + 5, 0);
  lastCall = now + delay;
  if (delay > 0) await sleep(delay);
  return func(a, b, c, d, e);
};

const nationCollected = async () => {
  let based = await arraymaker();
  console.log(based);
  console.log(typeof based);
  return based;
};

const nationCollectedlength = async () => {
  let based = await arraymaker();
  let result = based.length;
  console.log(result);
  return result;
};

nationCollected();
nationCollectedlength();

async function Residency() {
  for (let i = 0; i < nationCollectedlength; i++) {
    let Websiteresult = await schedule(fetchEcofunction(format, await nationCollected[i], format2, '80', format3));
    if (Websiteresult > 29) {
      collectedDataEco.push(`${nationCollected[1]}: Residency of ${Websiteresult} days.`);
      console.log(collectedDataEco);
    }
  }
}

Residency();
