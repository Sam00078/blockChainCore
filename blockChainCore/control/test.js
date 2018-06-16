module.exports = app => {

    class TestController extends app.Controller {

        hello() {
            // just render stuff
            this.ctx.body = "hello, I'm okgo !<br><br>to access example <a href=\"/page\">web page</a><br><br>or to <a href=\"/api\">/api</a>,  <a href=\"/some/12345\">/some/[id]</a>";
        }

        hello2() {

            // init/AppController extends method
            this.apidata = {
                good: 'boy',
            };

        }

        async hello3() {

            const { ctx } = this;

            // await and async
            let val = await getUrlValue( ctx );

            ctx.body = {
                "data_str": val
            };
        }

        // post test
        async post () {
            const { ctx } = this;

            // 
            let data = await ctx.postParse({'key': 'default value'})

            ctx.body = {
                "post data is": data
            };

        }

    }


    ////////////////////////


    // private function
    function getUrlValue ( ctx ) {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                resolve('the url key value is '+ctx.url.param['thing'])
            }, 250)
        })

    }



    ////////////////////////


    // return the controller class
    return TestController;
}


