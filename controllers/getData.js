const Stats = require('../models/Data')

module.exports = {
    findData: async (req,res)=>{
        const { year, stats } =  req.params
        try{
            const data = await  Stats.find({ collectionName: stats, pageYear: year });
            res.json(data)
        }catch(err){
            console.log(err)
        }
    },
}