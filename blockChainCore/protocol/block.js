/**
 * block data format
 *
 * 区块链云计算与企业社群服务
 * 
 */


let example_block = {
    // 1  byte , uint8  版本号 0 ~ 255 ，应该极度谨慎升级版本
    version: 1,
    // 32 byte , 区块哈希
    hash: 0x0000000011111111222222223333333344444444555555556666666677777777,
    // 32 byte , 父块哈希
    prevBlock: 0x0000000010100000000000001010101010101010101010101010101010101010,
    // 32 byte , Merkle树根哈希
    mrklRoot: 0x0909090909090909090909090909090909090909090909090909090909090909,
    // 4  byte , uint32 块高度 0 ~ 42 9496 7295 ，一分钟一个块可用8100年；一秒一个块可用135年        
    height: 123456,
    // 4 byte , uint32  区块开始挖掘时间：从创世到现在的秒数 可用135年
    time: 1231731,
    // 8  byte , str(64) 碰撞概率  2 8211 0990 7456 两万亿
    // hashabs: "fa2f2212",
    // 8  byte , str(64) 上级
    // prevabs: "f7d47b5a", // 00000000 d1145790 a8694403 d4063f32 3d499e65 5c834268 34d4ce2f 8dd4a2ee

    // hash: "0000c8933613f4b664848b4c11b8581bb06e1d2b0b63d273fafb487485153c8e",

    // 节点公钥
    // generatorPublicKey: "50b569b194817c132c0a76df53d1ce981e224193427e4b0fb2a7253ffce39bf7",
    // 块签名
    // blockSignature: "89082f6a35e4ec15effa83bdb41d9756585098d898fe479fb580e976b595e0d57b1a89cde9e4e0daf4898abdb09e05c7ee26b057ac1125ca7fadb68a19ec8832",

    // 包含的交易 列表
    transactions: [
        {
            type: 0, // 区块 coinbase 奖励
            // 33 bytes
            publicKey: 0x0378d430274f8c5ec1321338151e9f27f4c676a008bdf8638d07c0b6be9ab35c71,
            // 64 bytes
            signature: 0x89082f6a35e4ec15effa83bdb41d9756585098d898fe479fb580e976b595e0d57b1a89cde9e4e0daf4898abdb09e05c7ee26b057ac1125ca7fadb68a19ec8832,
            // 区块寄语 length = 16 bytes
            message: "TTUT.com        ",
            // 4 byte  , 随机数
            nonce: 4294967295,
            // 4 byte 
            time: 123456, // 从创世时间到现在的秒数

        },
        {
            // 1  byte , uint8  交易类型 0 ~ 255 ，谨慎新增类型
            type: 1, // 0：单签名   1：多重签名 
            // hash: "1eeec8933613f4b664848b4c11b8581bb06e1d2b0b63d273fafb487485153c8e",
            publicKey: 0x50b569b194817c132c0a76df53d1ce981e224193427e4b0fb2a7253ffce39bf7,
            signature: 0x000000000000b3759be4e5292e751bfc49d0a549e8670f405f7d47b5a6a91e8c97068c255a990b82b4ef3159dcca816a636efb8d21c5aeb353e88033a04805, // Buffer length 64 bytes

            // 本交易的将要付出的手续费  >  基础计算手续费
            fee: 123, //   4 bytes  uint32 ： 0 ～ 42 9496 7295
            feeUnit: 2, // 1 bytes  0 ~ 255 （表示后面跟了几个零）

            timestamp: 123456, // 从创世时间到现在的秒数

            // 交易包含的资产 列表
            assets: [
                {
                    kind: 0, // 0:payment default   1:text   2:
                    // int32 位，无符号：42 9496 7295
                    // int64 有符号： 922 3372 0368 5477 5807 常规。0 到 1844 6744 0737 0955 1615
                    // js 安全值： 9007 1992 5474 0992
                    amount: 1,     // 4 bytes  uint32   4294967295, // pay number * 100000000
                    // 转账单位（后面跟了几个零）
                    amountUnit: 8, // 1 bytes  0 ~ 255

                    // string length = 34
                    address: "1313Rta8Ce99H7N5iKbGq7xp13BbAdQHmD", // pay to wallet address 
                },
                {
                    kind: 1, // uint16  0~65535    核心预定义类型  0~20000  行业定制 20001 ~
                    text: "same text thing..."
                },
                {
                    kind: 20008, // development asset kind，Must be more than 10000
                    // follow some custom fields
                    k1: 0,
                    k2: {
                        k3: "",
                    }
                },
                {
                    kind: 3, // 多重签名地址生成（目前最多支持13个）
                    //        1313Rta8Ce99H7N5iKbGq7xp13BbAdQHmD
                    address: "39aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM",
                    satisfyVote: 3, // 满足票数（0~255）
                    publicKeyList: [{ // 公钥列表
                        key: "1eeec8933613f4b664848b4c11b8581bb06e1d2b0b63d273fafb487485153c8e",
                        vote: 1, // 票数 0~255
                    },{
                        key: "50b569b194817c132c0a76df53d1ce981e224193427e4b0fb2a7253ffce39bf7",
                        vote: 1,
                    },{
                        key: "34645634562341654864w523415473456eysrgaq45qafsdadfga345qtaerga34",
                        vote: 2,
                    }],
                },
                {
                    kind: 4, // 钻石挖出声明
                    diamond: "00000000ABCDXXXX",
                    nonce: 237865827365872,
                },
                {
                    kind: 5, // 钻石交易转移   0000FFFF AAAAEEEE 
                    diamond: "00000000ABCDXXXX",
                    address: "D9aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM",
                },
            ]
        },
        { // 1 + 32 + (34|0) + 4 + 1 + 32 + 64 + 1 + 4 + 1 + 34
            type: 2, //  1 byte  多重签名
            hash: "1eeec8933613f4b664848b4c11b8581bb06e1d2b0b63d273fafb487485153c8e",
            // 发起交易（支付手续费）的钱包地址（可选参数，如果为多元地址，则必须存在）
            address: "1313Rta8Ce99H7N5iKbGq7xp13BbAdQHmD",
            // 手续费
            fee: 123,
            feeUnit: 4, // 单位
            // 存在 asset kind = 7 or 8 时，需要联合签名
            signs: [ // 联合签名列表
                { // 第一个签名，必须为交易发起者
                    publicKey: "32c0a76df53d1ce981e224193427e4b0fb2a7253ffce39bf750b569b194817c1",
                    signature: "000000000000b3759be4e5292e751bfc49d0a549e8670f405f7d47b5a6a91e8c97068c255a990b82b4ef3159dcca816a636efb8d21c5aeb353e88033a04805",
                },
            ],
            assets: [
                {
                    kind: 7, // 请求支付【请求对方确认并支付】
                    amount: 100, // pay number * 100000000
                    amountUint: 0,
                    address: "D9aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM", // pay to wallet address 
                },
                {
                    kind: 8, // 发起支付【from 发给 to， 需要from签名，手续费始终由交易发起人承担】
                    amount: 100, // pay number * 100000000
                    amountUint: 0,
                    fromAddress: "EDTjt7cs7bE3UyDMxBYdGGFAhRsQt6jKt2", // pay to wallet address 
                    toAddress: "D9aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM", // pay to wallet address 
                },
            ],
        }
    ]

}



