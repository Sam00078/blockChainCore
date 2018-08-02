
module.exports = app => {

    class Peer 
    {
        constructor () {

            this.bus = new app.okgo.MessageBus() // 消息系统
            this.amt = new app.okgo.FlowMount() // 挂载系统

            this.possibleNodes = [] // {ip,port} 可用的节点

        }


        // 节点
        set nodes (list){
            this.possibleNodes = list
            // post message
            this.bus.emit('setPeerNodes', list)
        }
        get nodes () {
            return this.possibleNodes
        }

        

    }



    // 注册
    app.core.bcc.peer = new Peer()


    //////////////////// 加载相关核心 ////////////////////


    app.core.bcc.help.loadingCoreModels('peer', [
        // 'create',
        // 'verify',
        // 'signature',
    ])






}