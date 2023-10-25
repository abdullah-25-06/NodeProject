const asyncHandler = require("express-async-handler");
const Task = require("../model/task");
const CustomErrorApi = require("../error/error");

const get_Task = asyncHandler(async (req, res) => {
  // console.log('here')
  const task = await Task.find({ owner: req.user.id });
  //   await task.populate('owner').execPopulate()
  //   console.log(task.owner)
  //   console.log('here')
  return res.status(200).json(task);
});
const post_Task = asyncHandler(async (req, res) => {
  const { description } = req.body;

  if (!description) {
    throw new CustomErrorApi("Please provide a description", 401);
  }

  const task = await Task.create({ ...req.body, owner: req.user.id });

  if (!task) {
    throw new CustomErrorApi("Task not created", 401);
  }

  return res.status(201).json(task);
});
const update_Task = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    throw new CustomErrorApi("Please Enter a task", 400);
  }
  const task = await Task.findByIdAndUpdate(
    { _id },
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new CustomErrorApi("Update a valid task", 400);
  }
  return res.status(200).json(task);
});
const get_Taskid = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    throw new CustomErrorApi("Please Enter a task", 400);
  }
console.log(req.user)
  const task = await Task.findById({ _id  });
  
  if (!task) {
    throw new CustomErrorApi("Enter a valid id", 400);
  }

  return res.status(200).json(task);
});
const delete_Task = asyncHandler(async (req, res) => {
    
    const { _id } = req.body;
    

  if (!_id) {
    throw new CustomErrorApi("Please Enter a task", 400);
  }

  
  const count = await Task.deleteOne({ _id,owner:req.user.id });
  

  if (!count) {
    throw new CustomErrorApi("Enter a valid id", 400);
  }

  console.log("here");
  return res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = {
  get_Task,
  post_Task,
  get_Taskid,
  update_Task,
  delete_Task,
};
