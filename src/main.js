const { getFullRegionCensus } = require('./services/fetchers/region');
const CensusScale = require('./const/census');
const { schedule } = require('./services/processes/redo');
const { getNationGDP } = require('./services/processes/redo');


/**
 * @typedef {{ name: string; censusScores: Map<number, number> }} Nation
 */

/** @type {Map<string, Nation>} */
const nations = new Map();
const region = 'confederation_of_corrupt_dictators';

/** @type {CensusScale[]} */
const scales = [CensusScale.Residency, CensusScale.EconomicOutput, CensusScale.Economy];

/** @param {CensusScale} scale */
const getCensusScaleData = async (scale) => {
  /** @type {NationScore[]} */
  const nationScores = await getFullRegionCensus(region, scale);

  nationScores.forEach((nationScoreItem) => {
    if (!nations.has(nationScoreItem.NAME)) {
      nations.set(nationScoreItem.NAME, {
        name: nationScoreItem.NAME,
        censusScores: new Map(),
      });
    }

    const nation = nations.get(nationScoreItem.NAME);

    // mutating the object already in the map, no need to do nations.set()
    nation?.censusScores.set(scale, nationScoreItem.SCORE);
  });
};

let endResult = []
let queryNum = 0

const main = async () => {
  await Promise.all(scales.map(getCensusScaleData));

  const nationList = Array.from(nations.values()).sort((a, b) => a.name.localeCompare(b.name));
  const qualifiedNations = nationList.filter(
    (nationItem) => nationItem.censusScores.get(CensusScale.Residency) >= 30,
  );

  console.log(qualifiedNations);
  const numofqualifiedNations = Object.keys(qualifiedNations).length;

  // @TODO: process further
  let CCDGDP = 0;
  for (let i = 0; i < numofqualifiedNations; i++ )  {
    console.log(`Query #${i} is  ${qualifiedNations[i].name}`);
    let tempVar = qualifiedNations[i].censusScores.get(CensusScale.EconomicOutput);
    //let nationAddress = qualifiedNations[i].name;
    if (typeof(tempVar) === Number ) {
      CCDGDP += tempVar;
    } else {
      let temptempVar = Number(tempVar);
      CCDGDP += temptempVar;
    }
    console.log(tempVar);
    //endResult.push(resultingData);
  }

  console.log(`The Real Confederation GDP is ${CCDGDP} Flammas.`);
  let perMemberState = CCDGDP/numofqualifiedNations
  console.log(`Average Real GDP per Confederation Member States is ${perMemberState} Flammas.`)


};

module.exports = { main };