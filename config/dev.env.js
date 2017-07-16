var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://10.0.1.40:8080"',
    NODE_API: '"http://127.0.0.1:3000"'
})
