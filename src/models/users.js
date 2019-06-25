const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		unique:true,
		required:true,
		trim:true
	},
	email:{
		type: String,
		unique: true,
		required: true,
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
				throw new Error('password connot contain "password"')
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

userSchema.methods.generateAuthToken = async function() {
	const user = this;

	const token = jwt.sign({ _id: user._id.toString() }, "TokenByUsersOfMyDatabase");
	console.log(token)
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await Users.findOne({ email })

	if (!user) {
		throw new Error('Unable to login')
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login')
	}

	return user
}

userSchema.pre("save", async function (next){
	const user = this;
	if(user.isModified("password")){
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});
const Users = mongoose.model('users', userSchema);

module.exports = Users;
