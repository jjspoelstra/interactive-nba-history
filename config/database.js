const mongoose = require('mongoose')

const connectDB = async (year) => {
  //if (year >= 2007){
    try {
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
  // } else if (year >= 1991){
  //   try {
  //     const conn = await mongoose.connect(process.env.DB_STRING_1991_2006, {
  //       dbName: `stats_${year}`,
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
        
  //     })
  
  //     console.log(`MongoDB Connected: ${conn.connection.host}`)
  //   } catch (err) {
  //     console.error(err)
  //     process.exit(1)
  //   }
  // }
 
}

module.exports = connectDB