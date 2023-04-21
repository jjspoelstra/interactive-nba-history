const mongoose = require('mongoose');


module.exports = {
    GetTeamStats: async (year, stats) => {
        const db = mongoose.connection.useDb(`stats_${year}`);

        const collection = db.collection(stats).find({}).toArray() 
        return collection
        }
}      
