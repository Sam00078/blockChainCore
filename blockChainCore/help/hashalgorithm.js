/**
 * 哈希算法
 */



exports.hash17diamond = function( str ){

    if (str.length !== 64){
        throw new Error("hash17diamond stuff length must be 64")
    }
    let stuff = '0WTYUIAHXVMEKBSZN'
    let step = 0
    , total = 16
    , hhlen = stuff.length
    let diamond = []
    , fv = 11
    for(;step<total;step++)
    {
        let n = step * 4
        , vl = str.charAt( n ).charCodeAt()
             * str.charAt( n + 1 ).charCodeAt()
             * str.charAt( n + 2 ).charCodeAt()
             / str.charAt( n + 3 ).charCodeAt()
        fv = vl * fv % hhlen
        diamond.push( stuff.charAt(fv) )
        if(fv==0) fv = 11
    }
    return diamond.join('')
}




