/**
 * asset type DATAHASH 数据 哈希值
 */




module.exports = app => {


    // 资产类型
    const asset_kind_def = 'DATAHASH'
    const asset_properties = {
        
        "hash": {
            type: 'Buffer',
            length: 32,
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
        asset_kind_def, 
        asset_properties, 
        AssetHandle
    )















}