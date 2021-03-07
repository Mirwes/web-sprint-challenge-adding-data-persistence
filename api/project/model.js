// build your `Project` model here
const dbConfig = require("../../data/dbConfig");

function getProjects(){
  return dbConfig('projects')
    .select('*')
}
function getProjectById(id){
  return dbConfig('projects')
    .where({project_id: id})
    .first();
}
function addProject(project){
  return dbConfig('projects')
    .insert(project)
    .then(ids => {
      return getProjectById(ids[0])
    });
}


module.exports = {
  getProjects,
  getProjectById,
  addProject
}