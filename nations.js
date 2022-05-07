const Axios = require('axios');
const xml2js = require('xml2js');
//Nations along with what industries want to be checked
const minelegotipony = ["minelegotipony", "1", "26"];
const minelegotiaandequestria = ["minelegotia and equestria", "1", "13"];
const aeioux = ["aeioux", "1", "13", "16", "21", "24"];
const ridnez = ["ridnez", "1", "10", "16", "22", "13", "17", "19"];
const tdvp = ["the very dark place", "1", "16", "26", "13", "22", "23"];
const sal = ["salcanceacy", "1", "16", "20", "11"];
const deman = ["deman kalan", "1", "16"];
const joco = ["jocospor", "1", "20", "18"];
const nde = ["new daul eryx", "1", "16"];
const giu = ["golden impirial utopia", "1", "16", "13", "26"];
const dix = ["the dixie confederate union", "1", "16"];
const fet = ["fetra", "1", "10", "16"];
const joh = ["johill", "1", "13"];

const nationCensusId = [
    minelegotipony, 
    aeioux, 
    minelegotiaandequestria, 
    ridnez, 
    tdvp, 
    sal, 
    deman, 
    joco, 
    nde, 
    giu, 
    dix, 
    fet,
    joh,
];

module.exports = {
    minelegotipony,
    aeioux,
    minelegotiaandequestria,
    ridnez,
    tdvp,
    sal,
    deman,
    joco,
    nde,
    giu,
    dix,
    fet,
    joh,
    nationCensusId
}
   

//console.log(nationNameList[0]);
//console.log(nationCensusId["minelegotipony"]);

