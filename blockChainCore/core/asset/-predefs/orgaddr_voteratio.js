/**
 * asset type ORGADDRESSVOTERATIO 组合账户 修改有效票数比例
 */




module.exports = app => {


    // 资产类型
    const asset_kind_def = 'ORGADDRESSVOTERATIO'
    const asset_properties = {
        
        "satisfyVoteRatio": {
            type: 'UInt16',
            minval: 1,
            maxval: 10000,
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
        asset_properties, 
        AssetHandle
    )

















}