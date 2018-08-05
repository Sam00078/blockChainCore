/**
 * 数据格式验证
 */


const util = require("util")



module.exports = app => {

    
    // 创建数据检查服务
    app.core.bcc.parameta = app.parameta.createInstance()



    //////////////////// 加载相关核心 ////////////////////


    app.core.bcc.help.loadingCoreModels('parameta', [
        'block_meta',
    ])





}



