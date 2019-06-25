const express = require("express");
require("./db/mongoose");
const Task  = require("./models/task");
const {routerUsers} = require("./Routers/users");
const {routerTask} = require("./Routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(routerUsers);
app.use(routerTask);


app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
})

const jwt = require("jsonwebtoken");

let myfunction = () => {
	const token = jwt.sign({_id: 'abc123',quien:"matuzalen"}, 'TokenByUsersOfMyDatabase',{expiresIn:"7 days"});
	console.log(token);
	const data = jwt.verify(token,"TokenByUsersOfMyDatabase");
	console.log(data)
}

myfunction()
