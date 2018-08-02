

module.exports = app => {


    class Consensus 
    {
        constructor () {

            this.bus = new app.okgo.MessageBus() // 消息系统
            this.amt = new app.okgo.FlowMount() // 挂载系统


        }

    }


    // 注册核心
    app.core.bcc.consensus = new Consensus()


    //////////////////// 加载相关核心 ////////////////////


    app.core.bcc.help.loadingCoreModels('consensus', [
        'time',
        'block',
    ])

}