

module.exports = async app => {

    const reward = app.core.bcc.reward


    // 检查区块奖励数量计算

    let v = await reward.getBlockCoinbaseByHeight( 1 )
    // LOG(v)
    EQUAL(v.amount, 2971215073)

    v = await reward.getBlockCoinbaseByHeight( 1509999 )
    // LOG(v)
    EQUAL(v.amount, 701408733)

    v = await reward.getBlockCoinbaseByHeight( 15009999 )
    // LOG(v)
    EQUAL(v.amount, 1597)

    

    // LOG (Buffer.from("abc123", 'utf8'))

    // let jsonstr = JSON.stringify({
    //     num: 123,
    //     buf: Buffer.from("0123abcf", 'hex')
    // })
    // LOG( jsonstr )
    // LOG( JSON.parse(jsonstr) )
    








}