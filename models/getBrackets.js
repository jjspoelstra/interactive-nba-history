const mongoose = require('mongoose');


module.exports = {
    GetTeamStats: async (year) => {
        const db = mongoose.connection.useDb(`stats_${year}`);
      
        // Retrieve all collection names in the database
        const collectionNames = await db.db.listCollections().toArray();
        
        const collections = collectionNames.map(({name}) => name);
        collections.sort()
        // Iterate over the list of collections and retrieve the documents in each one
        let docs = []
        for (const collectionName of collections) {
          const collection = db.collection(collectionName) 
          docs.push(await collection.find({}).toArray())
        }
        return { docs, collections }
        //
      }
}      
