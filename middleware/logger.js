//middleware
const moment = require('moment') //install for date formatting

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
  next() //always put next()
}

module.exports = logger