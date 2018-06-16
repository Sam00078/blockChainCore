module.exports = app => {


    class TestViewer extends app.Viewer
    {
        // 继承自（与文件名一致）
        get inherit () {
            return "html"
        }

        get config () {
            // 配置
            return {
                output: {
                    // file: "fxckkk", // 默认与文件名一致，如有重复，会报错
                },
                static: {
                    query: {
                        '_': 123
                    }
                },
                src: [
                    'xxx',
                    'body:test/index',
                    'content:test/content',
                    'content_list:test/list',
                ],
                // 前端模块依赖
                srcdeps: {
                    // 'aaa': ['m1', 'm2'],
                },
                request: [
                    ['urlv', TestViewer.getData, 'some_data_2'],
                    ['v2', TestViewer.getData, 'urlv'],
                    ['v3', TestViewer.getData, 'v2'],
                    ['v4', TestViewer.getData, 'v3'],
                    ['v5', TestViewer.getData, 'v4'],
                ],
            }
        }


        // 获取数据
        static getData (next) {

            const { ctx } = this

            //setTimeout(x=>{

                next( ctx.url.query.name || '[ not give ]' )

            //}, 100)


        }
        




    }



    


    // 返回页面装配
    return TestViewer;

}