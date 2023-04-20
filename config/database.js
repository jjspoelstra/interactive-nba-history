const mongoose = require('mongoose')

const connectDB = async (year) => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING_2008_2022, {
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

module.exports = connectDB