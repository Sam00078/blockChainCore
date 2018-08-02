

function log(...a){
    console.log(...a)
}

function getGoldSplitNumListValue ( idx ) {
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

function l5 () {
    let tt = 5 - (this+'').length
    return ' '.repeat(tt>0 ? tt : 0) + this
}
function l10 () {
    let tt = 10 - (this+'').length
    return ' '.repeat(tt>0 ? tt : 0) + this
}
Number.prototype.l5 = l5
Number.prototype.l10 = l10
String.prototype.l5 = l5
String.prototype.l10 = l10



// setTimeout(()=>{ process.exit(0) }, 1000)



// log( getGoldSplitNumListValue(50) )


/*






*/




// log(parseInt(new Date(Date.UTC(2018, 07, 08, 08, 0, 0, 0)).getTime()/1000))













///////////////////////////////////////////////////

// 区块间隔时间秒  3 分钟
const blockCreateIntervalTime = 60 * 3
// 区块大小上限（设置）
const blockMaxByteSize = 1024 * 800
// 区块大小下限
const blockMinByteSize = 64 * 4
// 区块大小下限
const blockHeadByteSize = 64 * 2
// 区块奖励年限数量
const blockRewardReduceQuantity = 47
// 区块奖励降低界限（每多少个区块降低）
const blockRewardReduceHeightAmbit = 500000
// 每笔交易最低大小 bytes
const transactionMinSize = 174
// 每笔交易平均大小 bytes
const transactionAverageSize = 64 * 4

// 通货膨胀比率
const inflatProportion = {
    per: 0.01,  // 比率
    blk: 50000, // 区块间隔 100天
}

///////////////////////////////////////////////////



/**
 * 共识得分计算
 */
function runConsensusScore () {

    log( `\n\n` )

    let numlist = [4,5,6, 100]
    let numlen = numlist.length
    log( `数列：`+numlist.join(',') )

    let total = 0
    for(let i in numlist){
        total += numlist[i]
    }
    log( `平均数：` + (total/numlen).toFixed(2) )


    let zhongnum = numlen%2==0 
        ? (numlist[numlen/2-1] + numlist[numlen/2]) / 2 
        : numlist[(numlen-1)/2]
    log( `中位数：` + (zhongnum).toFixed(2))




    log( `\n====================\n\n` )

}
// runConsensusScore()






/**
 * 跑：通货膨胀
 */
function runMoneyInflation () {

    log( `\n\n` )

    const years = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 100, 150, 200, 400, 700, 1000, 5000]
    for(let i in years){
        let year = years[i]
        , ytime = year * 365 * 24 * 3600
        , beisu = ytime / (inflatProportion.blk * blockCreateIntervalTime)
        , per = 1 + inflatProportion.per
        , bbk = Math.pow(per, beisu)
        // log(beisu, per)
        log( `第 ${year.l5()} 年：${bbk.toFixed(3).l10()} 倍, `)

    }


    log( `\n====================\n\n` )
}
// runMoneyInflation()





/**
 * 跑：时间统计切分
 */
function runTimeSegmentation () {

    log( `\n\n` )

    let spxs = [50, 73, 73*3, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000]
    for(let i in spxs){
        let spx = spxs[i]
        , tttime = spx * blockCreateIntervalTime
        if(spx < 1000){
            let mins = parseInt(tttime / 60)
            log( `${spx.l5()} 个区块：${mins.l5()} 分钟, ${(mins/60).toFixed(2).l5()} 小时 ` )
        }else if(spx < 10000){
            let hours = parseInt(tttime / 3600)
            log( `${spx.l5()} 个区块：${hours.l5()} 小时, ${(hours/24).toFixed(2).l5()} 天 ` )
        }else{
            let days = parseInt(tttime / 3600 / 24)
            log( `${(spx/10000).l5()} 万个区块：${days.l5()} 天, ${(days/360).toFixed(2).l5()} 年 ` )
        }
    }

    log( `\n====================\n\n` )


}   
runTimeSegmentation()



/**
 * 跑：区块统计
 */
