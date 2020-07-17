const express = require("express")
const Users = require("./users-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const user = await Users.findById(req.params.id)
		if(!user){
			return res.status(404).json({
				mesage: "User was not found"
			})
		}
		res.json(user)
	} catch(err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const user  = await Users.create(req.body)
		res.status(201).json(user)
	} catch(err) {
		next(err)
	}
})


router.delete("/:id", (req, res, next) => {
    Users.remove(req.params.id)
    .then((user) => {
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({
                message: "this user does not exist"
            })
        }
    })
    .catch((err) => {
        next(err)
    })
})

router.put("/:id", async (req, res, next) => {
    try{
        const user = await Users.update(req.params.id, req.body)
        if(!user){
			return res.status(404).json({
				mesage: "User was not found"
			})
		}
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
})

module.exports = router