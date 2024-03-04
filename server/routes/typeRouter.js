const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create_type', checkRole('ADMIN'), typeController.create)
router.get('/getall_type', typeController.getAll)

module.exports = router