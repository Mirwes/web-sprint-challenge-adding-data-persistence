// build your `/api/projects` router here
const express = require('express')
const Projects = require('./model.js')

const router = express.Router()

router.get('/', (req, res) => {
  Projects.getProjects()
    .then(projects => {
      projects.forEach(project => {
        project.project_completed === 1 ? project.project_completed = true : project.project_completed = false;
      });
      res.json(projects)
    })
})

router.post('/', (req,res) => {
  if(!req.body.project_name)
    res.status(400).send({Message : 'Missing project_name'})
  else{
    Projects.addProject(req.body)
      .then(project => {
        res.send({...project, project_completed: project.project_completed === 1 ? true : false});
      })
  }
  
});

module.exports = router;