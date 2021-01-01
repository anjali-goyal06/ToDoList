
const{ ensureAuthenticated} = require('../config/auth')
const ToDo = require('../models/toDo')

const express = require('express')
 const router = express.Router()


router.get('/',ensureAuthenticated , async (req,res)=>{
    const user = req.user;
    console.log(user)
    let items = await ToDo.find({owner : user._id});
    res.render('toDoList' , {newListItems : items });
 });
 

 router.post('/', ensureAuthenticated , async (req,res)=>{
    const user = req.user;
    let text = req.body.text;
    console.log(text)

    if(text !=undefined){
        console.log("tesxt is there + "+text)
        const todo = new ToDo({
            text,
            owner : req.user._id    
        })
        
        try{
            await todo.save()
            console.log(todo)
        }catch(err){
            console.log("faileedd")
            res.status(400,err)
        }
    
        
    }else{
        let text = req.body.complete;
        console.log("checkkkkkkkkkkkkk = "+text)
        let task = await ToDo.findOne({owner : user._id , text : text});
        task.isCompleted = "true";
        await task.save();
        console.log(task);
    }
    
        let items = await ToDo.find({owner : user._id});
        res.render('toDoList' , {newListItems : items })
 });

 module.exports = router