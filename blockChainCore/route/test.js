module.exports = (app, router) => {


    ////////////////// one way to set router //////////////////


    // get or post
    router.get("/"   , app.control.test.hello)



    ////////////////// other way  //////////////////


    /*
    // new a router of 
    const other_router = new app.Router();

    other_router
        // use a or number of middleware
        .middleware( app.middleware.test.test, app.middleware.test.test ) 
        .get("/api",    app.control.test.hello2)
        // can use a or number of middleware too!
        .get("/some/:thing",  app.middleware.test.test,  app.control.test.hello3) 
        // post request
        .post("/post",    app.control.test.post)


    // you can return one or a number of router by new
    return [ other_router ]

    */
    
}