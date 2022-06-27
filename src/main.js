const { getFullRegionCensus } = require('./services/fetchers/region');
const CensusScale = require('./const/census');
const fs = require('fs');
const nationCensusId = require('./const/nations');
const { default: axios } = require('axios');



/**
 * @typedef {{ name: string; censusScores: Map<number, number> }} Nation
 */

/** @type {Map<string, Nation>} */
const nations = new Map();
const region = 'confederation_of_corrupt_dictators';

/** @type {CensusScale[]} */
const scales = [CensusScale.Residency, 
  CensusScale.EconomicOutput, 
  CensusScale.Economy, 
  CensusScale.EconomicFreedom, 
  CensusScale.Employment, 
  CensusScale.Population, 
  /* 
  CensusScale.IndustryAutomobileManufacturing, 
  CensusScale.IndustryCheeseExports, 
  CensusScale.IndustryBasketWeaving, 
  CensusScale.IndustryInformationTechnology,
  CensusScale.IndustryPizzaDelivery, 
  CensusScale.IndustryTroutFishing, 
  CensusScale.IndustryArmsManufacturing, 
  CensusScale.SectorAgriculture, 
  CensusScale.IndustryBeverageSales, 
  CensusScale.IndustryTimberWoodchipping, 
  CensusScale.IndustryMining, 
  CensusScale.IndustryInsurance, 
  CensusScale.IndustryFurnitureRestoration, 
  CensusScale.IndustryRetail, 
  CensusScale.IndustryBookPublishing, 
  CensusScale.IndustryGambling, 
  CensusScale.SectorManufacturing
*/];
  

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

  /*
  console.log(`Dev note, qualifiedNations is a ${typeof(qualifiedNations)}`); => Object
  console.log(qualifiedNations[0].name); Note you have to add an index or not it can't find what it wants
  console.log(qualifiedNations[0].censusScores);
  console.log(qualifiedNations[0].censusScores.get(80)); .get(key) is how to access Maps 
  */

  //The Below converts the Data into a Easily Transported Format of a .txt file
  let textArray = [];
  for (let i = 0; i < numofqualifiedNations; i++ ) {
    let nation = {
      name: qualifiedNations[i].name,
      censusScores: Object.fromEntries(qualifiedNations[i].censusScores)
    }
    textArray.push(nation);
  }

  console.log(textArray);

  fs.writeFile(`./cache/CCDData-${new Date()}.txt`, JSON.stringify(textArray), (err) => {
    // In case of a error throw err.
    if (err) throw err});
};



module.exports = { main };