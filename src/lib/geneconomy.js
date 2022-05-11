const Axios = require('axios');

let lastCall = 0;
const minInterval = 10000;
const sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));
const Starttime = new Date();
let format = 'https://www.nationstates.net/cgi-bin/api.cgi?nation=';
let format2 = '&q=census;scale=';
let format3 = ';mode=score';
let censusid = 1;

//Aeioux's code, slows down the process, and the query, effectively making it easier to parse more data without going off the ratelimit.
const schedule = async (func) => {
  const now = Number(new Date());
  const delay = Math.max(minInterval - now + lastCall + 5, 0);
  lastCall = now + delay;
  if (delay > 0) await sleep(delay);
  return func;
};

function countProperties(obj) {
  var count = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) ++count;
  }
  return count;
}

async function fetchCensusfunc(base, name, base2, id, base3) {
  let query = base.concat(name, base2, id, base3);
  console.log(name, new Date());
  const promise = new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  const result = await promise;
  console.log(name, new Date());
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

async function fetchNationfunc(query) {
  console.log(`CCD Nations` + new Date());
  const promise = new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  const result = await promise;
  console.log(new Date());
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

async function Nations() {
  //let Rawdata = await schedule(Axios.get('https://www.nationstates.net/cgi-bin/api.cgi?region=confederation_of_corrupt_dictators&q=nations'));
  let Rawdata = await schedule(
    fetchNationfunc('https://www.nationstates.net/cgi-bin/api.cgi?region=confederation_of_corrupt_dictators&q=nations'),
  );
  // console.log(Rawdata.data);
  let based = Rawdata.data.split(':');
  let tempvar = based[0].slice(64, based[0].length);
  based.pop();
  based.push(tempvar);
  based.slice(0, 1);
  based.slice(Number(based.length - 1), based.length);
  //console.log(based.length)
  //console.log(based);
  return based;
}

async function startfunction() {
  let resultCCD = Nations();
  const promise = new Promise((resolve) => {
    setTimeout(resolve, 10000);
  });
  const result = await promise;
  console.log(resultCCD.length);
  let Nationslength = resultCCD.length;
  console.log(`Starting at ${Starttime}.`);
  console.log(`Total amount of nations registered: ${Nationslength}`);
  console.log(`Loading...`);
  console.log(resultCCD);
}

startfunction();

/*
for (let i = 1; i < Nationslength; i++) {
    const parsedata = await schedule(fetchCensusfunc, format, Nations[i], format2, censusid, format3);

}
*/
