const express = require("express");
const app = express();
const Todo = require("./model/todo")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));


app.set("view engine","ejs");

require("./server/mongoose")

app.get("/",async (req,res)=>{
    await Todo.find({},(err,task)=>{
        res.render("todo",{todoTasks:task});
    })
})

app.post("/", async (req,res)=>{
    const todoTask = new Todo({content: req.body.content});
        try {
        await todoTask.save();
        res.redirect("/");
        } catch (err) {
        res.redirect("/");
        }
})

//UPDATE
app.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    Todo.find({}, (err, tasks) => {
    res.render("todo_edit", { todoTasks: tasks, idTask: id });
});
}).post((req, res) => {
    const id = req.params.id;
    Todo.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    Todo.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
});


app.listen(3000,()=>{
    console.log("local host running on port 3000")
})