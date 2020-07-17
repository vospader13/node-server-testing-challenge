const db = require("../data/config")

async function create(data) {
	const [id] = await db("users").insert(data)
	return findById(id)
}

async function update(id, data) {
    return db("users")
    .where({id})
    .update(data)
}

function remove(id) {
    return db("users")
    .where('id', id)
    .del()
}

function find() {
	return db("users")
}

function findById(id) {
	return db("users")
	.where("id", id)
	.first()
}

module.exports = {
	create,
	update,
	remove,
	find,
	findById,
}