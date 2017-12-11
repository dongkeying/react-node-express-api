const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/reactApi';

const options = {
    useMongoClient : true
}

//数据库连接
mongoose.connect(uri,options)
    .then((db) => {
        console.log('数据库连接成功');
    })
    .catch((err) => {
        console.log('数据库连接失败,原因是'+err);
    })

module.exports = mongoose;