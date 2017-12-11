const User = require('../model/user');
const bcrypt = require('bcrypt');

//注册
function signUp(req,res,next) {
    const {username,password,message} = req.body;
    //存入数据库
    //查询用户名是否已经注册
    User.findOne({username})
        .then((repeat) => {
            if (repeat){ // 用户名重复
                res.json({
                    success : false
                })
            }else{
                //准备存储
                bcrypt.hash(password,10)
                    .then((pass) => {
                        const willSaveUser = new User({
                            username,
                            password : pass,
                            date : new Date().getTime()
                        })
                        willSaveUser.save()
                            .then((result)=> {
                                res.json({
                                    success : true,
                                    username
                                })
                            })
                            .catch((err) => {
                                console.log('注册失败');
                                res.json({
                                    success: false
                                })
                            })

                    })
                    .catch((err) => {
                        console.log('注册密码加密失败,err' + err);
                        res.json({
                            success : false
                        })
                    })
            }
        })
}

//登录
function signIn(req, res, next) {
    const { username, password } = req.body;
    //查找数据库,验证用户名密码是否匹配
    User.findOne({username})
        .then((user) => {
            if(!user){
                res.json({success:false})
            }else{
                bcrypt.compare(password,user.password)
                    .then((result) => {  //返回布尔值
                        if(result){  // 密码 匹配成功
                            res.json({
                                success : true,
                                username
                            })
                        }else{
                            res.json({success:false});
                        }
                    })
            }
        })
}

//退出登录
function isLogin(req, res, next) {
    const {username,password} = req.body;
    //查找数据库,验证用户名密码是否匹配

    console.log(username,password);
    res.send(req.body);
}

module.exports = {
    signUp,
    signIn
}