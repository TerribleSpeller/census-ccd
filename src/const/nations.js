//Nations along with what industries want to be checked
const CensusScale = require('./census');
const axios = require('axios');
const fs = require('fs');

const minelegotipony = ['minelegotipony', CensusScale.Economy, CensusScale.SectorManufacturing];
const minelegotiaandequestria = ['minelegotia and equestria', CensusScale.Economy, CensusScale.IndustryInformationTechnology];
const aeioux = ['aeioux', CensusScale.Economy, CensusScale.IndustryInformationTechnology, CensusScale.IndustryArmsManufacturing, CensusScale.IndustryInsurance, CensusScale.IndustryBookPublishing];
const ridnez = ['ridnez', CensusScale.Economy, CensusScale.IndustryAutomobileManufacturing, CensusScale.IndustryArmsManufacturing, CensusScale.IndustryFurnitureRestoration, CensusScale.IndustryInformationTechnology, CensusScale.SectorAgriculture, CensusScale.IndustryTimberWoodchipping];
const tdvp = ['the very dark place', CensusScale.Economy, CensusScale.IndustryArmsManufacturing, CensusScale.SectorManufacturing, CensusScale.IndustryInformationTechnology, CensusScale.IndustryFurnitureRestoration, CensusScale.IndustryRetail];
const sal = ['salcanceacy', CensusScale.Economy, CensusScale.IndustryArmsManufacturing, CensusScale.IndustryMining, CensusScale.IndustryCheeseExports];
const deman = ['deman kalan', CensusScale.Economy, CensusScale.IndustryArmsManufacturing];
const joco = ['jocospor', CensusScale.Economy, CensusScale.IndustryMining, CensusScale.IndustryBeverageSales];
const nde = ['new daul eryx', CensusScale.Economy, CensusScale.IndustryArmsManufacturing];
const giu = ['golden impirial utopia', CensusScale.Economy, CensusScale.IndustryArmsManufacturing, CensusScale.IndustryInformationTechnology, CensusScale.SectorManufacturing];
const dix = ['the dixie confederate union', CensusScale.Economy, CensusScale.IndustryArmsManufacturing];
const fet = ['fetra', CensusScale.Economy, CensusScale.IndustryAutomobileManufacturing, CensusScale.IndustryArmsManufacturing];

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
  nationCensusId,
};

