/* eslint-disable global-require */
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  require('./dist');
} else {
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('nodemon')({ script: 'dev.js' });
}
