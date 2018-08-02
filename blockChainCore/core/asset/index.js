/**
 * 创建账户
 */



module.exports = app => {


    class Asset 
    {
        constructor () {

            this.bus = new app.okgo.MessageBus() // 消息系统
            this.amt = new app.okgo.FlowMount() // 挂载系统

            // 类型处理类实例
            this.typeHandles = {}

        }

    }



    // 注册核心
    app.core.bcc.asset = new Asset()


    //////////////////// 加载相关核心 ////////////////////


    app.core.bcc.help.loadingCoreModels('asset', [
        'base',
        'register',
        // predefs
        'predefs/*',
    ])

}

