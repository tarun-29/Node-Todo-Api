const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');
//this will wipe all the database before testing

const todos = [{
  text: 'First test todo'
},{
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