const { getFullRegionCensus } = require('./services/fetchers/region');
const CensusScale = require('./const/census');

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

const main = async () => {
  await Promise.all(scales.map(getCensusScaleData));

  const nationList = Array.from(nations.values()).sort((a, b) => a.name.localeCompare(b.name));
  const qualifiedNations = nationList.filter(
    (nationItem) => nationItem.censusScores.get(CensusScale.Residency) >= 30,
  );

  console.log(qualifiedNations);

  // @TODO: process further
};

module.exports = { main };