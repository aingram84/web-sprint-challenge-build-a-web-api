// add middlewares here related to projects
const Project = require('./projects-model');

async function checkProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if (project) {
            req.project = project
            next()
        }else {
            next({
                status: 404,
                message: "Project could not be retrieved"
            })
        }
    }catch (error) {
        next({message: "error getting project"})
    }
}

module.exports = {checkProjectId};