var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: { type: String, required: true, minlength: 4, trim: true },
    completed: { type: Boolean, required: true, default: false },
    completedAt: { type: Number, default: null }
});

module.exports = { Todo };