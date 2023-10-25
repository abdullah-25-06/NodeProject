const { mongoose } = require("mongoose");

const TaskSchema = new mongoose.Schema({
  description: {
    required: true,
    type: String,
    trim: true,
  },
  completed: {
    default: false,
    type: Boolean,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    imutable:true,
    ref:'User'//modelName for referencing 
  },
});
//await task.populate('owner').execPopulate()
//task.owner ab poori owner profile hogi
module.exports = mongoose.model("Task", TaskSchema);
