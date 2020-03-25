let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    x : {type: Number ,required : true}
});

let rap = mongoose.model('rap',userSchema5);
module.exports = rap;