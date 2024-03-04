const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create_brand', checkRole('ADMIN'), brandController.create)
router.get('/getall_brand', brandController.getAll)

module.exports = router