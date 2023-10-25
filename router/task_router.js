const { Router } = require("express");
const Auth = require('../middleware/checkAuth')
const { get_Task,get_Taskid,delete_Task,post_Task,update_Task } = require("../controller/task_controller");
const task_router = Router();

task_router.route("/").get(Auth,get_Task).post(Auth,post_Task);
task_router.route("/:id").get(Auth,get_Taskid).patch(Auth,update_Task).delete(Auth,delete_Task);

module.exports = task_router;
