/**
 * 测试代码
 */


const fs = require('fs')

global.ASSERT = require('assert')
global.EQUAL = ASSERT.strictEqual


global.log = global.LOG = function(...param) {
    console.log(...param)
}



module.exports = async (app, tarmods) => {


    const testmods = tarmods || [
        // 指定优先加载的
        'account',
        'signature',
        'multisign_two',
    ]




    /////////////// 加载测试 ///////////////

    app.launch.ready(async function(){
        
        let models = []

        // 读取本地所有测试文件
        if( tarmods ){

            models = testmods.map( (one) => {
                return one + '.js'
            })

        }else{

            let files = fs.readdirSync(__dirname)
            // app.log.debug(files)
            // 排序
            models = testmods.map( (one) => {
                let om = one + '.js'
                , already = files.indexOf(om)
                if ( already > -1 ) {
                    files.splice(already, 1) // 删除重复的
                }
                return om
            })

            models = models.concat( files )
        }

        // app.log.fatal(models)


        // 开始循环测试 所有 或 指定 测试文件
        for(let i in models){

            let mod = models[i]
            if( mod=='index.js' ){
                continue
            }

            // 开始
            let oktip

            try {

                oktip = await require("./"+mod)(app)

            } catch (error) {

                console.log( error )
                // throw error
                app.log.fatal(`test module '${mod}' fail`)
                
            }

            app.log.debug(`test module '${mod}' pass ${oktip||''}`)

        }


        app.log.note(`All modules test pass success !`)

        // 自动关闭
        setTimeout(()=>{ process.exit(1) }, 1000)

    })


}










