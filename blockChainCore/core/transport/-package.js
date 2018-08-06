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
    function getProtobufSchema () {
        if( ! protobufSchema ){
            protobufSchema = protocolBuffers(  app.core.bcc.parameta.outputProtobuf3Configure() )
        }
        return protobufSchema
    }



    app.core.bcc.transport = Object.assign(app.core.bcc.transport, {

        // 数据打包
        async packData ( schemaName, sourceObject ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'transportPackData', {}, {schemaName, sourceObject})
        },
        // 数据解包
        async unpackData ( schemaName, machineBuffer ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'transportUnpackData', {}, {schemaName, machineBuffer})
        },

    })




    /////////////////// 核心方法 ///////////////////




    /**
     * 打包区块
     */
    app.core.bcc.transport.amt.it( CONSTANTS.amtfns['transportPackData'], {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, async function(argv, next){
        // schemaName sourceObject
        try{
            let machineObject = app.core.bcc.parameta.processProtobuf3Pack(argv.sourceObject)
            // console.log( util.inspect( argv.sourceObject, {depth: null} )  )
            // console.log( util.inspect( machineObject, {depth: null} )  )
            // console.log( getProtobufSchema() )
            let buffer = getProtobufSchema()[argv.schemaName].encode(machineObject)
            // let buffer = messages.Block.encode(argv.blockObject)
            next(null, buffer)
        }catch(e){
            next(e)
        }
    })


    /**
     * 区块解包
     */
    app.core.bcc.transport.amt.it( CONSTANTS.amtfns['transportUnpackData'], {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, async function(argv, next){
        // machineBuffer
        try{
            let machineObject = getProtobufSchema()[argv.schemaName].decode(argv.machineBuffer)
            let sourceObject = app.core.bcc.parameta.processProtobuf3Unpack(machineObject)
            next(null, sourceObject)
        }catch(e){
            next(e)
        }
    })









}

