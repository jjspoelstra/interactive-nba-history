const GetBracket  = require('../models/getBrackets');

module.exports = {
  getBracket: async (req, res) => {
    const { year } = req.params
    try {
        const teamData = await GetBracket.GetTeamStats(year)
        const realTeamData = await teamData.find().exec()
        //console.log(realTeamData)
        const playoffData = GetBracket.GetPlayoffStats(year)
    //   const teamData = await teamModel.find();
    //   const playoffData = await playoffModel.find();
      
    //   console.log(teamData, playoffData);
    //   res.render('index.ejs', { info: data, imagePath: `img${year}` }); // imagePath: `img${year}` 
    } catch (err) {
      console.log(err);
    }
  },
};