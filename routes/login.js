var express = require('express');
var router = express.Router();
const https = require('https');
const jwt = require('jsonwebtoken')
var connection=require("../public/javascripts/conn");

/* GET users listing. */
router.post('/', function(req, res, next) {
    https.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wx6e1dde5458dd771c&secret=348457e4eacc83acad2c50c9da0fc2fb&js_code=${req.body.code}&grant_type=authorization_code`, (resp) => {
        let data ='';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            // console.log(JSON.parse(data).explanation);
            data=JSON.parse(data)
            let session_key=data.session_key
            let openid=data.openid

            // Token 数据
    /*         const header={            
                "alg": "HS256", 
                "typ": "JWT"
            } */
            const payload = {
                "iss": "liyao",
                // "exp": 1438955445,
                session_key: session_key,
                openid: openid
            }
    
            // 密钥
            const secret = 'liyao123456'
            // 签发 Token
            let token = jwt.sign(payload, secret, { expiresIn: '1day' })
            //连接数据库，把数据写入数据库
            let sqlStr="insert into users(sessionKey,openId,token) values(?,?,?)"; //占位符
            let sqlParams=[session_key,openid,token]; //参数数组
            //执行sql语句
            connection.query(sqlStr,sqlParams, function (error, results) {
                if (error) throw error; //出错对象
                //4. 返回处理的结果到前端
                /*
                mysql模块执行成功的对象信息
                {
                "fieldCount":0,
                "affectedRows":1, 返回受影响的行数，如果大于0就表示成功
                "insertId":1,
                "serverStatus":2,
                "warningCount":0,
                "message":"",
                "protocol41":true,
                "changedRows":0
                }
                */
                //根据执行sql语句的结果返回json给前端
                if(results.affectedRows>0){
                res.send({"isOk":true,'token':token});
                }
                else{
                res.send({"isOk":false});
                }
            })           
        });
        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
  })

module.exports = router;
