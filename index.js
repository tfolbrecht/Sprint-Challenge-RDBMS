const knex = require('knex');
const db_config = require('./knexfile');
const db = knex(db_config.development);
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())


function logger(req, res, next) {
  console.log(`${req.method} to ${req.url}`)
  next()
}

server.use(logger)

server.get("/", (req, res) => {
  res.send("Server Running")
})

// Projects 
// get projects
server.get("/api/projects", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: `Something went wrong.`
      })
    })
})

// get project ID
server.get("/api/projects/:id", (req, res) => {
  const {
    id
  } = req.params

  db("projects")
    .where("id", id)
    .then(project => {
      if (!project.length) {
        res.status(404).json({
          error: `Could not find project with ID ${id}`
        })
      }
      db("actions")
        .where("project_id", id)
        .then(actions => {
          project[0].actions = actions
          res.status(200).json(project)
        })
        .catch(err => {
          console.log(err)
          res
            .status(500)
            .json({
              error: `An error occured retrieving project ${id}.`
            })
        })
    })
})

// add project
server.post("/api/projects", (req, res) => {
  const project = req.body
  if (!project.Name) {
    res.status(400).json({
      error: `Project should have a name.`
    })
  }

  db.insert(project)
    .into("projects")
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: `Oops something went wrong.`
      })
    })
})

// edit project
server.put("/api/projects/:id", (req, res) => {
  const {
    id
  } = req.params
  const changes = req.body
  if (!changes.name) {
    res.status(400).json({
      error: `Project should have a name.`
    })
  }

  db("projects")
    .where({
      id
    })
    .update(changes)
    .then(reply => {
      if (!reply || reply.length < 1) {
        res.status(404).json({
          error: `No project found with the ID ${id}.`
        })
      } else {
        res.status(200).json(reply)
        
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: `Oops something went wrong.`
      })
    })
})

// delete project and actions
server.delete("/api/projects/:id", (req, res) => {
  const {
    id
  } = req.params
  const project_id = {
    project_id: id
  }

  db("projects")
    .where({
      id
    })
    .del()
    .then(reply => {
      if (!reply || reply.length < 1) {
        res.status(404).json({
          error: `Project ${id} not found.`
        })
      }

      db("actions")
        .where(project_id)
        .del()
        .then(reply => {
          if (!reply || reply.length < 1) {
            res.status(404).json({
              error: `Not found.`
            })
          }
          res.status(200).json({
            message: `Deleted project ${project_id.project_id} and its actions.`
          })
        })
        .catch(err => {
          res.status(500).json({
            err
          })
        })
    })

    .catch(err => {
      console.log(err)
      res.status(500).json({
        err
      })
    })
})

/** Actions */
// get all actions
server.get("/api/actions", (req, res) => {
  db("actions")
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: `Something went wrong.`
      })
    })
})
// get action by id
server.get("/api/actions/:id", (req, res) => {
  const {
    id
  } = req.params

  db("actions")
    .where("id", id)
    .then(action => {
      if (!action.length) {
        res.status(404).json({
          error: `No action found for ID ${id}.`
        })
      }
      res.status(200).json(action[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: `Something went wrong.`
      })
    })
})
// add new action
server.post("/api/actions", (req, res) => {
  const action = req.body
  if (!action.project_id) {
    res.status(400).json({
      error: `Action must have a project ID.`
    })
  }

  db.insert(action)
    .into("actions")
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: `Something went wrong.`
      })
    })
})

// edit action
server.put("/api/actions/:id", (req, res) => {
  const {
    id
  } = req.params
  const changes = req.body
  if (!changes.name) {
    res.status(400).json({
      error: `Actions must have a name.`
    })
  }

  db("actions")
    .where({
      id
    })
    .update(changes)
    .then(reply => {
      if (!reply || reply.length < 1) {
        res.status(404).json({
          error: `No action found with that ID ${id}.`
        })
      } else {
        res.status(200).json(reply)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: `Something went wrong.`
      })
    })
})

// delete actions
server.delete("/api/actions/:id", (req, res) => {
  const {
    id
  } = req.params

  db("actions")
    .where({
      id
    })
    .del()
    .then(reply => {
      if (!reply || reply.length < 1) {
        res.status(404).json({
          error: `No action with ID ${id} found.`
        })
      } else {
        res.status(200).json(reply)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: `Something went wrong.`
      })
    })
})



const PORT = 8888
server.listen(PORT, function () {
  console.log(`\Listening on http://localhost:${PORT}  \n`)
})