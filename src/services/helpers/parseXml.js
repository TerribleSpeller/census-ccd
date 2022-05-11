const { XMLParser } = require('fast-xml-parser');

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  allowBooleanAttributes: true,
  attributeNamePrefix: '',
  alwaysCreateTextNode: false,
  textNodeName: '__value',
  ignoreDeclaration: true,
  ignorePiTags: true,
});

/**
 * @param {string} xmlString
 * @return any
 */
const parseXml = (xmlString) => {
  return xmlParser.parse(xmlString);
};

module.exports = { parseXml };
