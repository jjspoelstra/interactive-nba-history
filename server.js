const express = require('express');
const app = express();
const connectDB = require('./config/database');
const main = require('./routes/main')
const bracketRoutes = require('./routes/brackets');
//const dataRoutes = require('./routes/data');


require('dotenv').config({ path: './config/.env' });



connectDB();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', main)
app.use(`/year`, bracketRoutes);
  //app.use(`/getData${year}/:stats`, dataRoutes);








app.listen(process.env.PORT, ()=>{
  console.log('Server is running, you better catch it!')
})  






// const MongoClient = require('mongodb').MongoClient
// let dbConnectionStr = `mongodb+srv://jjspoelstra:Sejuani@nbastats.vfevppo.mongodb.net/?retryWrites=true&w=majority`

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//   .then((client) => {
//     console.log(`Connected to stats Database`);

//     app.get('/', (req, res) => {
//       res.sendFile(__dirname + '/index.html')
//       //res.redirect('/2022')
//     });

//     const createYearRoute = (year) => {
//       app.get(`/${year}`, async (req, res) => {
//         const db = client.db(`stats_${year}`);
        
//         try {
//           const collectionNames = await db.listCollections().toArray();
//           const dataPromises = collectionNames.map(({ name }) =>
//             db.collection(name).find().toArray().then((items) => ({
//               collectionName: name,
//               data: items,
//               pageYear: year,
//             }))
//           );
//           const data = await Promise.all(dataPromises); 
//           // Render data using EJS template
//           res.render('index.ejs', { info: data, imagePath: `img${year}` });
//         } catch (error) {
//           console.error(error);
//           res.status(500).send('Error retrieving data from database');
//         }
//       });

//       app.get(`/getData${year}/:stats`, async (req, res) => {
//         const db = client.db(`stats_${year}`);
//         const stats = req.params.stats;
//         const data = await db.collection(stats).find().toArray();
//         res.json(data);
//       });


      
//     };
    

//     for (let year = 1984; year <= 2022; year++) {
//       createYearRoute(year);
//     }
//   })
//   .catch((error) => console.error(error));