let mini_trs_size = 1 + 32 /*+34*/ + 4 + 1 + 32 + 64 + 1 + 4 + 1 + 34
log('交易大小: ' + mini_trs_size + '  ,  ' + (mini_trs_size/64)+'个64b')




let len = [
    "5fb20a01240750b3759be4e5292e751bfc49d0a549e8670f405f7d47b5a6a91e8c97068c255a990b82b4ef3159dcca816a636efb8d21c5aeb353e88033a04805","5fb20a01240750b3759be4e5292e751bfc49d0a549e8670f405f7d47b5a6a91e8c97068c255a990b82b4ef3159dcca816a636efb8d21c5aeb353e88033a04805",
].join('').length




log( len * 4000  / 1024 / 1024)
log( len * 60*24*365*10  / 1024 / 1024 / 1024)
log( (1+4+8+8+4) * 60*24*365*20  / 1024 / 1024 )


log( "height: " + (60*24*365 * 8100) )


log( "00000000ABCDXXXX".length )


/**
 * 0 & A-Z 哈希算法
 */
function hash27( str ) {

    return 
}



let magic_head = "0123456789qwertyuiopasdfghjklzxcvbnm" +  1892764832639




log( magic_head.length )








function log(s){ console.log(s) }







////////////////////////////// 所有交易类型 //////////////////////////////


{
    assets: [


        ////////////////// 跨链对接 //////////////////


        {
            kind: 1, // 提起发起侧链（侧链的创世区块hash和本区块hash必须相同）
            sideChainName: "",  // 侧链名称  [A-Za-z0-9_]  不能以数字开头
            // 公信节点公钥 ？？？
        },
        {
            kind: 2, // 
            
        },


        ////////////////// 资产转移 //////////////////


        {
            kind: 50, // coinbase 奖励给出块者的奖励代币
            amount: [123], //
        },
        {
            kind: 51, // 代币转账 (向对方转)
            amount: [123],
            address: "19aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM"
        },
        {
            kind: 52, // 代币转账（请求对方向我转）（需要对方联合签名）
            amount: [123],
            address: "1DTjt7cs7bE3UyDMxBYdGGFAhRsQt6jKt2"
        },
        {
            kind: 53, // 代币转账（从from向to转账）（需要from联合签名）
            amount: [123],
            fromAddress: "1DTjt7cs7bE3UyDMxBYdGGFAhRsQt6jKt2",
            toAddress: "19aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM"
        },

        {
            kind: 91, // 钻石挖出声明  （每一个区块最多只能有一颗钻石）（如果同时出现多颗钻石要上同一区块，则随机数最小的有效）
            diamond: "TTXXTT", // 6位字符  00000TTXXTT00000  计算方法 = hash17d（ sha256（上一颗钻石所在区块hash + 公钥 + 随机数））
            nonce: 2378658273658, // 随机数  uint32
        },
        {
            kind: 92, // 钻石交易转移
            diamond: "TTXXTT",
            address: "1DTjt7cs7bE3UyDMxBYdGGFAhRsQt6jKt2"
        },


        ////////////////// 身份信任 //////////////////


        {
            kind: 101, // 声明宣称身份
            name: "自然人实名或组织合法名称",
            identify: "身份证或其他证件号码"
        },
        {
            kind: 102, // 请求对方对本交易联合签名（合同签署，信息证明等）
            address: "1DTjt7cs7bE3UyDMxBYdGGFAhRsQt6jKt2"
        },


        ////////////////// 数据保存 //////////////////


        {
            kind: 151, // 内容的 sha256 hash至（合同等）
            hash: "50b569b194817c132c0a76df53d1ce981e224193427e4b0fb2a7253ffce39bf7",
        },
        {
            kind: 152, // utf-8 明文文本内容 长度限制为 varchar(255)  按文本长度收取手续费
            text: "阿克苏 交地方 哈考四级的 fadfaj kaksjdh fakjsdh"
        }






    ]
}