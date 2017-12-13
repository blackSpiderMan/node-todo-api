// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) console.log('Unable to connect to MongoDB server.');

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Users').deleteMany({ name: 'Andrew' }).then(result => {
    //     console.log(result.result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({ text: 'Food' }).then(console.log);

    // findOneAndDelete
    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5a30887264b66b11f4299807') }).then(result => console.log(result.value));

    // client.close();
});