const path = require('path')
const WorkWebpackPlugin = require('./plugins/work-webpack-plugin');
module.exports = {
    mode:'development',
    entry:{
        main:'./src/index.js'
    },
    plugins:[
        new WorkWebpackPlugin({
            name:'Tincole'
        })
    ],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    }
}