
module.exports = app => {

    // app.log.debug("load init boot/")

/*
    app.log.log(`set peer nodes empty list !`)
    app.log.log(`set peer nodes empty list !`)
    app.log.debug(`set peer nodes empty list !`)
    app.log.info(`set peer nodes empty list !`)
    app.log.note(`set peer nodes empty list !`)
    app.log.care(`set peer nodes empty list !`)
    app.log.warn(`set peer nodes empty list !`)
    app.log.error(`set peer nodes empty list !`)
    app.log.fatal(`set peer nodes empty list !`)
*/



    app.core.bcc.peer.bus.obtain('setPeerNodes', function(list){
        if (!list || !list.length){
            app.log.care(`set peer nodes empty list !`)
        }else{
            app.log.info(`success set peer nodes , num: ${list.length}`)
        }
        app.log.info(list)
    })



    // 获取可用节点
    const flowNameSPN = 'searchPossibleNodes'

    app.core.bcc.peer.amt.it(flowNameSPN, {
        id: 'readconfig'
    }, function(argv, next){
        // app.log.info('searchPossibleNode it!')
        next(null, app.configRead('peer.possibleNodes')||[])
    })


    ////////////////////////////////////////////////

    
    // 开始获取可用节点
    app.launch.ready(function(){

        app.log.info(`ready to do ${flowNameSPN}`)
        app.core.bcc.peer.amt.runFlow(flowNameSPN, null, {
            limit: 20
        }, function(err, result){
            if(err){
                app.log.care(`do flow '${flowNameSPN}' error: ` + err)
                return
            }
            app.core.bcc.peer.nodes = result
        })
    })



    
    /*

    app.core.peer.amt.runFlow('kgkgkgkgkg', {
        'after': ['kkkf', 'fffk']
    }, {

    }, function(err, result){
        app.log.care('kgkgkgkgkg------')
    })



    app.core.peer.amt.runFlow('fffk', {
        'need': flowNameSPN
    }, {

    }, function(err, result){
        app.log.warn('fffk------')
    })


    app.core.peer.amt.it('kkkf', function(a, r, next){
        setTimeout(function(){
            next({})
        }, 3000)
    })
    app.core.peer.amt.runFlow('kkkf', {
        'after': 'fffk'
    }, {

    }, function(err, result){
        app.log.error('kkkf------')
    })

    */




}
