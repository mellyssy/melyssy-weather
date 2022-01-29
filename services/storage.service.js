import { homedir } from 'os';
import { join } from 'path';
import { promises, constants } from 'fs';

const fp = join(homedir(), 'weather-data.json');

async function exists(path) {
  try {
    await promises.access(path, constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

async function getValue(key) {
   if (await exists(fp)) {
     const file = await promises.readFile(fp);
     const data = JSON.parse(file);
     return data[key];
   }
   throw new Error('Parameters not set, can\'t retrieve weather');
};

async function saveKeyValue(key, value) {
  let data = {};
  if (await exists(fp)) {
    const file = await promises.readFile(fp);
    data = JSON.parse(file);
  }

  data[key] = value;
  await promises.writeFile(fp, JSON.stringify(data));
};

export { saveKeyValue, getValue };