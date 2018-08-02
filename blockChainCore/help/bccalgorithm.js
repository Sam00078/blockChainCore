/**
 * block chain core 算法
 */



/**
 * 获取黄金分割数列值
 * idx 从 1 开始
 */
exports.getGoldSplitNumListValue = function( idx ) {
    let b1 = 1
    let b2 = 1
    for(let i=1; i<idx; i++)
    {
        let nn = b1 + b2
        b1 = b2
        b2 = nn
    }
    return b1
}




