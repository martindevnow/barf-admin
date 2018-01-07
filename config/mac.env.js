'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BARF_API_BASE: '"http://bb2.localhost"',
  BARF_API_SECRET: '"IbsEPaoVsixS33fE5GO0NEjY04YJw9ZYEgdaz2AC"',
  BARF_API_CLIENT_ID: '"2"',
});
