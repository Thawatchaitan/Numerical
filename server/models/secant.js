let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    fx : {type: String ,required : true },
    x0 : {type: Number ,required : true},
    x1 : {type: Number ,required : true}
});

let secant = mongoose.model('secant',userSchema5);
module.exports = secant;