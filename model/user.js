const db = require('../utils/database');
var Schema = db.Schema;

const schema = new Schema({
    username : {
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    },
    date : {
        type : Date,
        require : true
    }
})

const User = db.model('users', schema);
module.exports = User;