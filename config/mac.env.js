'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BARF_API_BASE: '"http://barf-api.localhost"',
  BARF_API_SECRET: '"lHLEYEkhHvcS6oGKdxh8f28oN5II1aQMiTfBgKqA"',
  BARF_API_CLIENT_ID: '"2"',
});
