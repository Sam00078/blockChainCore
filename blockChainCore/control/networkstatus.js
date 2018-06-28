module.exports = app => {

    class NetWorkStatusController extends app.Controller {

        getPublicIp() {

            this.ctx.body = {
                'ip': app.help.networkstatus.getClientIP( this.ctx.req )
            }

        }

    }


    return NetWorkStatusController;

}