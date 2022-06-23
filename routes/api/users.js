//API Users ///router
const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const users = require('../../Users')

//Gets all users
router.get('/', (req, res) => res.json(users))

//Get a single user
router.get('/:id', (req, res) => { //some() runs a condition to see if it exists and give true or false in a array
  const found = users.some(user => user.id === parseInt(req.params.id))

  if (found) {
     //res.send(req.params.id) // params for a url or route like id. open another tab for postman to test it (returns just id)
    res.json(users.filter(user => user.id === parseInt(req.params.id))) // to get all the data associated with that one item, convert id params to int
      //should 200 status if OK.
  } else {
    //use server status codes //if 400 bad request
      res.status(400).json({ msg: `No user with id of ${req.params.id}.` })
  }
 
})

//Create user
router.post('/', (req, res) => {
  //res.send(req.body) as a test for postman
  const newUser = {  //use UUID instead of database to generate id (not using database here database autogenerates ids)
    id: uuid.v4(), //randomizes id
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }
  if(!newUser.name || !newUser.email) { //making name and email are sent as well into the data array
    return res.status(400).json({ msg: 'Please include a name and email.' }) //need return if not using an 'else'
  }

  users.push(newUser) //then if everything is good push the data into users array
  //res.json(users)
  res.redirect('/')
})

//Update user
router.put('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id))

  if (found) {
    const updUser = req.body
    users.forEach(user => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updUser.name ? updUser.name : user.name 
        user.email = updUser.email ? updUser.email : user.email

        res.json({ msg: 'User updated', user })
      }
    })

  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}.` })
  }
})

//Delete user
router.delete('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id))

  if (found) {
     
    res.json({ msg: 'User deleted!', 
    users: users.filter(user => user.id !== parseInt(req.params.id))}) 
   
  } else {
  
      res.status(400).json({ msg: `No user with id of ${req.params.id}.` })
  }
 
})


module.exports = router