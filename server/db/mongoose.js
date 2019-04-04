const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Todos' );

module.exports ={mongoose}

// var newTodo = new Todo({
    //     text: 'Cook Dinner'
    // })
    
    // var newTodos = new Todo({
    //     text: "Hello World"
    // })
    
    // newTodos.save().then((doc)=>{
    //     console.log("Saved Todo: ", doc)
    // },(error)=>{
    //     console.log('Unable to save Todo',error)
    // });
    
    // newTodo.save().then((doc)=>{
    //     console.log("Saved Todo: ", doc)
    // },(error)=>{
    //     console.log('Unable to save Todo')
    // });
    
    
    // var user = new User({
    //     email: 'coe17b031@iiitdm.ac.in'
    // });
    
    // user.save().then((doc)=>{
    //     console.log("Todo Saved ",doc)
    // },(error)=>{
    //     console.log('Unable to save in server ', e)
    // })
    
    //save new something