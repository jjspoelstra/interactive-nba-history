const mongoose = require('mongoose');


module.exports = {
    GetTeamStats: async (year) => {

        if (year < 2007){
          try {
            mongoose.disconnect()
            const conn = await mongoose.connect(process.env.DB_STRING_1991_2006, {
              dbName: `stats_${year}`,
              useNewUrlParser: true,
              useUnifiedTopology: true,
              
            })
        
            console.log(`MongoDB Connected: ${conn.connection.host}`)
          } catch (err) {
            console.error(err)
            process.exit(1)
          }
        } else {
          try {
            mongoose.disconnect()
            const conn = await mongoose.connect(process.env.DB_STRING_2007_2022, {
              dbName: `stats_${year}`,
              useNewUrlParser: true,
              useUnifiedTopology: true,
              
            })
        
            console.log(`MongoDB Connected: ${conn.connection.host}`)
          } catch (err) {
            console.error(err)
            process.exit(1)
          }
        }

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
