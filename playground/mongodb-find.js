// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) console.log('Unable to connect to MongoDB server.');

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    db.collection('Users').find({ name: 'Andrew' }).toArray().then(docs => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, err => console.log('Unable to fetch todos', err));


    client.close();
});