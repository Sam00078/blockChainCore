/**
 * 测试代码
 */


global.ASSERT = require('assert')
global.EQUAL = ASSERT.strictEqual


global.LOG = function(...param) {
    console.log(...param)
}



module.exports = async (app, tarmod) => {


    const testmodels = tarmod || [
        // 全部模块
        'account',
        'signature',
        'multisign_two',
        'consensus',
    ]




    /////////////// 加载测试 ///////////////

    app.launch.ready(async function(){

        for(let i in testmodels){

            let mod = testmodels[i]
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










