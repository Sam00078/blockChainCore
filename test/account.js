/**
 * 账号相关 测试
 */



module.exports = async app => {

    const account = app.core.bcc.account

    // 创建账户
    for(let idx=1; idx<1; idx++){
        let numstr = idx+''
        if(idx<10) numstr = '000'+idx
        else if(idx<100) numstr = '00'+idx
        else if(idx<1000) numstr = '0'+idx
        let pass = '---- '+numstr
        // LOG(pass)
        let attr = await account.createByPassword(pass)
        LOG(numstr+':', attr.publicKey.toString('hex'), attr.address)
    }


    let acc = await account.createByPassword('correct horse battery staple')
    // LOG(acc)

    EQUAL(acc.secret, 'correct horse battery staple')
    EQUAL(acc.privateKey.toString('hex'), 'c4bbcb1fbec99d65bf59d85c8cb62ee2db963f0fe106f483d9afa73bd4e39a8a' )
    EQUAL(acc.publicKey.toString('hex'),  '0378d430274f8c5ec1321338151e9f27f4c676a008bdf8638d07c0b6be9ab35c71' )
    EQUAL(acc.address, '1C7zdTfnkzmr13HfA2vNm5SJYRK6nEKyq8')
    // LOG(acc.address.length)

    // LOG( Buffer.from( '0378d430274f8c5ec1321338151e9f27f4c676a008bdf8638d07c0b6be9ab35c71' , 'hex' ).length ) // 33

    // 检查账户地址

    let success = await account.verifyAddressValid('1C7zdTfnkzmr13HfA2vNm5SJYRK6nEKyq8')
    let fail1 =   await account.verifyAddressValid('1CAzdTfnkzmr13HfA2vNm5SJYRK6nEKyq8')
    let fail2 =   await account.verifyAddressValid('1C7zdTfnkzmr13HfA2vNm5SJYRK6nEKyq9')
    let fail3 =   await account.verifyAddressValid('7SeEnXWPaCCALbVrTnszCVGfRU8cGfx')
    let fail4 =   await account.verifyAddressValid('1C7zdTfnkzmr13HfA2vNm5SJYRK6nEKyq8111')

    EQUAL(success, true)
    EQUAL(fail1,   false)
    EQUAL(fail2,   false)
    EQUAL(fail3,   false)
    EQUAL(fail4,   false)




    // 全部完成
    return 'all succeed'

}
