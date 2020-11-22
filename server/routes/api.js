const express = require('express')
const router = express.Router()
const articles = require('../data/articles.js')

const bcrypt = require('bcrypt')
const { Client } = require('pg')
const { find } = require('../data/articles.js')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'postgresql',
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

router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
router.get('/panier', (req, res) => {
  res.json(req.session.panier)
})

/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */
router.post('/panier', (req, res) => {
  const id = parseInt(req.body.id)
  const quantity = parseInt(req.body.quantity)

  if ( id < 0 || id > articles.length || isNaN(id) || isNaN(quantity) || quantity <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }


  var idCorrect = 0
  for(var article of req.session.panier.articles){
    if(id === article.id){
      idCorrect = 1
    }
  }
  if(idCorrect == 1){
    res.status(400).json({ message: 'bad request' })
    return
  }

  const newArticle = {
    id: id,
    quantity: quantity,
  }

  req.session.panier.articles.push(newArticle)
  /*
  for(var article of articles){
    if(id === article.id){
      req.session.panier.articles.push(article)
    }
  }
  */

  res.json(req.session.panier)
})

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {
  const firstName = req.body.firstname
  const surName = req.body.surname

  if(firstName == "" || surName == ""){
    res.status(400).json({ message: 'bad request' })
    return
  }

  const message = "Thank you " + firstName + " " + surName + " for your purchase"

  console.log(req.session.panier.articles)

  req.session.destroy()
  
  res.send(message)
  res.json(req.session.panier.articles)
})

/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:tripId', (req, res) => {
    const tripId = parseInt(req.params.tripId)
    const quantity = parseInt(req.body.quantity)

    console.log("coucou")
    console.log({tripId, quantity})
    if(isNaN(quantity) || quantity <= 0 || tripId <= 0 || isNaN(tripId)){
      res.status(400).json({ message: 'bad request' })
      return
    }

    var idCorrect
    for(var article of req.session.panier.articles){
      if(tripId === article.id){
        idCorrect = 1
        article.quantity = quantity;
      }
    }

    if(idCorrect =! 1){
      res.status(400).json({ message: 'bad request' })
      return
    }

    res.json(req.session.panier)
})

/*
 * Cette route doit supprimer un article dans le panier
 */
router.delete('/panier/:tripId', (req, res) => {
  const tripId = parseInt(req.params.tripId)

  if(tripId <= 0 || isNaN(tripId)){
    res.status(400).json({ message: 'bad request' })
    return
  }
  
  var idCorrect = 0
  var index = 0
  for(var article of req.session.panier.articles){
    if(tripId === article.id){
      idCorrect = 1
      req.session.panier.articles.splice(index, 1) 
    }
    index++
  }

  if(idCorrect == 0){
    res.status(400).json({ message: 'bad request' })
    return
  }
  
  res.json(req.session.panier)
})


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
