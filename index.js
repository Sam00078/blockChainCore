/**
 * okgojs entry
 */


// local  dev  test  beta  production
global.OKGO_ENV = 'local'


// app load folder info
global.OKGO_APPLOAD = [
    { folder: 'blockChainCore', }, 
];


// start the world !
// require('okgo')( {}, app => {})
require('../okgo')( {}, app => {}) // dev test
