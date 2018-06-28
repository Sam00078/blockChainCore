
module.exports = async app => {





    // app.core.peer.amt.cancel('searchPossibleNodes', {id:'readconfig',type:'it'})
    // app.core.peer.amt.cancel('searchPossibleNodes', 'readconfig')



    app.core.peer.amt.wrap('--searchPossibleNodes', (a, r, next)=>{

        app.log.debug('wrap 1')

        next()

    }, (a, r, next)=>{

        app.log.debug('wrap 2')

        next()


    })

/*

    function f1(n){
        return new Promise(function(ok){
            setTimeout(function(){
                ok(n+1)
            }, 1000)
        })
    }

    async function f2(n){
        let m = await f1(n)
        return m + 1
    }

    async function f3(n){
        let m = await f2(n)
        return m + 1
    }


    let k = await f3(10)
    app.log.fatal(k)

*/









// appInfo.log.note("POST /peer/blocks from 127.0.0.1")
// appInfo.log.care("POST /peer/blocks from 127.0.0.1")
// appInfo.log.warn("POST /peer/blocks from 127.0.0.1")
// appInfo.log.error("POST /peer/blocks from 127.0.0.1")
// appInfo.log.fatal("POST /peer/blocks from 127.0.0.1", '56207523749444a51c209ea6e5c030a5bb773b8397c03fc7c1955f7369dbfc72')


}
