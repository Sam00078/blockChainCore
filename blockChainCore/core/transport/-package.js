/**
 * 将区块数据打包等
 */



const protocolBuffers = require('protocol-buffers')
const util = require('util')


const CONSTANTS = require("../-constants")



var messages = require('../../messages.js')


module.exports = app => {


    /**
     * 使用 google protobuf 打包解包
     */
    let protobufSchema
    async function getProtobufSchema () {
        if( protobufSchema === true ){
            return Promise((success) => {
                let tout = setInterval(function(){
                    if( protobufSchema !== true ){
                        clearInterval(tout)
                        success(protobufSchema)
                    }
                }, 50)
            })
        }else{
            if( ! protobufSchema ){
                protobufSchema === true
                protobufSchema = protocolBuffers( await app.core.bcc.parameta.outputProtobuf3Configure() )
                // app.log.debug( protobufSchema.Transaction )
                // app.log.debug( util.inspect( protobufSchema, {depth: null} ) )
            }
            return protobufSchema
        }
    }



    app.core.bcc.transport = Object.assign(app.core.bcc.transport, {

        // 打包区块
        async packBlock ( blockObject ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'transportPackBlock', {}, {blockObject})
        },
        // 区块解包
        async unpackBlock ( blockBuffer ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'transportUnpackBlock', {}, {blockBuffer})
        },
        // 打包交易
        async packTransaction ( transactionObject ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'transportPackTransaction', {}, {transactionObject})
        },
        // 交易解包
        async unpackTransaction ( transactionBuffer ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'transportUnpackTransaction', {}, {transactionBuffer})
        },

    })




    /////////////////// 核心方法 ///////////////////




    /**
     * 打包区块
     */
    app.core.bcc.transport.amt.it( CONSTANTS.amtfns['transportPackBlock'], {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, async function(argv, next){
        // blockObject
        try{
            let machineObject = await app.core.bcc.parameta.processProtobuf3Pack(argv.blockObject)
            // console.log( util.inspect( ttt, {depth: null} )  )
            let buffer = (await getProtobufSchema()).Block.encode(machineObject)
            // let buffer = messages.Block.encode(argv.blockObject)
            next(null, buffer)
        }catch(e){
            next(e)
        }
    })


    /**
     * 区块解包
     */
    app.core.bcc.transport.amt.it( CONSTANTS.amtfns['transportUnpackBlock'], {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, async function(argv, next){
        // blockBuffer
        try{
            let machineObject = (await getProtobufSchema()).Block.decode(argv.blockBuffer)
            let sourceObject = await app.core.bcc.parameta.processProtobuf3Unpack(machineObject)
            next(null, sourceObject)
        }catch(e){
            next(e)
        }
    })




    /**
     * 打包交易
     */
    app.core.bcc.transport.amt.it( CONSTANTS.amtfns['transportPackTransaction'], {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, async function(argv, next){
        // transactionObject
        try{
            let buffer = (await getProtobufSchema()).Transaction.encode(argv.transactionObject)
            next(null, buffer)
        }catch(e){
            next(e)
        }
    })


    /**
     * 交易解包
     */
    app.core.bcc.transport.amt.it( CONSTANTS.amtfns['transportUnpackTransaction'], {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, async function(argv, next){
        // TransactionBuffer
        try{
            let dataobj = (await getProtobufSchema()).Transaction.decode(argv.TransactionBuffer)
            next(null, dataobj)
        }catch(e){
            next(e)
        }
    })







}

