



const fs = require("fs")

const CONSTANTS = require("./-constants")




module.exports = app => {

    // app.log.info("loading block chain core")

    // block chain core
    app.core.bcc = {
        parameta: {},
        peer: {},
        connect: {},
        transmission: {},
        account: {},
        consensus: {},
        asset: {},
        transaction: {},
        block: {},
        storge: {},
        // 工具
        help: {},
    }


    // 加载当前模块了里面的模块
    app.core.bcc.help.loadingCoreModels = function( dir, mds ) {
        for (let i in mds) {
            let one = mds[i]
            if( one.endsWith('/*') ){
                // 读取所有文件并加载
                let lvdir = one.substr(0, one.length-2)
                let files = fs.readdirSync(__dirname+'/'+dir+'/-'+lvdir)
                // app.log.debug(files)
                for(let i in files){
                    require('./'+dir+'/-'+lvdir+'/'+files[i])( app )
                }
            }else{
                require('./'+dir+'/-'+one+'.js')( app )
            }
        }
    }

    // 返回流执行
    app.core.bcc.help.returnAmtRunFlowPromise = function(self, amtfn, opts, param, callback) {
        return new Promise(function( resolve, reject ){
            param.self = self
            self.amt.runFlow(CONSTANTS.amtfns[amtfn], opts, param, function(err, result) {
                callback && callback(err, result)
                if(err){
                    return reject(err)
                }
                resolve(result)
            })
        })
    }

}
    
