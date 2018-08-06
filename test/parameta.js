

module.exports = async app => {


    const parameta = app.core.bcc.parameta


    // 检查创世区块格式
    parameta.checkThrow('Block', app.constant.bcc.generate_block  )
    // LOG(app.constant.bcc.generate_block)
    // LOG(check_result)
    // EQUAL(check_result, undefined)




    // 输出 protobuf 3
    let protobuf3msg = app.core.bcc.parameta.outputProtobuf3Configure()
    LOG(protobuf3msg)



}


