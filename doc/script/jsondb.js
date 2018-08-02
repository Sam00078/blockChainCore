/**
 * json 文件数据库
 */

const util = require("util")


function log(...a){
    console.log(...a)
}




class JsonFileDatabase {


    /** 初始化
     * opts.onchange = function(opts, value)
     */
    constructor(opts={})
    {
        this.value = opts.value || null
        this.opts = Object.assign({}, opts)
    }

    
    /**
     * 查询数据是否存在
     * key查询： k1.k2.k3
     * 数组遍历查询： k1.k2:.k3.k4    k2为数组
     * 数组条件查询： k1.k2:(k3="5",k4=1)<page 1 10,limit 3,start 5,order time>.k3.k4
     * 数组条件查询： k1.k2:0(k3="5",k4=1){*,k1,k2,k3=1}    并指定取出字段 k3设置默认值
     * 
     * 未找到数据 返回 undefined
     *  
     */
    select (conds) {
        let condary = this.__condPrepareHandle(conds)
        // log(condary)

        let results = []
        // 遍历目标数据
        this.__condmap(condary, this.value, (upper, key, value) => {
            results.push(value)
        })

        return results
    }

    // 查询匹配的第一条数据
    getone (conds) {
        let condary = this.__condPrepareHandle(conds)

        let result
        let onlygetone = true
        // 遍历目标数据
        this.__condmap(condary, this.value, (upper, key, value) => {
            result = value
        }, onlygetone)

        return result
    }


    // 赋值数据
    assign (conds, data) {
        let condary = this.__condPrepareHandle(conds)
        // 遍历目标数据
        this.__condmap(condary, this.value, (upper, key, value) => {
            upper[key] = data
        })

        // 储存回调
        this.opts.onchange && this.opts.onchange(this.opts, this.value)
    }

    // 更新数据
    update (conds, data) {
        if( ! data instanceof Object){
            throw new Error('data must be a dict')
        }
        let condary = this.__condPrepareHandle(conds)
        // 遍历目标数据
        this.__condmap(condary, this.value, (upper, key, value) => {
            upper[key] = Object.assign(value, data)
        })
        // 储存回调
        this.opts.onchange && this.opts.onchange(this.opts, this.value)
    }

    // 追加数据
    append (conds, data){
        let condary = this.__condPrepareHandle(conds)
        , popcnd = condary[condary.length-1]
        // 遍历目标数据
        this.__condmap(condary, this.value, (upper, key, value) => {
            // value 必须为数组 才能 append
            if( value instanceof Array ){
                value.push( data )
            }
        })
        // 储存回调
        this.opts.onchange && this.opts.onchange(this.opts, this.value)
    }

    /*/ 指定位置插入数据
    insert (conds, data) {
        let condary = this.__condPrepareHandle(conds)
        , popcnd = condary[condary.length-1]
        // 遍历目标数据
        this.__condmap(condary, this.value, (upper, key, value) => {
            log( key )
            // upper 必须为数组 才能 insert
            if( upper instanceof Array ){
                upper.splice(key, 0, data)
            }
        })
    }*/

    delete (conds) {
        let condary = this.__condPrepareHandle(conds)
        , delixs = []
        , oldupper = []

        log(condary)
        this.__condmap(condary, this.value, (upper, key, value) => {
            log(upper, key, value)
            if(upper instanceof Array){
                if(upper !== oldupper){
                    oldupper = upper
                    delixs = []
                }
                let i = parseInt(key)
                let realix = i - delixs.length
                upper.splice(realix, 1)
                delixs.push(i)
            }else{
                // log(`((((((((${key}`)
                delete upper[key]
            }
        })
        // 储存回调
        this.opts.onchange && this.opts.onchange(this.opts, this.value)

    }



    ////////////////////////////////////////////


    // 遍历符合条件的数据
    // itemcall(upper, key, value)
    // onlygetone 仅仅返回单条数据
    __condmap (condary, value, itemcall, onlygetone=false) {
        /*if(condary.length==0){
            log(`@@@@@@@`)
            log(value)
        }*/
        let cnds = [...condary]
        , oldvalue = value
        , oldcnd = cnds.length ? cnds[0] : null
        while (true) {
            if( cnds.length==0 ){
                break
            }
            oldcnd = cnds[0]
            oldvalue = value
            value = this.__eatcndmove(cnds, value, itemcall, onlygetone)
            if(value===undefined){
                break // 上一层开始数组查询 这一层结束
            }
        }
        if(value !== undefined){
            return itemcall(oldvalue, oldcnd ? oldcnd.key : null, value)
        }
    }

