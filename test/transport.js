/**
 * 数据传输模块
 */


const util = require("util")



module.exports = async app => {

    const transport = app.core.bcc.transport


    generate_block = app.constant.bcc.generate_block
    // LOG("\n" + generate_block)
    // LOG("\n" + JSON.stringify( generate_block ) )
    // LOG("\n" +  util.inspect( generate_block , { depth: null }))

    // 测试创世区块的打包和解包
    let generate_block_buffer = await transport.packData( 'Block', generate_block )
    // LOG("\n" + generate_block_buffer.toString('hex'))
    // LOG("\n" + generate_block_buffer.toString('hex').substr(0, generate_block_buffer.length))
    // LOG("\n" + generate_block_buffer.length)

    // 解包
    let generate_block_unpack = await transport.unpackData( 'Block', generate_block_buffer )
    // let json_str = JSON.stringify( generate_block_unpack )
    // LOG("\n" +  json_str )
    // LOG("\n" +  json_str.length )
    // LOG("\n" +  generate_block_unpack )
    // LOG("\n" +  util.inspect( generate_block_unpack , { depth: null }))

    // 冲压成 buffer
    let tinybuf = app.core.bcc.parameta.condenseToBuffer( 'Transaction<type>', generate_block.transactions[0] )
    // LOG("\n" + tinybuf.toString('hex'))
    // LOG("\n" + tinybuf.toString('hex').substr(0, tinybuf.length))



}


