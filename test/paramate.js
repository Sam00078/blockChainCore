

module.exports = async app => {

    const paramate = app.core.bcc.paramate


    // 检查创世区块格式
    let check_result = await paramate.check( app.constant.bcc.generate_block, 'TribeTrustChainBlock' )
    // LOG(app.constant.bcc.generate_block)
    // LOG(check_result)
    EQUAL(check_result, undefined)




    // 输出 protobuf 3
    // let protobuf3msg = await app.core.bcc.paramate.outputProtobuf3Configure()
    // LOG(protobuf3msg)



}


