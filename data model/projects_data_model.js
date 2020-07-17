const db = require("../data/config")

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject
}

function getProjects() {
    return db("projects")
}

function getProjectById(project_id) {
    return db("projects")
    .where({"projects.id": project_id})
    .first()
}

function addProject(project) {
    const { name, description } = project
    return db("projects")
    .insert({ name, description })
    .then((ids) => {
        return getProjectById(ids[0])
    })
}

function updateProject(changes, id) {
    return db("projects")
    .where({ id })
    .update(changes)
}

function deleteProject(id) {
    return db("projects")
    .where("id", (id))
    .del()
}