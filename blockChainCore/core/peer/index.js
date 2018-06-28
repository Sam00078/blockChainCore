
module.exports = app => {

    class Peer 
    {
        constructor () {

            this.bus = new app.MessageBus() // 消息系统
            this.amt = new app.FlowMount() // 挂载系统

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






    app.core.peer = new Peer()


}