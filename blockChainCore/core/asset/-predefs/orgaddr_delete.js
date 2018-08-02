/**
 * asset type ORGADDRESSDELETE 组合账户 删除成员
 */




module.exports = app => {


    // 资产类型
    const asset_kind_def = 'ORGADDRESSDELETE'
    const asset_properties = {
        
        "forms": {
            type: '[OrgElmFormDel]',
            minlen: 1,
            maxlen: 255,
            fixed: 1,
        }

    }

    // 定义 OrgElmForm 字段
    app.core.bcc.paramate.definition('OrgElmFormDel', {
        type: '{}',
        properties: {

            "address": {
                type: 'Address',
                fixed: 1,
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