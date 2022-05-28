//Nations along with what industries want to be checked
const CensusScale = require('./const/census');

const minelegotipony = ['minelegotipony', CensusScale.Economy, '26'];
const minelegotiaandequestria = ['minelegotia and equestria', CensusScale.Economy, '13'];
const aeioux = ['aeioux', CensusScale.Economy, '13', '16', '21', '24'];
const ridnez = ['ridnez', CensusScale.Economy, '10', '16', '22', '13', '17', '19'];
const tdvp = ['the very dark place', CensusScale.Economy, '16', '26', '13', '22', '23'];
const sal = ['salcanceacy', CensusScale.Economy, '16', '20', '11'];
const deman = ['deman kalan', CensusScale.Economy, '16'];
const joco = ['jocospor', CensusScale.Economy, '20', '18'];
const nde = ['new daul eryx', CensusScale.Economy, '16'];
const giu = ['golden impirial utopia', CensusScale.Economy, '16', '13', '26'];
const dix = ['the dixie confederate union', CensusScale.Economy, '16'];
const fet = ['fetra', CensusScale.Economy, '10', '16'];
const joh = ['johill', CensusScale.Economy, '13'];

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
  nationCensusId,
};

//console.log(nationNameList[0]);
//console.log(nationCensusId["minelegotipony"]);
