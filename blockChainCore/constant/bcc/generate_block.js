/**
 * 创世区块
 */




/**
 * 预定义的区块数据格式
 */

const PredefinitionBlockFormat = {
    //   1 byte, 0~255, 版本号, 应该极度谨慎升级版本
    version: 1,
    //  32 byte, 本区块哈希
    hash: "000000000000000000000000000000000000", // string buffer
    //  32 byte, 父区块哈希
    prevBlock: "000000000000000000000000000000000000", // string buffer
    //  32 byte, Merkle树根哈希
    mrklRoot: "000000000000000000000000000000000000", // string buffer
    //   4 byte, 0 ~ 4294967295 区块高度, 一分钟一个块可用8100年；一秒一个块可用135年    
    height: 0,


    // 交易
    transactions: [ // length 数量 65535 个以内

        ////////  coinbase trs  ////////

        {
            //   1 byte, 0~255, 交易类型
            type: 0, // type=0 为 区块 coinbase 奖励
            // 矿工获得的币，必须在200个区块(10个小时)之后，才能花出去
            // 也就是说：挖出区块后10小时内不能花钱，也不能再当矿工
            // 签名列表
            signs: [
                {
                    //  33 byte, 公钥
                    publicKey: "0000000000000000000000000000000000000", // string buffer
                    //  64 byte, 签名
                    signature: "000000000000000000000000000000000000000000000000000000000000000000000000", // string buffer
                },
            ],
            //  16 byte, 区块寄语（用空格补齐）
            message: "hardertodobetter", // string
            //   4 byte, 随机数（）
            nonce: 4294967295,
            //   4 byte, 区块开始挖掘的<bcc时间戳>（从创世到现在的秒数）
            time: 0,  // {不接受时间}
        },

        ////////  normal trs  ////////

        {
            //   1 byte, 0~255, 交易类型
            type: 1, // t=1 为 普通交易
            //   4 byte, 手续费数量（可大于但不可小于系统法定值）
            // 每1万个区块(20天)手续费降低至0.955倍，约1000天(2.7年)降低为1/10，
            // 初始手续费基数为 初始0.02个币，
            fee: 10000,
            //   1 byte, 手续费单位
            feeUnit: 0,
            //   4 byte, 交易生成的<bcc时间戳>（从创世到现在的秒数）
            time: 180,
            // 本交易签名地址【可选字段】（如果存在则必须为版本 2 开头的组合地址，默认不存在，为签名列表的第一个）
            address: "29aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM",
            // 签名列表
            signs: [
                {
                    //  33 byte, 公钥
                    publicKey: "0000000000000000000000000000000000000", // string buffer
                    //  64 byte, 签名
                    signature: "000000000000000000000000000000000000000000000000000000000000000000000000", // string buffer
                }
            ],
            // 资产列表
            assets: [ // length 数量 255 个以内

                /////////////////  转账相关  /////////////////

                {
                    //   2 byte, 0~65535, 资产类型
                    kind: 1, // 普通转账
                    bills: [{ // length 数量 255 个以内
                        //   4 byte, 0~4294967295, 转账金额数量
                        amount: 1,
                        //   1 byte, 0~255, 转账单位（后面跟了几个零）
                        unit: 8,
                    }], 
                    //  34 byte, 转账收款方（地址为33位则末尾为空格）
                    address: "1313Rta8Ce99H7N5iKbGq7xp13BbAdQHmD",
                },
                {
                    kind: 2, // 请求对方转账给自己
                    bills: [{
                        amount: 1,
                        unit: 8,
                    }], 
                    //  34 byte, 转账付款方
                    // 【需要在 signs 字段内加上本地址的签名】
                    address: "1313Rta8Ce99H7N5iKbGq7xp13BbAdQHmD",
                },
                {
                    kind: 3, // 请求 fromAddress 转账给 toAddress
                    bills: [{
                        amount: 1,
                        unit: 8,
                    }], 
                    //  34 byte, 转账付款方
                    // 【需要在 signs 字段内加上本地址的签名】
                    fromAddress: "1313Rta8Ce99H7N5iKbGq7xp13BbAdQHmD",
                    //  34 byte, 转账收款方
                    toAddress: "1313Rta8Ce99H7N5iKbGq7xp13BbAdQHmD",
                },

                /////////////////  钻石挖出交易  /////////////////

                {
                    // 上一个钻石区块(或创世区块)的hash(hex) + 自己的publickey(hex)为底 + 随机数，进行hash再转换成
                    // 类似 00000WTYUIA00000 的16位字符串（前后都是五位0）
                    // 一个区块最多仅含有一枚钻石
                    // 钻石字面值唯一不重复

                    // 钻石挖出声明
                    kind: 4,
                    //   6 byte, WTYUIAHXVMEKBSZN, 钻石字面值
                    diamond: "AAMMKK",
                    //   4 byte, 随机数 用于尝试生成钻石
                    nonce: 289237457,
                },
                {
                    // 钻石交易转移（自己必须拥有）
                    kind: 5,
                    diamond: "WWUUYY",
                    // 收钻方
                    address: "19aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM",
                },

                /////////////////  组合地址  /////////////////

                {
                    // 生成的地址以 2 版本号 开头
                    // 生成方式为 trsTime satisfyVoteRatio address1 vote1 address2 vote2 ...  

                    // 生成组合地址
                    kind: 6,
                    //    2 byte, 1~10000 满足票数有效比例（万分比）（必须等于或大于此万分比值即可操作账户）
                    satisfyVoteRatio: 30,
                    // 组成列表
                    forms: [ // length 数量 255 个以内
                        {
                            address: '19aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM',
                            //   1 byte, 0~255, 投票票数
                            vote: 1,
                        },
                        {
                            // 成员可以为组合地址，条件是【组合地址已经注册】
                            address: '29aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM',
                            vote: 3,
                        },
                        {
                            address: '19aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM',
                            vote: 2,
                        },
                    ]
                },
                {
                    // 交易发起者必须为 2 版本号开头的组合地址
                    // 组合地址，添加（或覆盖(改票数)）地址
                    kind: 7,
                    forms: [ // length 限制数量始终在 255 个以内
                        {
                            // 成员可以为组合地址，条件是【组合地址已经注册】
                            address: '19aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM',
                            vote: 3,
                        },
                    ]
                },
                {
                    // 交易发起者必须为 2 版本号开头的组合地址
                    // 组合地址，删除地址
                    kind: 8,
                    forms: [ // length 限制数量始终在 255 个以内
                        {
                            // 成员可以为组合地址，条件是【组合地址已经注册】
                            address: '19aqbMhiK6F2s53gNp2ghoT4EezFFPpXuM',
                        },
                    ]
                },
                {
                    // 交易发起者必须为 2 版本号开头的组合地址
                    // 组合地址，修改生效票数
                    kind: 9,
                    // 要修改的万分之生效比例
                    satisfyVoteRatio: 3456,
                },

                /////////////////  数据操作  /////////////////

                {
                    kind: 10,
                    //  32 byte, 要存根、声明、签署的文本哈希（用于达成共识、签合同、交易内容等等）
                    hash: "000000000000000000000000000000000000", // string buffer
                },
                {
                    kind: 11,
                    //   4 byte, 要存储声明的数字
                    number: 12347890,
                },
                {
                    kind: 12,
                    // 256 byte max -变长字段-, 申明的文本明文（UTF8编码），最长支持 256 byte
                    string: "asda sdaggh fghdf hfgh 23556 df", // string
                },
                




            ]

        }




    ]






}










