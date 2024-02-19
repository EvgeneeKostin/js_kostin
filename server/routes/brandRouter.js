const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

router.post('/create_brand', brandController.create)
router.get('/getall_brand', brandController.getAll)

module.exports = router