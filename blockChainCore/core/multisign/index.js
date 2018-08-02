/**
 * 签名
 */



module.exports = app => {


    class Multisign 
    {
        constructor () {

            this.bus = new app.okgo.MessageBus() // 消息系统
            this.amt = new app.okgo.FlowMount() // 挂载系统

            this.publicKeyScriptTypes = {

                'NORMAL': 0, // 普通正常单签名公钥

                'TRIPLE_2_0': 1,   // 1/2 签名 A
                'TRIPLE_2_1': 2,   // 1/2 签名 B

                'TRIPLE_2_01': 3,     // 2/2 签名 AB
                'TRIPLE_2_10': 4,     // 2/2 签名 BA

                'TRIPLE_3_0': 5,  // 1/3 签名 A
                'TRIPLE_3_1': 6,  // 1/3 签名 B
                'TRIPLE_3_2': 7,  // 1/3 签名 C

                'TRIPLE_3_01': 8,     // 2/3 签名 AB
                'TRIPLE_3_02': 9,     // 2/3 签名 AC
                'TRIPLE_3_10': 10,    // 2/3 签名 BA
                'TRIPLE_3_12': 11,    // 2/3 签名 BC
                'TRIPLE_3_20': 12,    // 2/3 签名 CA
                'TRIPLE_3_21': 13,    // 2/3 签名 CB

                'TRIPLE_3_012': 14,     // 3/3 签名 ABC
                'TRIPLE_3_021': 15,     // 3/3 签名 ACB
                'TRIPLE_3_102': 16,     // 3/3 签名 BAC
                'TRIPLE_3_120': 17,     // 3/3 签名 BCA
                'TRIPLE_3_201': 18,     // 3/3 签名 CAB
                'TRIPLE_3_210': 19,     // 3/3 签名 CBA

                'MULTIPLE': 20,   // 多签名

            }

        }

    }



    // 注册核心
    app.core.bcc.multisign = new Multisign()


    //////////////////// 加载相关核心 ////////////////////


    app.core.bcc.help.loadingCoreModels('multisign', [
        'triple',
        'pair',
        'multiple'
    ])


}

