/**
 * 数据传输模块，诗数据压缩打包、拆包解压、http、websocket、tcp传输方式等等
 */




const util = require("util")



module.exports = app => {





    class Transaction
    {
        constructor () {

            this.bus = new app.okgo.MessageBus() // 消息系统
            this.amt = new app.okgo.FlowMount() // 挂载系统

        }

        

    }


    // 注册核心
    app.core.bcc.transaction = new Transaction()


    //////////////////// 加载相关核心 ////////////////////


    app.core.bcc.help.loadingCoreModels('transaction', [
        // 'package',
    ])




}



