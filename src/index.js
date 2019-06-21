const express = require("express");
require("./db/mongoose");
const Task  = require("./models/task");
const {routerUsers} = require("./Routers/users")
const {routerTask} = require("./Routers/task")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routerUsers);
app.use(routerTask);


app.listen(port,()=>{
	console.log(`Server is up on port ${port}`)
})