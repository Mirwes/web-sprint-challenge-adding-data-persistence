// build your `Task` model here
const dbConfig = require("../../data/dbConfig");

function getTasks(){
  return dbConfig('tasks')
    .select('tasks.task_id', 'tasks.task_description', 'tasks.task_notes', 'tasks.task_completed', 'projects.project_name', 'projects.project_description')
    .leftJoin('projects', 'tasks.project_id', 'projects.project_id')
}
function getTaskById(id){
  return dbConfig('tasks')
    .where({task_id: id})
}
function addTask(task){
  return dbConfig('tasks')
    .insert(task)
    .then(ids => {
      return getTaskById(ids[0])
    });
}


module.exports = {
  getTasks,
  getTaskById,
  addTask
}