    // 吃掉一个条件，取出数据
    __eatcndmove (cnds, data, itemcall, onlygetone) {
        let hcnd = cnds.shift()
        , val = data[hcnd.key]
        if( val !== undefined ){
            // log(hcnd)
            if(hcnd.isary){
                if( ! (val instanceof Array) ){
                    throw new Error(`Query conditions ${hcnd.key} must be an array`)
                }
                // 数组遍历，查询
                let opt = hcnd.option || {}
                , limit_max = opt.limit
                , start = opt.start || 0
                let number = 0
                , count = 0
                for(let i=0; i<val.length; i++){
                    let one = val[i]
                    // 检查循环条件
                    if( this.__checkWhere(hcnd.where||{}, one) ){
                        number++
                        // log(number, start)
                        if(start>0 && number<=start){
                            continue // 开始限制
                        }
                        if(limit_max>0 && count>=limit_max){ 
                            break // 数量限制， LIMIT
                        }
                        count++
                        // log(val[i])
                        if(cnds.length){
                            // 递归
                            this.__condmap (cnds, val[i], itemcall)
                        }else{
                            // 到底
                            // log("^^^^^^^^^^^^^^^^^^^^^^^^^^")
                            // log(cnds)
                            itemcall(val, i, val[i])
                            // log("^^^^^^^^^^^^^^^^^^^^^^^^^^")
                            // 是否仅仅返回一条
                            if(onlygetone){
                                break
                            }
                        }
                    }
                }
                return
            }
            return val
        }
    }

    // 检查循环条件
    __checkWhere (where, one) {
        // log(where, one)
        for(let i in where){
            if(i==='$'){ // $表示等于自己本身
                return one === where[i]
            }else if( one[i] !== where[i] ){
                return false
            }
        }
        return true
    }
    

    // 移除前后空格
    __trip(str){
        return str.replace(/(^\s*)|(\s*$)/g,'')
    }

    // 检查字段是否合法
    __checkKey (key, notthrow=false) {
        if( /^[a-zA-Z_][0-9a-zA-Z_]*$/g.test(key)  ){
            // is ok
            return true
        }else{
            if( ! notthrow){
                throw new Error(`Query conditions key "${key}" is unavailable`)
            }
            return false
        }
    }


    // 语句预处理、语法检查
    // 返回处理后的对象
    __condPrepareHandle (conds) {
        const self = this

        let condary = []

        // 分割
        let realkeys = [] 
        let keyary = conds.split('.')
        let prevhasdot = false
        for(let i=0; i<keyary.length; i++){
            let li = keyary[i]
            if( !this.__checkKey(li, true) ){
                if(prevhasdot && !this.__checkKey(li.split(':')[0], true)){
                    realkeys[realkeys.length-1] += '.'+li
                }else{
                    realkeys.push( li )
                    prevhasdot = true
                }
            }else{
                realkeys.push( li )
                prevhasdot = false
            }
        }
        // log(realkeys)
        // 解析
        for(let i in realkeys) {
            let key = self.__trip(realkeys[i])
            , kis = key.indexOf(':')
            if( kis == -1 ){
                condary.push({
                    key: key
                })
            }else{
                let oldkey = key
                key = self.__trip( oldkey.substr(0, kis) )
                // log(key)
                // log(oldkey.substr(kis+1))
                condary.push(Object.assign({
                    isary: true, // 标识为数组
                    key: key
                }, this.__parseSearchCond( oldkey.substr(kis)) ))
            }
            // 检查
            this.__checkKey(key)
        }

        if( condary.length == 0 ){
            throw new Error(`Query conditions can not be empty`)
        }

        return condary
    }


