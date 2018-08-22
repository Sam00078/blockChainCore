/**
 * 共识机制，时间相关
 */



const CONSTANTS = require("../-constants")




module.exports = app => {



    app.core.bcc.asset = Object.assign(app.core.bcc.asset, {

        /**
         * 注册资产处理类
         */
        async registerTypeHandle ( kind_num, parameta_properties, handle_class ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'assetRegisterTypeHandle', {}, {kind_num, parameta_properties, handle_class})
        },


    })




    /////////////////// 核心方法 ///////////////////




    

    /**
     * 注册资产处理类
     */
    app.core.bcc.asset.amt.it( CONSTANTS.amtfns.assetRegisterTypeHandle, {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, function(argv, next){
        // kind_num, parameta_properties, handle_class

        // 数据字段格式定义
        const parameta_item = {
            properties: argv.parameta_properties,
            fixed: argv.kind_num,
        }
        app.core.bcc.parameta.definition(`Asset<kind=${argv.kind_num}>`, parameta_item)

        // 添加
        let handle = new argv.handle_class()
        handle.setKind(argv.kind_num)
        handle.setParameta(parameta_item)

        // ok
        next(null, argv.self.typeHandles)

    })







}

