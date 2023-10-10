const express = require("express");
const multer = require('multer');
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("File destination is ", req, file, cb)
        var destination = path.join(__dirname,'uploads')
        console.log(destination)
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }
        cb(null, destination);
      },
    filename: function (req, file, cb) {
        console.log("File name is ", req, file, cb)
        cb(null, file.originalname);
    }
});
const upload = multer({ storage : storage })

const router = express.Router();
const { getToDo, addToDo, completeToDo, putToDo} = require("./load");
router.route("/load/ToDo").get(getToDo);
router.route("/load/ToDo/").post(addToDo);
router.route("/load/ToDo/complete").put(completeToDo);
router.route("/load/ToDo/update").put(putToDo);
module.exports = router;