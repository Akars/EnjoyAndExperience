const express = require('express')
const router = express.Router()
const articles = require('../data/articles.js')

const bcrypt = require('bcrypt')
const { Client } = require('pg')
const { find } = require('../data/articles.js')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: '0000',
 database: 'TP5'
})

client.connect()

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}


router.post('/register', async(req, res) => {
  const email = req.body.email
  const password = req.body.password

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

  console.log(result.rows)
   
  res.json({message: "You are now registered"})
})

router.post('/login', async(req, res) => {
  const email = req.body.email
  const password = req.body.password

  if(req.session.userId === undefined){
    console.log(req.session.userId)
    const sql = "SELECT email, password, id FROM users"
    const result = await client.query({
      text: sql,
    })

    var findUser = result.rows.find(a => a.email === email) 
    if(findUser !== undefined){
      console.log(await bcrypt.compare(password, findUser.password))
      if(await bcrypt.compare(password, findUser.password)){
        req.session.userId = findUser.id
        console.log(req.session.userId, findUser.id)
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

router.get('/me', async(req, res) => {
  if(req.session.userId !== undefined){
    res.json(req.session.userId)
  }
  else{
    res.status(401).json({message: 'bad request: you are not connected'})
  }
})
/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */

/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
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
router.put('/panier/:articleId', (req, res) => {
    const articleId = parseInt(req.params.articleId)
    const quantity = parseInt(req.body.quantity)

    console.log("coucou")
    console.log({articleId, quantity})
    if(isNaN(quantity) || quantity <= 0 || articleId <= 0 || isNaN(articleId)){
      res.status(400).json({ message: 'bad request' })
      return
    }

    var idCorrect
    for(var article of req.session.panier.articles){
      if(articleId === article.id){
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
router.delete('/panier/:articleId', (req, res) => {
  const articleId = parseInt(req.params.articleId)

  if(articleId <= 0 || isNaN(articleId)){
    res.status(400).json({ message: 'bad request' })
    return
  }

  var idCorrect = 0
  var index = 0
  for(var article of req.session.panier.articles){
    if(articleId === article.id){
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


/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {
  res.json(articles)
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)

  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const article = {
    id: articles.length + 1,
    name: name,
    description: description,
    image: image,
    price: price
  }
  articles.push(article)
  // on envoie l'article ajouté à l'utilisateur
  res.json(article)
})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)

    articles.splice(index, 1) // remove the article from the array
    res.send()
  })

module.exports = router
