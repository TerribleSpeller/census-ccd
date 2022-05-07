
const Axios = require('axios');
const xml2js = require('xml2js');
const {nationCensusId} = require('./nations.js')
const censuslist = require('./census.js')
const Starttime = new Date;
let Tracker = 0; // Tracks how much arrays have been processed

/*
let scaleid = 35
let nationName = "minelegotipony"
let format =  'https://www.nationstates.net/cgi-bin/api.cgi?nation='
let format2 = '&q=census;scale='
let format3 = ';mode=score'
//https://www.nationstates.net/cgi-bin/api.cgi?nation=minelegotipony&q=census;scale=35;mode=score'
axios.get(format.concat(nationName,format2,scaleid,format3)) 
    .catch(function (error) {
        console.log(error);
    })
    .then(function (res) {
        // console.log(res);
        //console.log(typeof(res));  //It's an Object.
        //console.log(res.data);
        //console.log(typeof(res.data));
        let str = res.data;
        let strsplit = str.split('\n');
        //console.log(strsplit[3]);
        let strsplitneeded = strsplit[3].split("</SCORE>") //Gets the third row of strsplit, splits </SCORE> away and removes </SCORE>
        //console.log(strsplitneeded);
        let split3 = strsplitneeded[0];
        //console.log(split3);
        let split4 = split3.slice(7, split3.length);
        console.log(split4);
    });

    async function fetchCensusfunc(base, name, base2, id, base3) {
    let query = base.concat(name,base2,id,base3);
    console.log(name, new Date());
    const promise = new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
    const result = await promise;
    console.log(name, new Date);
    return Axios.get(query)
}

*/

const sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

let lastCall = 0;
const minInterval = 3000;

let format =  'https://www.nationstates.net/cgi-bin/api.cgi?nation='
let format2 = '&q=census;scale='
let format3 = ';mode=score'
const collectedData = []

//The get it from the website function that doesn't have a TIME OUT LIMIT
async function fetchCensusfunc(base, name, base2, id, base3) {
    let query = base.concat(name,base2,id,base3);
    console.log(name, new Date());
    const promise = new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
    const result = await promise;
    console.log(name, new Date);
    const foo = async () => {
        try {
          const res = await Axios.get(query);
          return res
        } catch (e) {
          console.error(e);
        }
    };
    return foo();
}

//Turn Data into an organised Array. 
async function sortdata() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Avoided Ratelimit!"), 30000)
    });
    const result = await promise;
    console.log(`Sorting data...`);
    console.log(result);
    const sortedData = collectedData.sort();
    console.log(sortedData);
    console.log(`Queries provided total at ${sortedData.length}`);
    const Endtime = new Date;
    console.log(`The End time is ${Endtime}.`)
    const diff = parseInt((Endtime - Starttime)/1000);
    const Mindiff = parseInt(((Endtime - Starttime)/1000)/60);
    console.log(`The program ran from ${Starttime} and ended at ${Endtime}. A difference of ${diff} seconds, or ${Mindiff} minutes.`)

}

//Count the amount of nations are on the list
function countProperties(obj) {
    var count = 0;
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }
    return count;
}

//Aeioux's code, slows down the process, and the query, effectively making it easier to parse more data without going off the ratelimit.
const schedule = async (func,a,b,c,d,e ) => {
    const now = Number(new Date);
    const delay = Math.max(minInterval - now + lastCall + 5, 0);
    lastCall = now + delay;
    if (delay > 0) await sleep(delay);
    Tracker++;
    console.log(`Query ${Tracker} being served.`)
    if (Number(Tracker) == Number(44)) {
        sortdata();
    }
    return func(a,b,c,d,e);
};

console.log(`Starting at ${Starttime}. Should end when query ${countProperties(nationCensusId)} or so is reached.`)
console.log(`Total amount of nations registered: ${countProperties(nationCensusId)}`);
console.log(`Loading...`)

for ( let i = 0; i < countProperties(nationCensusId); i++ ) {
    for ( let j = 1; j < nationCensusId[i].length; j++ ) {
        //console.log(`${nationCensusId[i][0]}: id ${nationCensusId[i][j]}`);
        const prasexml = async () => {
            const websiteresult = await schedule(fetchCensusfunc, format, nationCensusId[i][0], format2, nationCensusId[i][j], format3);
            let stringify = websiteresult.data.split('\n'); //Turns into an array 
            let stringify2 = stringify[3].split("</SCORE>")[0]; //Gets the row we want and removes the backend </SCORE>
            let stringify3 = stringify2.slice(7, stringify2.length); //Removes <SCORE> at the front
            console.log(`${nationCensusId[i][0]}: Census: ${censuslist[nationCensusId[i][j]]}(id:${nationCensusId[i][j]}): ${stringify3}`); //<Presents it in a readable format>
            collectedData.push(`${nationCensusId[i][0]}: Census: ${censuslist[nationCensusId[i][j]]}(id:-${nationCensusId[i][j]}-): ${stringify3}`);
        }
        prasexml();
    }
    
}



