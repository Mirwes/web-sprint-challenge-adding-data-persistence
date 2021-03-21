// build your `/api/tasks` router here

const express = require('express');
const Tasks = require('./model');
const Projects = require('../project/model');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.getTasks()
      .then(tasks => {
        tasks.forEach(task => {
          task.task_completed === 1 ? task.task_completed = true : task.task_completed = false;
        });
        res.json(tasks)
      })
  })
  
  router.post('/', (req,res) => {
    if(!req.body.task_description || !req.body.project_id)
      res.status(400).send({Message : 'Missing task_description or project_id'})
    else{
      Projects.getProjectById(req.body.project_id)
        .then((project) => {
          if(!project)
            res.status(400).send({Message : "No project exists at given project_id"})
          else{
            Tasks.addTask(req.body)
              .then(task => {
                res.send({...task[0], task_completed: task[0].task_completed === 1 ? true : false})
              })
          }
        })
    }
  });
  
  module.exports = router;
  