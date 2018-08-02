module.exports = {




    // 时间
    timestamp: {
        // 创世时间（时间戳）2018年8月8号上午8点整
        origin: parseInt(new Date(Date.UTC(2018, 07, 08, 08, 0, 0, 0)).getTime()/1000),
    },


    // 区块时间跨度（秒）
    block_span: 60 * 3, // 三分钟 
    
    // 无符号32位整形最大值
    uint32_max_value: 4294967295,



}