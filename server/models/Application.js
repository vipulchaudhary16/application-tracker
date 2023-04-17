const mongoose = require('mongoose');

const application = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    company: {
        type:String,
        required: true
    },
    role: {
        type:String,
        required: true
    },
    status: {
        type:String,
        required: true
    },
    remark : {
        type:String,
    },
    url: {
        type:String,
    },
    resume: {
        type:String,
    },
    cv: {
        type:String,
    },
});

module.exports = mongoose.model("application", application);