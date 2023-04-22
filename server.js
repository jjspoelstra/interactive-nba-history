const express = require('express');
const app = express();
const connectDB = require('./config/database');
const main = require('./routes/main')
const bracketRoutes = require('./routes/brackets');
const dataRoutes = require('./routes/data');


require('dotenv').config({ path: './config/.env' });



connectDB();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', main)
app.use(`/year`, bracketRoutes);
app.use(`/getData`, dataRoutes);





app.listen(process.env.PORT, ()=>{
  console.log('Server is running, you better catch it!')
})  
