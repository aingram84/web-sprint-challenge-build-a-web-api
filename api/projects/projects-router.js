// Write your "projects" router here!
const express = require('express');
const expressRouter = express.Router();
const middleware = require('./projects-middleware')
const Project = require('./projects-model');

expressRouter.get('/', (req, res, next) => {
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

expressRouter.get('/:id', middleware.checkProjectId, (req, res) => {
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

expressRouter.put('/:id', middleware.checkProjectUpdatePayload, middleware.checkProjectId, (req, res, next) => {
    Project.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      next({
        message: 'We ran into an error updating the project',
      });
    });
});

expressRouter.delete('/:id', middleware.checkProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            res.status(404).json({
                message: 'No project with given ID',
                err: err.message,
                stack: err.stack,
            })
        })
})

expressRouter.get('/:id/actions', middleware.checkProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);

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