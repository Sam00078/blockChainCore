module.exports = app => {

    return {
        // 监听端口
        listen: {
            http: 8001,
        },

        worker: {
            //enabled: true, // 是否使用子线程模式，默认开启
            num: 4
        }



    }
}

