/**
 * 数据传输模块
 */


const util = require("util")



module.exports = async app => {

    const transport = app.core.bcc.transport


    generate_block = app.constant.bcc.generate_block
    // LOG(generate_block)
    // LOG( util.inspect( generate_block , { depth: null }))

    // 测试创世区块的打包和解包
    let generate_block_buffer = await transport.packBlock( generate_block )
    // LOG(generate_block_buffer.toString('hex').substr(0, generate_block_buffer.length))
    // LOG(generate_block_buffer.length)

    let generate_block_unpack = await transport.unpackBlock( generate_block_buffer )
    let json_str = JSON.stringify( generate_block_unpack )
    // LOG( json_str )
    // LOG( json_str.length )
    // LOG( generate_block_unpack )
    LOG( util.inspect( generate_block_unpack , { depth: null }))








}


