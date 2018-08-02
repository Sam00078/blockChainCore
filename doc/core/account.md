Account 账户
===

> 位置： `app.core.bcc.account`

使用示例：

```js
let myacc = await app.core.bcc.account.createByPassword( "some my secret words" )
```

<br>

#### createByPassword( String ) 

通过密码（任意字符串）创建一个账户

```js
return {
    secret: secretStr, // 密码
    privateKey: keyPair.privateKey, // Buffer
    publicKey: keyPair.publicKey, // Buffer too
    address: finres.address, // 账户地址
}
```


<br>

#### verifyAddressValid( address:String )

验证一个钱包/账户地址，是否合法可用

```js
return false || true
```




<br>

#### hashForSign( String )

为签名计算出原文的hash值

```js
return hash:Buffer
```



<br>

#### signByPrivateKey( hash:Buffer, privateKey:Buffer/privateKeyStr:String )

数据的hash值 通过私钥 生成签名

```js
return signature:Buffer
```




<br>

#### verifySignatureByPublicKey( hash:Buffer, signature:Buffer, publicKey:Buffer/publicKeyStr:String )

通过公钥 验证签名 数据的hash值

```js
return false || true
```



















