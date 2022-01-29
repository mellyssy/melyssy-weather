import chalk from "chalk";

const printError = (err) => {
  console.log(`${chalk.bgRed(' ERROR ')}
  ${err}`);
};

const printSuccess = (msg) => {
  console.log(`${chalk.black.bgGreen(' SUCCESS ')}
  ${msg}`);
};

const printHelp = () => {
  console.log(`${chalk.black.bgYellow(' HELP ')}
  no parameters   just show me the weather
  -s [CITY]       set your city
  -t [API_KEY]    set your token
  -h              show help`);
};

const printWeather = (data) => {
  const { weather, main, name, wind, sys } = data;
  const output = `Current weather in ${chalk.bold(name)}, ${chalk.bold(sys.country)}:
  ${main.temp}˚C, ${weather[0].description}
  feels like ${main.feels_like}˚C
  wind: ${wind.speed} m/s
  humidity: ${main.humidity}%
  pressure: ${main.pressure} hpa
  `;
  console.log('\nRetrieving weather...\n');
  printSuccess(output);
};

export { printError, printSuccess, printHelp, printWeather };