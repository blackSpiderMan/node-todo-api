// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) console.log('Unable to connect to MongoDB server.');

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    var newEntry = {};

    db.collection('Users').insertOne({ name: 'Megan', age: 30, location: 'Tujunga, CA' })
        .then(v => {
            newEntry.id = v.insertedId;
            console.log(newEntry);
            debugger;
            db.collection('Users').findOneAndUpdate({ _id: v.insertedId }, {
                    $set: { name: 'Mike', location: 'Sylmar, CA' },
                    $inc: { age: 3 }
                }, { returnOriginal: false })
                .then(data => console.log(JSON.stringify(data, undefined, 2))).catch(err => console.log('nested error', err));


        })
        .then(r => client.close())
        .catch(err => console.log('Got error: ', err));


    // db.collection('Todos').findOneAndUpdate({
    //         _id: new ObjectID('5a308622087b3d1df8e970aa')
    //     }, { $set: { completed: true } }, { returnOriginal: false })
    //     .then(updatedObj => console.log(JSON.stringify(updatedObj, undefined, 2)));




});