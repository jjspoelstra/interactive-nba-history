module.exports = {
    getMain: (req, res) => {
        res.sendFile(__dirname + '/index.html')
    },
  };