const {ObjectId} = require('mongodb')
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

var id = '5ca717d24359f8067e20c58c';

if(!ObjectId.isValid(id)){
    console.log("Id not valid");
}

Todo.find({
    _id: id
}).then((todos)=>{
    console.log('Todos', todos)
});

Todo.findOne({
    _id: id
}).then((todo)=>{
    console.log(todo)
})

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('ID NOT FOUND')
    }
    console.log("TODO by id",todo);
}).catch((e)=>{
    console.log(e)
})