function runBlockCreateCount () {

    let yearcount = 60*60*24*365 / blockCreateIntervalTime
    let yearmaxsize = yearcount*blockMaxByteSize/1024/2024/1024
    let yearminsize = yearcount*blockMinByteSize/1024/1024
    let yearheadsize = yearcount*blockHeadByteSize/1024/1024
    let tongjiyear = 50
    log( `\n每年产生：${yearcount/10000}万个区块，最低大小为：${yearminsize.toFixed(4)} MB   最高总大小为：${(yearmaxsize).toFixed(4)} GB` )
    log( `\n${tongjiyear} 年产生：${yearcount*tongjiyear/10000}万个区块， 区块头：${(yearheadsize*tongjiyear/1024).toFixed(4)} GB  最低大小：${(yearminsize*tongjiyear/1024).toFixed(4)} GB  最高总大小为：${(yearmaxsize*tongjiyear).toFixed(4)} GB` )
    log( `\n每个区块包含交易：${(blockMaxByteSize/transactionAverageSize).toFixed(1)}条` )
    let trsTpsMax = blockMaxByteSize/transactionMinSize/blockCreateIntervalTime
    let trsTpsAverage = blockMaxByteSize/transactionAverageSize/blockCreateIntervalTime
    log( `\nTPS上限：${trsTpsMax.toFixed(1)}/s  平均：${trsTpsAverage.toFixed(1)}/s   每小时平均${parseInt(trsTpsAverage*60*60)}笔    每天最高${parseInt(trsTpsMax*3600*24)}笔` )
    log( `\n====================\n\n` )



}
// runBlockCreateCount()




/**
 * 跑：钱币发行
 */
function runMoneyIssuing () {

    let totalIssuing = 0 // 总发行量

    // 计算总量
    let i = blockRewardReduceQuantity
    while(i){
        totalIssuing += getGoldSplitNumListValue(i) * blockRewardReduceHeightAmbit
        i--
    }

    // 发布比例
    let k = blockRewardReduceQuantity
    let currentIssuing = 0
    let ystime = (blockRewardReduceHeightAmbit / (3600/blockCreateIntervalTime) / 24 /365 )
    let issuPerLog = []
    while(k){
        let ambit = k * blockRewardReduceHeightAmbit
        let cyear = ystime * (blockRewardReduceQuantity-k+1)
        currentIssuing += getGoldSplitNumListValue(k) * blockRewardReduceHeightAmbit
        // log(`${k} ： ${getGoldSplitNumListValue(k)}`)
        // log(`${currentIssuing}`)
        k>30 && issuPerLog.push( `第${cyear.toFixed(1)}年:${(currentIssuing/100000000).toFixed(2)}个(${(currentIssuing/totalIssuing*100).toFixed(2)}%)` )
        k--
    }

    let canRewardTotalYear = blockRewardReduceHeightAmbit * blockRewardReduceQuantity * blockCreateIntervalTime / 60 / 60 / 24 / 365
    log( `\n可挖矿年数：${canRewardTotalYear}` )
    log( `\n发行曲线：${issuPerLog.join(', ')}` )
    log( `\n总发行量：${totalIssuing}（${parseInt(totalIssuing/100000000/10000)}万个）` )
    log( `\n====================\n\n` )


}
runMoneyIssuing()
















/*

// 计算总量

let total = 0 
let tatol = 0

let b1 = 1
let b2 = 1
let nums = [b1, b2]
for(let i=1; i<=50; i++)
{

    console.log(i + ': ' + b1)
    total += b1 * 1000000

    tatol += b1

    let nn = b1 + b2
    b1 = b2
    b2 = nn


    nums.push( nn )

}

// console.log( nums.join(', ') )

total = total / 100000000
console.log( total )


console.log( 43*1000000  / 60 / 24 / 365 )



let headper =  (4.4 + 2.6 + 1.6 + 1 ) * 60 * 24 * 365
console.log( headper )
console.log( (headper / total).toFixed(2) )


console.log( 50 * 6 * 24 * 365 )


let hasgat = 0
let year = 0
for(let i=50; i>=0; i--)
{
    year++
    hasgat += nums[i]
    console.log( nums[i], hasgat , tatol)
    console.log( (hasgat / tatol)*100 + '% - '+(year*2.4)+' year' )


}


/*




43: 433494437  
11349031.69    总矿储量
81.81126331811262  可挖矿年数
5045760  前四年挖出币数量
0.44     前四年挖出币比例
2628000




*/



