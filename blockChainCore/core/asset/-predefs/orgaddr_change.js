/**
 * asset type ORGADDRESSCHANGE 组合账户 修改
 */




module.exports = app => {


    // 资产类型
    const asset_kind_def = 'ORGADDRESSCHANGE'
    const asset_properties = {
        
        "forms": {
            type: '[OrgElmForm]',
            minlen: 1,
            maxlen: 255,
            fixed: 1,
        }

    }

    // 定义 OrgElmForm 字段
    app.core.bcc.parameta.definition('OrgElmForm', {
        type: '{}',
        properties: {

            "address": {
                type: 'Address',
                fixed: 1,
            },

            "vote": {
                type: 'Uint8',
                minval: 1,
                fixed: 2,
            },
        }
    })




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