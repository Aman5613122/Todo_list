const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
        },
    date: {
        type: Date,
        default: Date.now
    }
})

const Todo = mongoose.model("Todo",TodoSchema,"todo_content");

module.exports = Todo;