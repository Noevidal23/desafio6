const router = require('express').Router()
const producto = require('../models/productos/productos')

router.get('/', (req, res) => {
     res.render('view/home', producto.getAll())
})

module.exports = router 