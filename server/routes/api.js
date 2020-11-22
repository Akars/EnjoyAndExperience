const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const { query } = require('express')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: '0000',
 database: 'EnjoyAndExperience'
})

client.connect()

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.trips = []
  }
}

/*********************LOGIN *************************/
router.post('/register', async(req, res) => {
  const email = req.body.email
  const password = req.body.password

  if(email == null){
    res.status(400).json({message: 'bad request: the email is null' })
    return
  }
  if(password == null){
    res.status(400).json({message: 'bad request: the password is null' })
    return
  }

  const sql = "SELECT email FROM users"
  const result = await client.query({
    text: sql,
  })

  console.log(result.rows)
  
  for(mail of result.rows){
    if(mail.email === email){
      res.status(400).json({message: 'bad request: the email is already used' })
      return
    }
  }

  const hash = await bcrypt.hash(password, 10)

  const sql1 = "INSERT INTO users (email, password) VALUES ($1, $2)"
  await client.query({
    text: sql1,
    values: [email, hash]
  })

  res.json({message: "You are now registered"})
})

router.post('/login', async(req, res) => {
  const email = req.body.email
  const password = req.body.password

  if(req.session.userId === undefined){
    const sql = "SELECT email, password, id FROM users"
    const result = await client.query({
      text: sql,
    })

    var findUser = result.rows.find(a => a.email === email) 
    if(findUser !== undefined){
      if(await bcrypt.compare(password, findUser.password)){
        req.session.userId = findUser.id
        req.session.userEmail = email
      }
      else{
        res.status(400).json({message: 'bad request: the password is incorrect' })
        return
      }
    }
    else{
      res.status(400).json({message: 'bad request: The user can\'t be found' })
      return
    }

    res.json({message: "You're logged successfully !"})
  }
  else{
    res.status(400).json({message: 'bad request: you are already logged' })
      return
  }
})

router.post('/logout', async(req, res) => {
  if(req.session.userId === undefined){
    res.status(400).json({
      message: 'not logged'
    })
    return
  }
  else{
    delete req.session.userId
  }

  res.json({ message: 'You logout successfully !'})
})

router.get('/me', async(req, res) => {
  if(req.session.userId !== undefined){
    const query = await client.query({
      text: "SELECT * FROM users WHERE id = $1 LIMIT 1",
      values: [req.session.userId]
    })
  
    if (query.rows === undefined) {
      res.status(400).json({ message: 'user inexistent' })
      return
    }
  
    const user = query.rows[0]
    res.json({
      id: user.id,
      email: user.email
    })
  }
  else{
    res.status(401).json({message: 'bad request: you are not connected'})
  }
})
/***************************************************************** */
/*********************************PANIER*********************************** */

router.use((req, res, next) => {
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

router.route('/panier')

  .get((req, res) =>{
    res.json(req.session.panier)
  })

  .post(async (req, res) =>{
    const id = parseInt(req.body.id)
    const quantity = parseInt(req.body.quantity)

    if (isNaN(id) || id <= 0 ||
      isNaN(quantity) || quantity <= 0 ||
      req.session.panier.trips.some(trip => trip.id === id)) {
      res.status(400).json({ message: 'bad request' })
      return
    }

    const sql = "SELECT * FROM trips WHERE id = $1 LIMIT 1"
    const result = await client.query({
      text: sql,
      values: [id]
    })

    if(result.rows.length === 0){
      res.status(400).json({message: "Couldn't find the trip"})
    }

    const newTrip = {
      id,
      quantity,
    }
    
    req.session.panier.trips.push(newTrip)
    req.session.panier.updatedAt = new Date()

    res.send()
  })


router.post('/panier/pay', (req, res) => {

  if (req.session.userId === undefined) {
    res.status(401).json({ message: 'not logged' })
    return
  }

  const message = "Thank you for your purchase"

  req.session.panier.trips.splice(0, req.session.panier.trips.length) 
  req.session.panier.updatedAt = new Date()
  req.session.panier.createdAt = new Date()
  res.send()
})


router.put('/panier/:tripId', (req, res) => {
    const tripId = parseInt(req.params.tripId)
    const quantity = parseInt(req.body.quantity)

    console.log({tripId, quantity})
    if(isNaN(quantity) || quantity <= 0 || tripId <= 0 || isNaN(tripId)){
      res.status(400).json({ message: 'bad request' })
      return
    }

    req.session.panier.trips.find(a => a.id === tripId).quantity = quantity
    req.session.panier.updatedAt = new Date()
    res.send()
})

router.delete('/panier/:tripId', (req, res) => {
  const tripId = parseInt(req.params.tripId)

  if (isNaN(tripId)) {
    res.status(400).json({ message: 'tripId should be a number' })
    return
  }

  const trip = req.session.panier.trips.find(a => a.id === tripId)
  const index = req.session.panier.trips.indexOf(trip)
  req.session.panier.trips.splice(index, 1)
  req.session.panier.updatedAt = new Date()
 
  res.send()
})

/********************************************************************************************* */
/*TRIP*/

router.post('/trip', async(req, res) => {
  const title = req.body.title
  const price = parseInt(req.body.price)
  const image = req.body.image
  const description = req.body.description
  const username = req.session.userEmail
  

  if (typeof title !== 'string' || title === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      typeof username !== 'string' || username === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  if(req.session.userId !== undefined){
    const sql = "INSERT INTO trips (title, price, image, description, username) VALUES ($1, $2, $3, $4, $5) RETURNING id"
    const query = await client.query({
      text: sql,
      values: [title, price, image, description, username]
    })


    const trip = {
      id: query.rows[0].id,
      title,
      image,
      price,
      description,
      username,
    }

    res.json(trip)
  }
  else{
    res.status(401).json({message: 'bad request: you are not connected'})
  }
})

router.get('/trip', async (req, res) => {
  const query = await client.query("SELECT * FROM trips")

  res.json(query.rows)
})

router.delete('/trip/:tripId', async(req, res) =>{
  const tripId = parseInt(req.params.tripId)

  if(tripId <= 0 || isNaN(tripId)){
    res.status(400).json({ message: 'bad request' })
    return
  }


  const sql = "DELETE FROM trips WHERE id = $1"
  const trips = await client.query({
    text: sql,
    values: [tripId]
  })

  res.json({ message: 'Trip deleted'})
})


router.put('/trip/:tripId', async(req, res) =>{
  const tripId = parseInt(req.params.tripId)
  const title = req.body.title
  const price = parseInt(req.body.price)
  const image = req.body.image
  const description = req.body.description
  const username = req.body.username
   
  console.log(username)

  if(tripId <= 0 || isNaN(tripId)){
    res.status(400).json({ message: 'bad request' })
    return
  }

  const sql = "UPDATE trips SET title = $1, price = $2, image = $3, description = $4, username = $5 WHERE id = $6"
  const result = await client.query({
    text: sql,
    values: [title, price, image, description, username, tripId]
  })

  res.send()
})

/*//////////////////////////////////////////////////////////////////*/




module.exports = router
