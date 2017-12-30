const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => console.log(result));

// Todo.findOneAndRemove()

Todo.findByIdAndRemove('5a481750d41e3a375c5c68e1').then(todo => {
    console.log(todo);
}, e => console.log(e));