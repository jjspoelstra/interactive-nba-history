const mongoose = require('mongoose');


module.exports = {
    GetTeamStats: async (year) => {
        const db = mongoose.connection.useDb(`stats_${year}`);
        const teamSchema = new mongoose.Schema({
            conference: String,
            record: String,
            seed: String,
        });
        const TeamData = await db.model('TeamData', teamSchema).find();
        console.log(TeamData)
    },

    GetPlayoffStats: async (year) => {
        const db = mongoose.connection.useDb(`stats_${year}`);
  
        const playoffSchema = new mongoose.Schema({
            round: String,
            team1: String,
            team2: String,
            team1Wins: String,
            team2Wins: String,
            gameScores: [Array],
        });
        const PlayoffData = db.model('PlayoffData', playoffSchema)
        //console.log(db.model('PlayoffData', playoffSchema))
    }
}