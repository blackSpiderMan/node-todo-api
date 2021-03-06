const request = require('supertest');
const expect = require('expect');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
    { _id: new ObjectID(), text: 'first test todo' },
    { _id: new ObjectID, text: 'second test todo', completed: true, completedAt: 333 },
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done()).catch(console.log);
});


describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Eat Tacos';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });


    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        let fakeId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${fakeId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/1234')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete specified todo by id', (done) => {
        let todoId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${todoId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(todoId).then(todo => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch(e => done(e))
            });
    });

    it('should return 404 if todo not found', (done) => {
        let todoId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${todoId + 1}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if Object id is invalid', (done) => {
        request(app)
            .delete(`/todos/1234`)
            .expect(404)
            .end(done);
    })

});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        let id = todos[0]._id.toHexString();
        let body = { text: 'Updated', completed: true };

        request(app)
            .patch(`/todos/${id}`)
            .send(body)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(body.text);
            })
            .end((err, res) => {
                if (err) return done(err);

                Todo.findById(res.body.todo._id).then(todo => {
                    expect(todo.text).toBe(body.text);
                    expect(todo.completed).toBe(true);
                    expect(typeof todo.completedAt).toBe('number');
                    done();
                }).catch(err => done(err));
            });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let id = todos[1]._id;
        let body = { completed: false };

        request(app)
            .patch(`/todos/${id.toHexString()}`)
            .send(body)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end(done);
    });
});