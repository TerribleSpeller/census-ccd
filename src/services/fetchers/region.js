const { axios } = require('../axios');
const { parseXml } = require('../helpers/parseXml');

/**
 * @typedef {{ NAME: string, RANK: number, SCORE: number }} NationScore
 */

/**
 * @typedef {{
 *   REGION: {
 *     CENSUSRANKS: {
 *       id: number,
 *       NATIONS: {
 *         NATION: NationScore[],
 *       },
 *     },
 *   },
 * }} RegionCensusObject
 */

const formatNestedQueryParams = (object, separator = ';') =>
  Object.entries(object)
    .map((entryItem) => (entryItem[1] === true ? entryItem[0] : `${entryItem[0]}=${entryItem[1]}`))
    .join(separator);

/**
 * @param {string} region
 * @param {CensusScale} scale
 * @param {number?} start=0
 * @return Promise<string>
 */
const getRegionCensus = async (region, scale, start = 0) =>
  (await axios.get('/', {
    params: {
      region,
      q: formatNestedQueryParams({
        CENSUSRANKS: true,
        scale,
        start,
      }),
    },
  })).data;

/**
 * gets all pages from https://www.nationstates.net/cgi-bin/api.cgi?region=confederation_of_corrupt_dictators&q=censusranks;scale=1
 * @param {string} region
 * @param {CensusScale} scale
 */
const getFullRegionCensus = async (region, scale) => {
  let start = 0;

  /** @type RegionCensusObject */
  let batch = parseXml(await getRegionCensus(region, scale, start));
  let nations = batch.REGION.CENSUSRANKS.NATIONS.NATION;

  console.info(`Got ${nations.length} entries for ${region}, scale ${scale}, offset ${start}`);

  const result = [...nations];

  while (nations.length === 20) {
    start += 20;
    batch = parseXml(await getRegionCensus(region, scale, start));
    nations = batch.REGION.CENSUSRANKS.NATIONS.NATION;

    console.info(`Got ${nations.length} entries for ${region}, rank ${scale}, offset ${start}`);

    result.push(...nations);
  }

  return result;
};

module.exports = {
  getRegionCensus,
  getFullRegionCensus,
};
