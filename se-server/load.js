const ToDo = require("./ToDo");
exports.getToDo = async (req,res) => {
    try {
        const todo = await ToDo.find({});
        //console.log("In load: ",books);
        return res.status(200).json(todo)
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

exports.putToDo = async (req,res) => {
    const id = req.params.id;
    console.log("in put at server: ",req)
    try{
        await Book.updateOne( {_id: id}, req.body);
        this.getToDo(req,res);
    }
    catch (err) {
        res.status(409).json({
            message: "ToDo addition unsuccessful",
            error: err.message
        })
    }
}
