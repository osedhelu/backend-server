const mongoose = require("mongoose");
const validator = require("validator")

const Users = mongoose.model('users', {
	name:{
		type: String,
		required:true,
		trim:true
	},
	email:{
		type: String,
		required:true,
		trim:true,
		lowercase:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error("Email is Invalid")
			}
		}
	},
	password:{
		type:String,
		required:true,
		minlength:7,
		trim:true,
		validate(value){
			if(value.toLowerCase().includes('password')){
				throw new Error('Password connot contain "password"')
			}
		}
	},
	age:{
		defauld:0,
		type: Number,
		validate(value){
			if(value < 0){
				throw new Error("Age must be positive number");
			}
		}
	}
});

module.exports = Users;