    // 解析搜索条件
    /*
    * 数组条件查询： k1.k2:(k3="5",k4=1)<page 1,limit 3,start 5,order time>k3.k4
    * 数组条件查询： k1.k2:0(k3="5",k4=1){*,k1,k2,k3=1}    并指定取出字段 k3设置默认值
    */
    __parseSearchCond (cond) {
        const self = this

        let theobj = {}
        , where_match = cond.match(/\(([^\)]+)\)/)
        , option_match = cond.match(/<([^>]+)>/)
        , index_str =  cond.replace(/\([^\)]*\)|\{[^\}]*\}|<[^>]*>/gi, '')

        if( index_str && !isNaN(index_str) ){
            theobj.index = parseInt(index_str)
        }
        if( where_match ){
            theobj.where = parseWhere(where_match[1])
        }
        if( option_match ){
            theobj.option = parseOption(option_match[1])
        }

        return theobj

        // 解析控制法
        function parseOption(str){
            let obj = {}
            let arys = str.split(',')
            for(let i in arys){
                let lis = self.__trip(arys[i]).replace(/\s+/g,' ').split(' ')
                , vv = self.__trip(lis[1])
                if( !isNaN(vv) ){
                    vv = Number(vv)
                }
                obj[self.__trip(lis[0])] = vv
            }
            return obj
        }

        // 解析查询条件
        function parseWhere(str){
            let obj = {}
            let arys = str.split(',')
            for(let i in arys){
                let one = self.__trip(arys[i])
                , eqi = one.indexOf('=')
                // log(eqi)
                if( eqi<1 ){
                    throw new Error(`Query conditions where ( ${one} ) is unavailable`)
                }
                let kv = parseOneObj(eqi, one)
                obj[kv[0]] = kv[1]
            }
            return obj
        }

        // 拿到对象
        function parseOneObj(eqi, str){
            let key = self.__trip(str.substring(0, eqi))
            , val = self.__trip(str.substr(eqi+1))
            , value = undefined
            if( val === 'true'){
                value = true
            }else if( val === 'false'){
                value = false
            }else if( val === 'null'){
                value = null
            }else{
                if( !isNaN(val) ){
                    value = Number(val)
                }else{
                    value = strip(str, val)
                }
            }
            // 剥出字符串
            function strip(one, str){
                // log(str)
                if(
                    str.startsWith('\'') && str.endsWith('\'') ||
                    str.startsWith('"') && str.endsWith('"') ||
                    str.startsWith('`') && str.endsWith('`')
                ){
                    return str.substr(1, str.length-2)
                }else{
                    throw new Error(`Query conditions where ( ${one} ) is unavailable`)
                }
            }

            return [key, value]
        }


    }


}





/**
 * 单元测试
 */
function unitTest(){

    let DB = new JsonFileDatabase({

        // 储存回调
        onchange: (opts, value) => {
            log(` 文件 ${opts.file} 已经修改`)
        },

        // opt 任意标识
        file: '/dir/file.json',

        // 数据
        value: {
            k0:{
                k1:[{
                    id:"111",
                    k2:[
                        "aa", "bb", "cc"
                    ]
                },{
                    id:"222",
                    k2:[
                        "aa", "bb", "cc"
                    ]
                }]
            },
            k1:{
                k2:{
                    k3:{
                        abc: 700
                    }
                }
            },
            k2:{
                k3:[{
                    k4:{
                        abc: 123
                    }
                },{
                    isok: true,
                    k4:{
                        abc: 456
                    }
                },{
                    isok: "1.:1.1",
                    k4:{
                        abc: 789
                    }
                },{
                    isok: true,
                    k4:{
                        abc: 1000
                    }
                }]
            }
        }
    
    })

    function logDB () {
        log( util.inspect(DB.value, {depth:null}) )
    }


    log(`\n====== base data =======\n`)
    logDB()

    log(`\n-------- select --------\n`)
    let res0 = DB.select(`k1.k2.k3`)
    log( res0 )
    let res1 = DB.select(`k2.k3:.k4.abc`)
    log( res1 )
    let res2 = DB.select(`k2.k3:(isok="1.:1.1")<limit 1 , start 0>.k4.abc`)
    log( res2 )


    log(`\n-------- getone --------\n`)
    let res10 = DB.getone(`k0.k1`)
    log( res10 )
    let res11 = DB.getone(`k2.k3:(isok=true)`)
    log( res11 )
    

    log(`\n-------- append --------\n`)
    DB.append(`k2.k3`, {hhh: 888, k4: {abc:888, kkk: 222}})
    DB.append(`k2.k3`, {hhh: 999, k4: {abc:999}})
    logDB()


    log(`\n-------- update --------\n`)
    DB.update(`k2.k3:(hhh=888).k4`, {abc: 10770000009, kkk: 333})
    logDB()
    DB.update(`k2.k3:(hhh=888)`, {ffffkkk: 1111222})
    logDB()
    

    log(`\n-------- assign --------\n`)
    DB.assign(`k2.k3:(hhh=888).k4.abc`, 4444444444)
    logDB()
    DB.assign(`k2.k3:(hhh=888).k4`, {hhh: 777})
    logDB()
    

    log(`\n-------- delete --------\n`)
    DB.delete(`k2.k3:(hhh=888).k4`)
    logDB()
    DB.delete(`k2.k3:(hhh=888)`)
    logDB()
    DB.delete(`k0.k1:(id="222").k2:($="bb")`)
    logDB()
    
    
     
    // new JsonFileDatabase().select(`  k1  .  k2  : 3   (  k3 =  "5"  ,k4= 1){k1  , k2,k3=1}<page   1  ,limit 3,start 5,order time>.k3.k4`)
    
}




// unitTest()





module.exports = JsonFileDatabase
