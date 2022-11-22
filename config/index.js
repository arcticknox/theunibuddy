/**
 * @module config
 * exports a configuration object with all required configurations
 * configuration schemas are loaded from ./configs
 * if ./deployment.json exists, it will be used to override default and environment variable values
 */

import convict from 'convict';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load Configurations
 */
function loadConfigurations() {
  const config = {};
  const files = fs.readdirSync(path.resolve(__dirname, './configs'));
  _.forEach(files, (file) => {
    const fileConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./configs/${file}`), 'utf-8'));
    config[_.chain(file).split('.').first().value()] = fileConfig;
  });
  return config;
}

const conf = convict(loadConfigurations());
const configfile = conf.get('app.configfile');

if (fs.existsSync(__dirname + configfile)) {
  conf.loadFile(__dirname + configfile);
  console.log('Config loaded from %s', __dirname + configfile);
}

conf.validate();

const _conf = conf._instance;

if ('get' in _conf) throw new Error('Do not set config.get');
_conf.get = conf.get.bind(conf);

export default _conf;
