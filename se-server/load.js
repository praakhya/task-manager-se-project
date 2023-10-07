const ToDo = require("./ToDo");
exports.getToDo = async (req,res) => {
    try {
        const books = await Book.find({});
        //console.log("In load: ",books);
        return res.status(200).json(books)
    }
    catch(err) {
        console.log("error: ", err);
        res.status(404).json({
            message: "Page load incomplete: GET Books unsuccessful"
        })
    }
};

exports.addToDo = async (req,res) => {
    console.log("Final url is ", url)
    const todo = new ToDo({
        title:req.body.title,
        description:req.body.description,
        done: req.body.done,
    })
    try {
        console.log(todo)
        await ToDo.create(todo)
        res.writeHead(301, { Location: "/main" });
        return res.end();
    } 
    catch (err) {
        res.status(409).json({
            message: "ToDo addition unsuccessful",
            error: err.message
        })
    }
}