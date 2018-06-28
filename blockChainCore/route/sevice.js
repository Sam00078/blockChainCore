module.exports = (app, router) => {


    router.basepath('/bcc/service')
        .get("/publicIp"   , app.control.networkstatus.getPublicIp)


    
}