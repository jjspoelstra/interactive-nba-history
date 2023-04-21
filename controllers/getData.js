const Stats = require('../models/Data')

module.exports = {
    findData: async (req,res)=>{
        const { year, stats } =  req.params
        try{
            const data = await Stats.GetTeamStats(year, stats)
            res.json(data)
        }catch(err){
            console.log(err)
        }
    },
}