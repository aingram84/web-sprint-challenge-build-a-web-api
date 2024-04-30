const express = require('express');
const server = express();

const cors = require('cors');
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());
server.use(cors());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);
server.use('/', (req, res) => {
    res.status(200).json({
        message: "Hello world!"
    })
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: `${err.message}`
    })
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
