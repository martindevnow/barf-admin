'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BARF_API_BASE: '"http://barf-api.localhost"',
  BARF_API_SECRET: '"x6IF4L3AYVEc6zoLBk2kUAOthwuCrYNckD8JhhaQ"',
  BARF_API_CLIENT_ID: '"4"',
});
