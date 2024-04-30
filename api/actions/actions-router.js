// Write your "actions" router here!
const express = require('express');
const expressRouter = express.Router();
const middleware = require('./actions-middlware')

const Action = require('./actions-model');

expressRouter.get('/', (req, res) => {
    Action.get()
        .then(found => {
            res.json(found)
        }).catch(
            err => {
                res.status(500).json({
                    message: "The action's information could not be retrieved",
                    error: err.message
                })
            }
        )
})

expressRouter.get('/:id', middleware.checkActionsId, (req, res) => {
    Action.get(req.params.id)
        .then(action => {
            res.json(action)

        }).catch(
            err => {
                res.status(404).json({
                    message: "The action's information could not be retrieved",
                    error: err.message
                })
            }
        )
})

expressRouter.post('/', (req, res) => {
    const action = req.body;
    Action.insert(action)
        .then(createdAction => {
            res.status(201).json(createdAction)
        })
        .catch(err => {
            res.status(400).json({
                message: 'Could not create new action',
                err: err.message,
                stack: err.stack,
            })
        })
})

expressRouter.put('/:id', middleware.checkActionUpdatePayload, middleware.checkActionsId, async (req, res, next) => {
    try {
      const updated = await Action.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      next({ message: 'We ran into an error updating the project' });
    }
  });

expressRouter.delete('/:id', middleware.checkActionsId, (req, res) => {
    Action.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(err => {
            res.status(404).json({
                message: 'No action with given ID',
                err: err.message,
                stack: err.stack,
            })
        })
})

module.exports = expressRouter;