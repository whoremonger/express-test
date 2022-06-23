const express = require('express')
const { engine } = require('express-handlebars') //template view engine
const path = require('path')
const logger = require('./middleware/logger')
const users = require('./Users')
const PORT = process.env.PORT || 5000

const app = express()

//initialize middleware
app.use(logger)

//Handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Need a body parser to parse data we are sending in the body and initialize it as middleware
app.use(express.json()) //to handle raw json from postman
app.use(express.urlencoded({ extended: false })) //to handle url encoded data from postman

//Homepage route
app.get('/', (req, res) => res.render('index', 
{ 
  title: 'User App',
  users
}))




//Set a static folder
app.use(express.static(path.join(__dirname, 'pages')))

//Users API routes - to shorten the routes for the CRUD API
app.use('/api/users', require('./routes/api/users'))

app.listen(PORT, () => {
  console.log(`Express-test app started on port ${PORT}.`)
})
