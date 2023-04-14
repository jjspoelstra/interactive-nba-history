const express = require('express');

const MongoClient = require('mongodb').MongoClient
const app = express();

const PORT = 4000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const dotenv = require('dotenv');

let dbConnectionStr = `mongodb+srv://jjspoelstra:Sejuani@nbastats.vfevppo.mongodb.net/?retryWrites=true&w=majority`




MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then((client) => {
    console.log(`Connected to stats Database`);

    app.get('/', (req, res) => {
      res.redirect('/2022');
    });

    const createYearRoute = (year) => {
      app.get(`/${year}`, async (req, res) => {
        const db = client.db(`stats_${year}`);

        try {
          const collectionNames = await db.listCollections().toArray();
          const dataPromises = collectionNames.map(({ name }) =>
            db.collection(name).find().toArray().then((items) => ({
              collectionName: name,
              data: items,
              pageYear: year,
            }))
          );
          const data = await Promise.all(dataPromises);

          // Render data using EJS template
          res.render('index.ejs', { info: data });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error retrieving data from database');
        }
      });

      app.get('/getData/:stats', async (req, res) => {
        const db = client.db(`stats_${year}`);
        const stats = req.params.stats;
        const data = await db.collection(stats).find().toArray();
        res.json(data);
      });
    };

    for (let year = 2015; year <= 2022; year++) {
      createYearRoute(year);
    }
  })
  .catch((error) => console.error(error));

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});