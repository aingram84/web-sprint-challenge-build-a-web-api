// add middlewares here related to actions
const Action = require('./actions-model');

async function checkActionsId(req, res, next) {
    console.log("checkActionId happened");
    try {
        const action = await Action.get(req.params.id);
        if (action) {
            req.action = action
            console.log(`triggered: ${action.id}`);
            next()
        }else {
            console.log("404 happened");
            next({
                status: 404,
                message: "Action could not be retrieved"
            })
        }
    }catch (error) {
        next({message: "error getting action"})
    }
}

async function checkActionCreatePayload(req, res, next) {
    if (
      req.body.description && req.body.project_id && req.body.notes
    ) {
      next()
    } else {
      next({
        status: 400,
        message: 'Please provide description, notes and the id of the project',
      });
    }
  }
  
  async function checkActionUpdatePayload(req, res, next) {
    if (
      req.body.description &&
      req.body.notes &&
      req.body.project_id &&
      req.body.completed !== undefined
    ) {
      next()
    } else {
      next({
        status: 400,
        message: 'Please provide description, notes, completed and the id of the project',
      });
    }
  }

module.exports = {checkActionsId, checkActionCreatePayload, checkActionUpdatePayload};