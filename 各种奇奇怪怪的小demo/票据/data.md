````json
{
	"msg": "详情信息获取成功!",
	"code": 200,
	"data": {
		"acceptDate": "2018-05-09”,//出票日期
		"payeeBankAccount": "15000089601092”,//出票人账号
		"issueName": "企业测试六”,//出票人-全称
		"acceptorName": "企业测试六”,
		"isCanTransfer": "10”,//能否转让
		"contractNo": null,//交易合同号
		"dueDate": "2019-02-26”,//承兑日期
                 "billState": "E_02Z”,//票据状态          编码转换相应的字段
             f (billState == "E_02Z" || billState == "E_02S") {
                return "背书已签收"
              } else if (billState == "E_03Z" || billState == "E_03S") {
                return "背书已撤回"
              } else if(billState == "E_08Z"|| billState == "E_08S"){
                return "背书待签收"
              }else if(billState == "E_26Z"|| billState == "E_26S"){
               return "背书已拒绝"
             }else {
               return ""
            }

		"issueBailAdd": null,//出票保证人地址
		"issueBailDate": null,//出票保证日期
		"billIssueDate": "2018-05-09”,//票据到期日
		"issueOpenBank": "平安银行总行营业部”,//出票人开户行
		"issueRatingBody": "企业测试六”,//出票人评级主体
		"acceptorRatingBody": "企业测试六”,//承兑人评级主体
		"type": "商票”,==========type:“商票” 电子商业承兑汇票  如果是type:“银票” 电子银行承兑汇票
		"showDate": "2018-05-09”,=============出票日期
		"payeeName": "票据测试一”,//收款人-全称
		"billAmount": 100000.020000,//票据金额  
		"acceptorBankCode": "307584008005”,//承兑人信息-开户行行号
		"acceptBailDate": null,//保证日期
		"acceptorCreditRating": null,//？？？？？？
		"billNo": "230758400800520180509100267700”,//票据号码
		"acceptorBankAccount": "15000089592102”,//承兑人账户
		"acceptBailAdd": null,//承兑保证地址

		"issueBankAccount": "15000089592102”,//出票人账户
		"billAttribute": "国股”,//不显示
		"issueBailName": null,//出票保证人名称
		"biList": [{
			"billNo": "230758400800520180509100267700”,//不显示
			"endorseType": “E”,         //背面标题 
			"endorserName": "票据测试一”,          //背书人名称
			"endorseeName": "企业测试六”,          //企业测试六
			"transferEnable": “Y”,                //能否转让 Y 可转让 N不可转让
			"endorserTm": "2018-05-09”             //背书日期
		}],
		"acceptBailName": null,//承兑保证人名称
		"issueCreditRating": null,//出票人信用等级
		"bbcmId": 621,//不显示
		"acceptorRatingDueDate": null,//?????????
		"faceAmount": 100000.0200,//票据金额 人民币大写 小写自转换
		"billAmountCh": null,//票据金额 不用这个
		"createTime": "2018-05-09 16:53:52”,//不显示
		"issueRatingDueDate": null,//评级到期日
		"acceptorBankName": "广西巨龙普济堂光学”,//承兑人开户行名称
		"billDueDate": "2019-02-26”,//汇票到期日
		"payeeOpenBank": "平安银行深圳分行营业部”/ /收款人-开户银行
	}
}
````