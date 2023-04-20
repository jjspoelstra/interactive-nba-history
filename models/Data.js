const mongoose = require('mongoose');



const teamSchema = new mongoose.Schema({
    conference: String,
    record: String,
    seed: String
});


module.exports = mongoose.model('GetData', teamSchema);
