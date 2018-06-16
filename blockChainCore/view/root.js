


module.exports = app => {


    class RootViewer extends app.Viewer
    {
        // 没有入口点，和出口文件名，不用编译打包生成
        get config () {
            // 增加配置
            return {
                // 版本号（静态文件目录等）年+月+日+时+分
                // 比较大小，用来判断页面是否是最新更新的，可以用来比对跟新部分或全部页面
                version: 1805300950, 
                // 入口点
                // slicing: false, // 是否把base切开成为公共头尾部分
                // 编译生成 输出
                output: {
                    path: "../static/", // 路径，以启动文件路径为基准
                    // file: "html", // 文件名
                    // prepared: true, // 是否为已准备好静态文件，可以快速启动状态
                    // compress: 'topgrade', // 是否压缩 undefined true 'topgrade'
                    refresh: true, // 每次访问都重新读取刷新
                },
                // 静态文件 url
                static: {
                    // url: "http://static.ynyxr.com/static", // 不用附带 / 末尾斜杠
                    url: "/static", // 绝对路径则为当前域名
                    // query: {'_': 123}, // 追加到 js,css 文件的 url 后的参数
                }, 
                // 前端模块（查找js,css,htm三种模块，自动排重，如果没查找到，自动忽略）
                src: [
                    // 'ak:a6',
                ],
                // 前端模块依赖
                srcdeps: {
                    /*'a2': ['a1'],
                    'a3': ['a2'],
                    'a4': ['a3'],
                    'a5': ['a1', 'a3'],
                    'a6': ['a2', 'a4', 'a5'],*/
                },
                /**
                 * 文件加载编译器
                 * htm js css 是内定义的标准文件后缀
                 *
                loader: [
                    ['css', less2css, 'less', 'lss' ], // less
                    ['css', compress, 'css'], // 输入和输出文件一致， 可以用来压缩文件

                    ['js', less2css, 'es6js' ], // es6 到 js 编译
                    ['es6js', less2css, 'ts' ], // TypeScript 到 es6 编译  【可以链式编译生成】

                    ['js', compress, 'js'], // 输入和输出文件一致， 可以用来压缩文件
                    ['htm', compress, 'htm'], // 输入和输出文件一致， 可以用来压缩文件
                ],*/
                // 模板引擎
                // tplengine: tppl, // 协议接口
                // 预备的模板
                preload:{
                    tpl: {
                        'list': '',
                    }
                },
                // 静态css,js,tpl替换变量
                replace: {
                    _prefix: '<%', // 默认的前缀
                    _suffix: '%>', // 默认的后缀
                    'static': '',
                },
                // 预备模板数据
                data: {
                    website:{
                        name: '悠农严选',
                    },
                    home_url: 'http://www.ynyxr.com',
                },
                // 动态请求获取数据
                request: [
                    ['some_data_1', RootViewer.getSomeTplData ], // 有名称，有返回值 next(err, data)
                    ['some_data_2', RootViewer.getSomeTplData, 'some_data_1' ], // 有名称，有返回值 next(err, data) 依赖 some_data_1
                    ['', RootViewer.getSomeTplData, 'some_data_2', 'some_data_1' ], // 匿名
                ]
            }
        }


        //////////////////////////////////


        // 获取数据
        static async getSomeTplData (next, data, name) {

            let txt = 'abc' + name + '123'
            next( txt);
        }







    }



    // 返回根页面
    return RootViewer;

}








/**
 * 文件加载编译器格式示例
 */
function less2css(lesstext, callback)
{
    let err = null;
    let csstext = lesstext + '\n';
    // 返回
    callback(err, csstext);
}


/**
 * 压缩
 */
function compress (str, callback) {
    callback(null, csstext);
}


// 模板引擎，可返回编译缓存
function tppl(tplstr, data=null)
{
    function render(data){
        return tplstr
    }

    return data===null ? render : render(data)

}