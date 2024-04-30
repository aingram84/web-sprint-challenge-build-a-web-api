// Write your "projects" router here!
const express = require('express');
const expressRouter = express.Router();

const Project = require('./projects-model');

expressRouter.get('/', (req, res) => {
    Project.get()
        .then(found => {
            res.json(found)
        }).catch(
            err => {
                res.status(500).json({
                    message: "The project's information could not be retrieved",
                    error: err.message
                })
            }
        )
})

expressRouter.get('/:id', (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            res.json(project)

        }).catch(
            err => {
                res.status(404).json({
                    message: "The project's information could not be retrieved",
                    error: err.message
                })
            }
        )
})

expressRouter.post('/', (req, res) => {
    const project = req.body;
    Project.insert(project)
        .then(createdProject => {
            res.status(201).json(createdProject)
        })
        .catch(err => {
            res.status(400).json({
                message: 'Could not create new project',
                err: err.message,
                stack: err.stack,
            })
        })
})

expressRouter.put('/:id', (req, res) => {
    const project = req.body;
    if (!project.name || !project.description || !project.completed || !project.actions) {
        res.status(400).json({
            message: "Please provide missing field"
        })
    } else {
        Project.insert(project)
            .then(createdProject => {
                res.status(201).json(createdProject)
            })
            .catch(err => {
                res.status(404).json({
                    message: 'No project with selected ID',
                    err: err.message,
                    stack: err.stack,
                })
            })
    }
})

expressRouter.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(err => {
            res.status(404).json({
                message: 'No project with given ID',
                err: err.message,
                stack: err.stack,
            })
        })
})

expressRouter.get('/:id/actions', (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            res.json(project.actions)

        }).catch(
            err => {
                res.status(404).json({
                    message: "The project's information could not be retrieved",
                    error: err.message
                })
            }
        )
})

module.exports = expressRouter;