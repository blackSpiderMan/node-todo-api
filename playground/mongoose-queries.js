const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '55a38882b709ba51c7c969cf2';
var id = '5a375d8afc3821278c4d4c13';

if (!ObjectID.isValid(id)) {
    console.log(`ID not valid`);
}

User.findById(id).then(result => {
        if (!result) {
            return console.log('No results for ID', id);
        }

        console.log('These are the results: ', result);
    })
    .catch(e => console.log('Got error,', e));


// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if (!todo) {
//         return console.log(`ID: ${id} not found`);
//     }
//     console.log('Found One', todo);
// });

// Todo.findById(id).then(console.log).catch(console.log);