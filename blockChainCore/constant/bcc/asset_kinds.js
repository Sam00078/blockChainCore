
module.exports = {


    PAYMENT:          1,          // 支付（转账给别人）
    CHARGE:           2,          // 收款（请求别人支付给我）
    TRANSFER:         3,          // 划转（让一个人转给另一个人）

    DIAMONDPRODUCE:   4,          // 钻石产生
    DIAMONDTRANSFER:  5,          // 钻石交易

    ORGADDRESSCREATE: 6,          // 组合账户 产生
    ORGADDRESSCHANGE: 7,          // 组合账户 修改或新增成员
    ORGADDRESSDELETE: 8,          // 组合账户 删除成员
    ORGADDRESSVOTERATIO: 9,       // 组合账户 修改有效票数比例

    DATAHASH:        10,          // 数据 hash 32位哈希值
    DATANUMBER:      11,          // 数据 number int32数字
    DATASTRING:      12,          // 数据 string 字符串




}