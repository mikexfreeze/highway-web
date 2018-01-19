var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://192.168.4.104:8080"',
    NODE_API: '"http://127.0.0.1:3000"'
})
