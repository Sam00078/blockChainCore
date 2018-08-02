/**
 * asset type CHARGE 收款
 */




module.exports = app => {


    // 资产类型
    const asset_kind_def = 'CHARGE'
    const asset_properties = {
        
        "address": {
            type: 'Address',
            fixed: 1,
        },

        "bills": {
            type: '[Bill]',
            minlen: 1,
            maxlen: 255,
            fixed: 2,
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