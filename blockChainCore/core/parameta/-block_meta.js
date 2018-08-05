/**
 * 区块数据格式
 */


module.exports = app => {



    const pm = app.core.bcc.parameta


    /**
     * 区块
     */
    pm.definition('Block', {

        type: '{}',
        properties: {
    
            "version": {
                type: 'Uint8',
                enumeration: [1], // 仅仅支持一个版本
                fixed: 1,
            },
    
            "height": {
                type: 'Uint32',
                fixed: 2,
            },
    
            "hash": {
                type: 'Buffer',
                length: 32,
                fixed: 3,
            },
    
            "prevBlock": {
                type: 'Buffer',
                length: 32,
                fixed: 4,
            },
    
            "mrklRoot": {
                type: 'Buffer',
                length: 32,
                fixed: 5,
            },
    
            "transactions": {
                type: '[Transaction<type>]',
                fixed: 6,
                minlen: 1,
                maxlen: 65535,
            }
        }
    }, {
        // 注册到
        register: "TribeTrustChainBlock",
    })


    // 交易类型基础定义
    const transaction_properties_boot = {

        "type": {
            type: 'Uint8',
            enumeration: [0, 1], // 目前仅支持两种交易类型
            fixed: 1,
        },

        "time": {
            type: 'Uint32',
            maxval: app.constant.bcc.core.uint32_max_value,
            fixed: 2,
        },

        "signs": {
            type:'[Sign]',
            minlen: 1,
            fixed: 3,
        },

    }



    /**
     * 交易（coinbase）
     */
    pm.definition('Transaction<type>', {
        type: '{}',
        fixed: 1,
        properties: Object.assign({

            "message": {
                type: 'String',
                length: 16,
                fixed: 11,
            },

            "nonce": {
                type: 'Uint32',
                maxval: app.constant.bcc.core.uint32_max_value,
                fixed: 12,
            },

        }, transaction_properties_boot)
    }, {
        union_mark_value: 0, // coinbase
    })



    /**
     * 交易（normal）
     */
    pm.definition('Transaction<type>', {
        type: '{}',
        fixed: 2,
        properties: Object.assign({

            "fee": {
                type: 'Uint32',
                maxval: app.constant.bcc.core.uint32_max_value,
                fixed: 11,
            },

            "feeUnit": {
                type: 'Uint8',
                maxval: 255,
                fixed: 12,
            },

            "assets": {
                type:'[Asset<kind>]',
                minlen: 1,
                maxlen: 255,
                fixed: 13,
                element: {
                    type: '{}',
                    properties: {

                        "kind": {
                            type: "Uint16",
                            minlen: 1,
                        }

                    }
                },
            },

        }, transaction_properties_boot)
    }, {
        union_mark_value: 1, // normal
    })



    /**
     * 签名
     */
    pm.definition('Sign', {
        type: '{}',
        properties: {

            "publicKey": {
                type:'Buffer',
                length: 33,
                fixed: 1,
            },

            "signature": {
                type:'Buffer',
                length: 64,
                fixed: 2,
            },

        }
    })


    /**
     * 支付、收款等账单
     */
    pm.definition('Bill', {
        type: '{}',
        properties: {

            "amount": {
                type: 'Uint32',
                minval: 0,
                maxval: app.constant.bcc.core.uint32_max_value,
                fixed: 1,
            },

            "unit": {
                type: 'Uint8',
                minval: 0,
                maxval: 255,
                fixed: 2,
            },

        }
    })



    /**
     * 钱包地址格式
     */
    pm.definition('Address', {
        type: 'String',
        length: 34,
        check_async: async function(stuff){
            return await app.core.bcc.account.verifyAddressValid(stuff)
        }
    })



    /**
     * 钻石标识
     */
    pm.definition('DiamondSymbol', {
        type: 'String',
        length: 6,
        check: function(stuff){
            const chars = 'WTYUIAHXVMEKBSZN'
            , cs = stuff.split('')
            for(let i in cs){
                if( chars.indexOf(cs[i]) == -1 ){
                    return false // 不允许的字母
                }
            }
            return true
        }
    })



    /**
     * Asset 资产类型定义 在 core/asset/-predef/ 目录
     */





}