const getEnvironment = require('./utils/getEnvironment');
const environment = getEnvironment();
console.info('======environment======', environment);
module.exports = environment;
