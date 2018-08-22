/**
 * asset type DIAMONDTRANSFER 钻石交易
 */




module.exports = app => {


    // 资产类型
    const asset_kind_def = 'DIAMONDTRANSFER'
    const asset_properties = {
        
        "diamond": {
            type: 'DiamondSymbol',
            fixed: 1,
        },

        "address": {
            type: 'Address',
            fixed: 2,
        }

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