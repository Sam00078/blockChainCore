/**
 * the middleware
 */


module.exports = app => {

    
    return new class{
        

        test (req, res, next) {

            // do some thing you want

            next()

        }

    
        // allow all origin to access 
        allowAllOrigin (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            next() // to next middleware or controller
        }


    }


}
