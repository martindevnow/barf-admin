'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BARF_API_BASE: '"http://api.barfbento.test"',
  BARF_API_SECRET: '"Sj5ZepRJBc6SZSkpZ3RKYgpY3o1xsC78tmhxXQIj"',
  BARF_API_CLIENT_ID: '"6"',
});
