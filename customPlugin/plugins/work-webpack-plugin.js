class WorkWebpackPlugin{
    constructor(options){
        console.log(options);
    }
    apply(compiler){
        console.log('compiler:',compiler.hooks)
    }
}
module.exports = WorkWebpackPlugin