/**
 * 共识机制，时间相关
 * 
 * 
 * 
 * 
 */



const CONSTANTS = require("../-constants")




module.exports = app => {



    app.core.bcc.consensus = Object.assign(app.core.bcc.consensus, {

        /**
         * 通过时间戳，获取区块槽序（非区块高度）
         */
        async getBlockSlot ( timestamp ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'consensusGetBlockSlot', {}, {timestamp})
        }

    })














    


    /////////////////// 核心方法 ///////////////////













    /**
     * 公司介绍：SVinsight（硅谷洞察）扎根硅谷，包含三个业务板块：第一，硅谷洞察研究院；第二，美国第一流量中文科技媒体“硅谷密探”，全网订阅者超400万。第三，每年在硅谷举办两次2000人以上规模的，最具影响力的全球区块链峰会（Blockchain Connect Conference）。U Network 是SVinsight（硅谷洞察）孵化的区块链公链项目，是全球首个内容价值预测和内容发布平台, 一个以公平和价值驱动的内容激励网络。U Network的优势：1，U Network 是内容领域的垂直公链，内容领域是区块链最容易落地的领域，也是一个区块链最有潜力的赛道2，U Network 投资方包括丹华资本，Draper Dragon ,Block VC ，PreAngel, D fund等数十家国内外顶级机构3，U Network 有比较强大的技术资源，海内外技术合作方包括NKN，Genaro Network, 星云链，本体，Iris Network，Certik，Celer Network. 4,   U Network 国际化程度较高，在硅谷有团队，有上万粉丝的海外社群。5，U Network合作方硅谷洞察是火币投资的机构，直接打通硅谷密探的媒体和大会资源。------您好，SVInsight（硅谷洞察）扎根硅谷，是美国最具影响力的区块链产业服务商之一，旗下包括硅谷洞察研究院、硅谷密探（400万以上全网订阅用户）、BC Conference（每年两次，对标纽约共识大会的硅谷区块链大会）。 SVInishgt（硅谷洞察）孵化的内容公链U Network，获得了Draper Dragon，丹华资本，Block VC，PreAngel, D fund等数十家美、中顶级机构投资，测试网即将上线。 U Network目前在硅谷与北京各有办公室，工作地点可选择于两地，项目寻求技术总监加入，如有兴趣，可以进一步交流。
     */


    /**
     * 获取当前区块槽序
     */
    app.core.bcc.consensus.amt.it( CONSTANTS.amtfns.consensusGetBlockSlot, {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, function(argv, next){
        // timestamp

        // app.log.debug(app.constant)

        let timestamp = argv.timestamp || parseInt(new Date().getTime()/1000)
        , block_span = app.constant.bcc.core.block_span
        , slot_num =  parseInt(timestamp / block_span)

        // ok
        next(null, {
            slot: slot_num
        })

    })







}
























































































