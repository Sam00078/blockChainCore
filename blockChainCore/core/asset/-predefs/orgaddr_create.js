/**
 * asset type ORGADDRESSCREATE 组合账户 产生
 */




module.exports = app => {


    // 资产类型
    const asset_kind_def = 'ORGADDRESSCREATE'
    const asset_properties = {
        
        "satisfyVoteRatio": {
            type: 'UInt16',
            minval: 1,
            maxval: 10000,
            fixed: 1,
        },

        "forms": {
            type: '[OrgElmForm]',
            minlen: 2,
            maxlen: 255,
            fixed: 2,
        }

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
        asset_properties, 
        AssetHandle
    )

















}