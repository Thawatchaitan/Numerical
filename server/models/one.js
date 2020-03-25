let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    x : {type: Number ,required : true}
});

let one = mongoose.model('one',userSchema5);
module.exports = one;