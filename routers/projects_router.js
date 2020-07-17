const express = require("express")
const db = require("../data model/projects_data_model")

const router = express.Router()

router.get("/", (req, res) => {
    db.getProjects()
    .then(projects => {
        res.json(projects)
    })
    .catch(err =>{
        res.status(500).json({message: "Failed to get the projects!"})
    })
})

router.post("/", (req, res) => {
    db.addProject(req.body)
    .then(project => {
        res.json(project)
    })
    .catch(err =>{
        res.status(500).json({message: "Failed to create the project!"})
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params
    const changes = req.body

    db.getProjectById(id)
    .then(project => {
        if (project) {
            db.updateProject(changes, id)
            .then(updatedProject => {
                res.json(updatedProject)
            })
        } else {
            res.status(404).json({ message: 'Could not find the project with given id' });
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to create the project!"})
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params

    db.deleteProject(id)
    .then(project => {
        if(project) {
            res.json({message: "project deleted"})
        } else {
            res.status(404).json({ message: 'Could not find the project with given id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete the project' });
    })
})

module.exports = router