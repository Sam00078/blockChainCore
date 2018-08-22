/**
 * block chain core 算法
 */


// const BigNumber = require("bignumber.js").BigNumber





/**
 * 获取黄金分割数列值
 * idx 从 1 开始
 */
exports.getGoldSplitNumListValue = function( idx )
{
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



/**
 * 计算 hash(256) 分值 从左往右
 * 字符串形式的 bignumber
 */
exports.getHashWorkScore = function ( hashBuffer )
{
    let buflen = hashBuffer.length
    if(buflen >2048){
        throw new Error(`Buffer length:${buflen} not more than 2048`)
    }

    let scoreLiteAry = []

    for(let i=0; i<buflen; i++){
        let inber = hashBuffer[i]
        if(inber<255 || i==buflen-1){
            scoreLiteAry.push( inber )
            break
        }
        scoreLiteAry.push( inber )
    }

    let score = 0 // new BigNumber(0)
    for(let i=0; i<scoreLiteAry.length; i++){
        let one = scoreLiteAry[i] * (i+1)
        score += one
    }

    // console.log(scoreLiteAry)

    return score

}




// console.log( exports.getHashScore( Buffer.from('fffffffffffff1105935d309d378d430935d309d378d430935d309d378d09d37', 'hex') ) )
// console.log( exports.getHashScore( Buffer.from('fffffffffffffffffffe35d309d378d430935d309d378d430935d309d378d430', 'hex') ) )



/**
 * 计算 hash(256) 分值 从左往右
 * 如果 buf1 分值大于 buf2 则返回 1， 相等返回 0 ，小于返回 -1
 */
exports.compareHashScore = function ( hashBuffer1, hashBuffer2 )
{
    if( ! hashBuffer1.length || hashBuffer1.length!==hashBuffer2.length ){
        throw new Error(`Buffer length not valid`)
    }

    let buflen = hashBuffer1.length
    for(let i=0; i<buflen; i++){
        let c1 = hashBuffer1[i]
        , c2 = hashBuffer2[i]
        if( c1!=c2 ){
            return c1 > c2 ? 1 : -1
        }
    }

    return 0 //相等

}

// console.log( exports.compareHashScore( Buffer.from('ffff09', 'hex'), Buffer.from('ffff7d', 'hex') ) )



console.log( 1024 * 800 * 200 / 1024 / 1024 )


