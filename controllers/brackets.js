const  getData   = require('../models/getBrackets');


module.exports = {
  getBracket: async (req, res) => {
    const { year } = req.params
    try {
        console.log(year)
        const { docs: data, collections } = await getData.GetTeamStats(year)
        
        res.render('index.ejs', { info: data, teamNames: collections, imagePath: `img${year}`, pageYear: year }); // imagePath: `img${year}` 
    } catch (err) {
      console.log(err);
    }
  },
};