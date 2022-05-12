const { Axios } = require('axios');
const { stringify } = require('qs');
const fs = require('fs');
const { schedule } = require('./helpers/schedule');

const CACHE_DIR = process.env.CACHE_DIR;
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR);
}

const axios = new Axios({
  baseURL: 'https://www.nationstates.net/cgi-bin/api.cgi',
  paramsSerializer: (params) =>
    stringify(params, {
      encode: false,
    }),
});

/**
 * @param {AxiosRequestConfig} config
 * @return string
 */
const getCacheFileName = (config) => `${CACHE_DIR}/${config.paramsSerializer(config.params)}.json`;

axios.interceptors.request.use(async (config) => {
  const cacheFileName = getCacheFileName(config);

  if (fs.existsSync(cacheFileName)) {
    const cachedData = JSON.parse(fs.readFileSync(cacheFileName, 'utf-8').toString());

    if (new Date() - cachedData.timestamp <= Number(process.env.AXIOS_MAX_CACHE_AGE) * 60 * 1000) {
      console.info(`[axios] ${Number(new Date())} - Reading from cache: ${cacheFileName}`);

      throw { ...cachedData, isCachedResponse: true };
    } else {
      fs.rmSync(cacheFileName);
    }
  }

  await schedule();

  console.info(
    `[axios] ${Number(new Date())} - Sending request to ${config.baseURL}, ${
      config.url
    }, query: ${config.paramsSerializer(config.params)}`,
  );
  return config;
});

axios.interceptors.response.use(
  (response) => {
    console.info(
      `[axios] ${Number(new Date())} - Received ${response.config.method} - ${response.status} ${response.statusText}`,
    );

    fs.writeFileSync(
      getCacheFileName(response.config),
      JSON.stringify({
        data: response.data,
        timestamp: Number(new Date()),
      }),
      {
        encoding: 'utf-8',
        flag: 'w',
      },
    );
    return response;
  },
  (error) => (error.isCachedResponse ? Promise.resolve(error) : Promise.reject(error)),
);

module.exports = {
  axios,
};
