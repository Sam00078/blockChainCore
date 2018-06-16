module.exports = app => {


    class HtmlViewer extends app.Viewer
    {
        // 继承自（与文件名一致）
        get inherit () {
            return "root"
        }

        get config () {
            // 配置
            return {
                /*output: {
                    file: "home", // 默认与文件名一致，如有重复，会报错
                },*/
                replace: {
                    'static': '///'
                },
                src: [
                    'xxx',
                    'okgojs/log',
                    'html/html',
                ],
                // 前端模块依赖
                srcdeps: {
                    'okgojs/elmget': ['okgojs/log'],
                    'html/html': ['html/reset', 'm2'],
                },
                // css 和 js 库 分别在 html 头部和底部加上
                lib: {
                    css: ['button.min.css'], // 自动识别 http 或 /// 开头的域名， 否则加上 static url libcss 路径
                    js: ['http://cdn.bootcss.com/jquery/3.3.1/jquery.min.js'],
                },
            }
        }
        




    }



    


    // 返回页面装配
    return HtmlViewer;

}