/**
 * asset type DATANUMBER 数据 数字
 */






module.exports = app => {


    // 资产类型
    const asset_kind_def = 'DATANUMBER'
    const asset_properties = {
        
        "number": {
            type: 'Uint32',
            maxval: app.constant.bcc.core.uint32_max_value,
            fixed: 1,
        },

    }

    // 处理类定义
    class AssetHandle extends app.core.bcc.AssetBase
    {
        constructor () {
            super( )
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