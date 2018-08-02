/**
 * 创建账户
 */



module.exports = app => {


    class Account 
    {
        constructor () {

            this.bus = new app.okgo.MessageBus() // 消息系统
            this.amt = new app.okgo.FlowMount() // 挂载系统

        }

    }



    // 注册核心
    app.core.bcc.account = new Account()


    //////////////////// 加载相关核心 ////////////////////


    app.core.bcc.help.loadingCoreModels('account', [
        'create',
        'verify',
        'signature',
    ])

}

