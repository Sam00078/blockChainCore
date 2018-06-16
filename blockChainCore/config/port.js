module.exports = app => {

    return {
        // 监听端口
        listen: {
            http: 9693,
        },

        worker: {
            //enabled: true, // 是否使用子线程模式，默认开启
            num: 4
        }



    }
}

