#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, getValue } from './services/storage.service.js';

const handleSave = async (key, value) => {
  try {
    await saveKeyValue(key, value);
    printSuccess(`${key} is saved`);
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const city = await getValue('city');
    const data = await getWeather(city);
    printWeather(data);
  } catch (e) {
    if (e?.response?.status === 404 || e?.response?.status === 400) {
      printError('Invalid city, please set the city again with -s [CITY]');
    } else if (e?.response?.status === 401) {
      printError('Invalid token, please set the token again with -t [API_KEY]');
    } else {
      printError(e.message);
    }
  } 
};

async function init() {
  let args = {};
  try {
    args = getArgs(process.argv);
  } catch(e) {
    printError(e.message);
  }
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    await handleSave('city', args.s);
  }
  if (args.t) {
    return handleSave('token', args.t);
  }
  getForecast();
};

init();