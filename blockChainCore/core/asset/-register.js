/**
 * 共识机制，时间相关
 */



const CONSTANTS = require("../-constants")




module.exports = app => {



    app.core.bcc.asset = Object.assign(app.core.bcc.asset, {

        /**
         * 注册资产处理类
         */
        async registerTypeHandle ( kind_num, kind_def_name, parameta_properties, handle_class ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'assetRegisterTypeHandle', {}, {kind_num, kind_def_name, parameta_properties, handle_class})
        },


    })




    /////////////////// 核心方法 ///////////////////




    /**
     * 注册资产处理类
     */
    app.core.bcc.asset.amt.it( CONSTANTS.amtfns.assetRegisterTypeHandle, {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, function(argv, next){
        // kind_num, kind_def_name, parameta_properties, handle_class

        // 数据字段格式定义
        const parameta_item = {
            type: '{}',
            properties: argv.parameta_properties,
            fixed: argv.kind_num,
        }
        app.core.bcc.parameta.definition('Asset<kind>', parameta_item, {
            union_mark_value: argv.kind_num, // 种类
        })

        //// 添加至 ////

        let key = 't' + argv.kind_num

        if( argv.self.typeHandles[ key ] ){
            return next(`asset kind <${key}> already exist`)
        }

        // 添加
        let handle = new argv.handle_class()
        handle.setKind(argv.kind_num, argv.kind_def_name)
        handle.setParameta(parameta_item)
        argv.self.typeHandles[ key ] = handle

        // ok
        next(null, argv.self.typeHandles)

    })







}

