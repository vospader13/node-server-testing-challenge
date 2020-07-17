const express = require("express")
// const cors = require("cors")

const usersRouter = require("./users/users-router")
const projectsRouter = require('./routers/projects_router');

// server.use(cors())
const server = express();
const port = process.env.PORT || 5555

server.use(express.json());
server.use('/api/projects', projectsRouter)
server.use("/users", usersRouter)


server.use("/", (req, res) => {
    res.json({message: "Welcome to our API!"})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

if(!module.parent) {
	server.listen(port, () => {
		console.log(`Running at http://localhost:${port}`)
	})
}


module.exports = server 