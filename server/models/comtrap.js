let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    lower : {type: Number ,required : true},
    upper : {type: Number ,required : true},
    n: {type: Number ,required : true}
});

let comtrap = mongoose.model('comtrap',userSchema5);
module.exports = comtrap;