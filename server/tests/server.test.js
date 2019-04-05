const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('../server');
const {Todo} = require('../models/todo');
//this will wipe all the database before testing

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: 'Second text todo'
}]

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done())
})

describe('POST /todos',()=>{
  it('should create a new Todo',(done)=>{
    var text = 'Test Todo Text'

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text)
    })
    .end((err,res)=>{
      if(err){
        done(err);
      }
      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>{
        done(e);
      });
    });
  });
  it('Should not create with invalid body data',(done)=>{
    var text =  ''

    request(app)
    .post('/todos')
    .send({text})
    .expect(400)
    // .expect((res)=>{
    //   // expect(res.body.text).toBe(text)
    // })
    .end((err,res)=>{
      if(err){
        done(err)
    }
    })
      
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>{
        done(e);
      })
  })
});

describe('GET/todos',()=>{
  it('Should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done)
  });
})

describe('GET/todos/:id',()=>{
  it("should return todo doc",(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done)
  });

  it('Should return 404 if no todo found',(done)=>{
    var Hexid = new ObjectID().toHexString;

    request(app)
    .get(`/todos/${Hexid}`)
    .expect(404)
    .end(done)
  })

  it('Should return 404 if the todo id is invalid',(done)=>{
    
    request(app)
    .get('/todos/12ad123')
    .expect(404)
    .end(done)
  })
  
})