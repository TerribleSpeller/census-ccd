const fs = require("fs");

const CACHE_DIR = process.env.CACHE_DIR;
if (!fs.existsSync(CACHE_DIR)) return;
const files = fs.readdirSync(CACHE_DIR);
files.forEach((fileItem) => fs.rmSync(`${CACHE_DIR}/${fileItem}`));