/**
 * asset type DATABUFFER 
 */




module.exports = app => {


    // 资产类型
    const asset_kind_def = 'DATABUFFER'
    const asset_properties = {
        
        "buffer": {
            type: 'Buffer',
            minlen: 1,
            maxlen: 512,
            fixed: 1,
        },

    }


    // 处理类定义
    class AssetHandle extends app.core.bcc.AssetBase
    {
        constructor () {
            super()
        }

        


    }




    ///////////////////////////////////////////////////////////////////





    // 注册处理
    app.core.bcc.asset.registerTypeHandle(
        app.constant.bcc.asset_kinds[asset_kind_def], 
        asset_properties, 
        AssetHandle
    )

















}