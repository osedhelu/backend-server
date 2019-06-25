const express = require("express");
const Users = require("../models/users");


const routerUsers =  new express.Router();

/////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////USERS//////////////////////////////////////////////////////
////////////////////////////////////////USERS/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

routerUsers.post("/users", async(req, resp) =>{
	const user = new Users(req.body);
	try{
		await user.save();
		resp.status(201).send(user);
	}catch(e){
		resp.status(400).send(e);
	}
});

routerUsers.post('/users/login', async (req, res) => {
    try {
        const user = await Users.findByCredentials(req.body.email, req.body.password);
       const token = await user.generateAuthToken();
       console.log(token)
        res.send({user, token});

    } catch (e) {
        res.status(400).send();
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

routerUsers.patch("/users/:id", async(req, resp)=>{
	const update = Object.keys(req.body);
	const allowedUpdate = ['name', 'email', 'password', 'age'];
	const isValidOperation = update.every((update) => allowedUpdate.includes(update));
	if(!isValidOperation){
		return resp.status(400).send({error: "Invalid Updates"});
	}
	try{
		// const user  = await Users.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators:true});
		const user = await Users.findById(req.params.id);
		update.forEach((update)=>user[update]=  req.body[update]);
		await user.save();


		if(!user){
			return resp.status(404).send();
		}
		resp.send(user);
	}catch(e){
		resp.status(400).send(e);
			}
});
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

routerUsers.get("/users", (req, resp) =>{
	Users.find({}).then((users) => {
	  resp.status(201).send(users);
	}).catch((err) => {
	  resp.status(500).send(err)
	});
});

routerUsers.delete("/users/:id", async(req, resp)=>{
	try{
		const user = await Users.findByIdAndDelete(req.params.id);
		if(!user){
		return resp.status(400).send();
		}	
		resp.send(user);	
	}catch(e){
		resp.status(500).send(e);
	}
});

routerUsers.get("/users/:id", (req, resp)=>{
	const _id = req.params.id;
	Users.findById(_id).then((user) => {
	  if(!user){
	  	return resp.status(400).send();
	  }
	  resp.send(user);
	})
	.catch((err) => {
	  resp.status(500).send(err);
	});
});
module.exports = {routerUsers};
