const { ObjectId } = require("mongodb");
const ToDo = require("./ToDo");

exports.getToDo = async (req,res) => {
    try {
        const todo = await ToDo.find({});
        //console.log("In load: ",books);
        const newtodo=[]
        for (var i in todo) {
            var t={}
            t = {"_id":todo[i]._id.toHexString(), "title":todo[i].title, "description":todo[i].description, "done":todo[i].done}
            newtodo.push(t)
            console.log("converted: ",newtodo)
        }
        return res.status(200).json(newtodo)
    }
    catch(err) {
        console.log("error: ", err);
        res.status(404).json({
            message: "Page load incomplete: GET Books unsuccessful"
        })
    }
};

exports.addToDo = async (req,res) => {
    console.log("Final url is ", req.originalUrl)
    var todo = new ToDo({
        title:req.body.title,
        description:req.body.description,
        done: false,
    })
    console.log("created todo: ",todo);
    try {
        console.log(todo)
        todo = await ToDo.create(todo)
        //console.log("returned: ",todo)
        res.status(200).json(todo)
    } 
    catch (err) {
        console.log("error:",err)
        res.status(409).json({
            message: "ToDo addition unsuccessful",
            error: err.message
        })
    }
}
exports.completeToDo = async (req,res) => {
    //console.log("Final url is ", req.originalUrl)
    //console.log("_id",req.params.id)
    var todo = new ToDo({
        _id:req.body._id,
        done: req.body.done,
    })
    //console.log("updation todo: ",todo);
    try {
        console.log("complete: ",todo)
        var oldtodo = await ToDo.updateOne({_id: todo._id}, {done: todo.done})
        console.log("update status: ",oldtodo)
        var newtodo= await ToDo.findOne({_id: todo._id}).exec()
        console.log("new to do: ",newtodo)
        newtodo = {"title":newtodo.title, "description":newtodo.description, "done":newtodo.done, "_id":newtodo._id.toHexString()}
        //console.log("returned: ",todo)
        res.status(200).json(newtodo)
    } 
    catch (err) {
        console.log("error:",err)
        res.status(409).json({
            message: "ToDo update unsuccessful",
            error: err.message
        })
    }
}

exports.updateToDo = async (req,res) => {
    //console.log("Final url is ", req.originalUrl)
    //console.log("_id",req.params.id)
    console.log("req body: ",req.body)
    var todo={}
    if (req.body.label=="title") {
        todo = new ToDo({
            _id:req.body._id,
            title: req.body.title,
        })
    }
    else if (req.body.label=="description") {
        todo = new ToDo({
            _id:req.body._id,
            description: req.body.description,
        })
    }
    
    //console.log("updation todo: ",todo);
    try {
        console.log("update: ",todo)
        if (req.body.label=="title") {
            var oldtodo = await ToDo.updateOne({"_id": todo._id}, {"title": todo.title})
        }
        else if (req.body.label=="description") {
            var oldtodo = await ToDo.updateOne({"_id": todo._id}, {"description": todo.description})
        }
        console.log("update status: ",oldtodo)
        var newtodo= await ToDo.findOne({_id: todo._id}).exec()
        console.log("new to do: ",newtodo)
        newtodo = {"title":newtodo.title, "description":newtodo.description, "done":newtodo.done, "_id":newtodo._id.toHexString()}
        //console.log("returned: ",todo)
        res.status(200).json(newtodo)
    } 
    catch (err) {
        console.log("error:",err)
        res.status(409).json({
            message: "ToDo update unsuccessful",
            error: err.message
        })
    }
}
