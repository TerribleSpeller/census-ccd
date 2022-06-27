const { Axios } = require('../axios');
let format = 'https://www.nationstates.net/cgi-bin/api.cgi?nation=';
let format2 = '&q=census;scale=';
let format3 = ';mode=score';
let minInterval = 3000;
let lastCall = 0;

const sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

const schedule = async (func) => {
  const now = Number(new Date());
  const delay = Math.max(minInterval - now + lastCall + 5, 0);
  lastCall = now + delay;
  if (delay > 0) await sleep(delay);
  return func;
};

/*
const getNationGDP = async (nationName, wantedCensus) => {
  let result = {
    Name : nationName,
    Census : wantedCensus
  }

  let query = format.concat(nationName, format2, wantedCensus, format3);
  console.log(query);
  console.log(nationName, new Date());
  const foo = async () => {
    try {
      const res = await Axios.get(query);
      console.log(res)
      return res;
    } catch (e) {
      console.error(e);
    }
  };
  result = foo();
  console.log(nationName, new Date());
  console.log(result);
  return result;
};
*/

module.exports = { schedule }