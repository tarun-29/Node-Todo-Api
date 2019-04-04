// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Mongodb Server Started')
  const db =client.db('Todos');

  //delete many
//   db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result)=>{
//       console.log(result)
//   })
  //delete one
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result)=>{
    //     console.log(result)
    // })
  //find one and delete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((res)=>{
    //     console.log(res);
    // })
  // db.close();
});
