const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

/* GET users listing. */
//判断是否登录
// router.get('/isLogin', userController.isLogin);

router.get('/', (req,res,next) => {
  res.send('success');
});
//注册
router.post('/signUp', userController.signUp);

//登录
router.post('/signIn', userController.signIn);


module.exports = router;
