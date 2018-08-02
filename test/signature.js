
module.exports = async app => {

    const account = app.core.bcc.account

    // let encode = 'ucs2'
    // let hh1 = await account.hashForSign( "Beijing turns to artificial intelligence for diplomatic advantage." )
    // let str1 = hh1.toString(encode)
    // LOG('<<<' + str1 + '>>>')
    // LOG(str1.length)
    // LOG(hh1.toString('hex'))
    // LOG(Buffer.from(str1, encode).toString('hex'))

    // let sourcestr = "03950954c4c5cf11ee1e1f08269efe13dc6e3af754e082b539f5ad24378118000200"
    // let sourcebuf = Buffer.from(sourcestr, 'hex')
    // let sourcecode = sourcebuf.toString(encode)
    // LOG(sourcecode)
    // LOG(sourcestr)
    // LOG(Buffer.from(sourcecode, encode).toString('hex'))


    // 签名hash

    let dataStr = 'correct horse battery staple'
    let dataHash = await account.hashForSign( dataStr )
    // LOG(dataHash.length)

    EQUAL(dataHash.toString('hex'), 'c4bbcb1fbec99d65bf59d85c8cb62ee2db963f0fe106f483d9afa73bd4e39a8a')


    let dataStrOther = 'correct horse battery staple ---- change'
    let dataHashOther = await account.hashForSign( dataStrOther )
    let dataHashThird = Buffer.from('c4bbcb1fbec99d65bf59d85c8cb62ee2db963f0fe106f483d9afa73bd4e39a8a', 'hex')


    // 签名


    let privateKey = Buffer.from('c4bbcb1fbec99d65bf59d85c8cb62ee2db963f0fe106f483d9afa73bd4e39a8a', 'hex')
    let publicKeyStr = '0378d430274f8c5ec1321338151e9f27f4c676a008bdf8638d07c0b6be9ab35c71'
    // LOG(publicKeyStr.length)
    

    let signature1 = await account.signByPrivateKey(dataHash, privateKey)
    let signature2 = await account.signByPrivateKey(dataHashOther, privateKey)
    // LOG(signature1.length)
    // LOG(signature2.toString('hex').length)
    
    EQUAL(signature1.toString('hex'), '89082f6a35e4ec15effa83bdb41d9756585098d898fe479fb580e976b595e0d57b1a89cde9e4e0daf4898abdb09e05c7ee26b057ac1125ca7fadb68a19ec8832')
    EQUAL(signature2.toString('hex'), '261ab6e78a452c70c0ec5e47fce2fe42c05f70eb164dcd54608d9d858015abbc26b996af7b1912667bd32990bf124d0a42558d318022cff429a7a9a5c5792794')


    // 验证签名


    let ver1 = await account.verifySignatureByPublicKey(dataHash,      signature1, publicKeyStr)
    let ver2 = await account.verifySignatureByPublicKey(dataHashOther, signature2, publicKeyStr)
    let ver3 = await account.verifySignatureByPublicKey(dataHash,      signature2, publicKeyStr)
    let ver4 = await account.verifySignatureByPublicKey(dataHashOther, signature1, publicKeyStr)
    
    
    EQUAL(ver1,   true)
    EQUAL(ver2,   true)
    EQUAL(ver3,   false)
    EQUAL(ver4,   false)



    /*

    // 'correct horse battery staple change'

    let signature = await account.signDataForSourceByPrivateKey(dataStr, privateKeyStr)
    let signResultOther = await account.signDataByPrivateKey(dataHashOther, privateKeyStr)
    // LOG(signResult)
    // LOG(signResult.hash.toString('hex'))

    // EQUAL(signResult.hash.toString('hex'), 'c4bbcb1fbec99d65bf59d85c8cb62ee2db963f0fe106f483d9afa73bd4e39a8a')

    // 验证签名

    let ver1 = await account.verifySignatureByPublicKey(signResult.hash,  signResult.signature, publicKeyStr)
    let ver2 = await account.verifySignatureForSourceByPublicKey(dataStr, signResult.signature, publicKeyStr)
    let ver3 = await account.verifySignatureForSourceByPublicKey(dataStr+'change', signResult.signature, publicKeyStr)
    let ver4 = await account.verifySignatureByPublicKey(dataHashOther,  signResult.signature, publicKeyStr)
    let ver5 = await account.verifySignatureByPublicKey(signResultOther, signResultOther.signature, publicKeyStr)
    
    EQUAL(ver1,   true)
    EQUAL(ver2,   true)
    EQUAL(ver3,   false)
    EQUAL(ver4,   false)
    EQUAL(ver4,   true)

    */



    // 全部完成
    return 'all succeed'



}