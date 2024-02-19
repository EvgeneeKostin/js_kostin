const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')

router.post('/create_type', typeController.create)
router.get('/getall_type', typeController.getAll)

module.exports = router