/**********************************************************************/











module.exports = {
    version: 1,
    hash: Buffer.from("03950954c4c5cf11ee1e1f08269efe13dc6e3af754e082b539f5ad2437811800", 'hex'),
    prevBlock: Buffer.from("03950954c4c5cf11ee1e1f08269efe13dc6e3af754e082b539f5ad2437811800", 'hex'),
    mrklRoot: Buffer.from("03950954c4c5cf11ee1e1f08269efe13dc6e3af754e082b539f5ad2437811800", 'hex'),
    height: 0,
    transactions: [
        {
            type: 0,
            signs: [
                {
                    publicKey: Buffer.from("03950954c4c5cf11ee1e1f08269efe13dc6e3af754e082b539f5ad243781180002", 'hex'),
                    signature: Buffer.from("03950954c4c5cf11ee1e1f08269efe13dc6e3af754e082b539f5ad24378118000203950954c4c5cf11ee1e1f08269efe13dc6e3af754e082b539f5ad24378118", 'hex'),
                },
            ],
            message: "hardertodobetter",
            nonce: 4294967295,
            time: 0,
        },
        {
            type: 1,
            fee: 0,
            feeUnit: 0,
            time: 13,
            signs: [
                {                           
                    publicKey: Buffer.from("035f504327b0f9aea8350a588435179d5fa2310a3aca5aac964f9526f3c24f4587", 'hex'),
                    signature: Buffer.from("035f504327b0f9aea8350a588435179d5fa2310a3aca5aac964f9526f3c24f4587035f504327b0f9aea8350a588435179d5fa2310a3aca5aac964f9526f3c24f", 'hex'),
                },
            ],
            assets: [
                {
                    kind: 10,
                    hash: Buffer.from("0348b77fa33fda54cf7d4c6bf7e72a6c654ad28c3f8f0003c9235a15f406d48f", 'hex'),
                },
                {
                    kind: 11,
                    number: 2018080808,
                },
                {
                    kind: 12,
                    string: "Beijing turns to artificial intelligence for diplomatic advantage.",
                },
            ],
        },
        {
            type: 1,
            fee: 0,
            feeUnit: 0,
            time: 27,
            signs: [
                {
                    publicKey: Buffer.from("03e6db9b4eff99c9c0aac5b310a2477806b5c9329301ebce8538c6ae041145551e", 'hex'),
                    signature: Buffer.from("03e6db9b4eff99c9c0aac5b310a2477806b5c9329301ebce8538c6ae041145551e03e6db9b4eff99c9c0aac5b310a2477806b5c9329301ebce8538c6ae041145", 'hex'),
                },
            ],
            assets: [
                {
                    kind: 6,
                    satisfyVoteRatio: 6666,
                    forms: [
                        {
                            address: "17UPoiLw3eSs64sPc6sy8G2GYCq1MfH4mv",
                            vote: 1,
                        },
                        {
                            address: "1LvR7SD82dNgjXRrcc1n3KJxMSYs9fpzX9",
                            vote: 1,
                        },
                        {
                            address: "14C71RExgeEr3siPrrePqEeYAbhaD6h7SQ",
                            vote: 1,
                        },
                    ]
                },
            ],
        }
    ]



}



