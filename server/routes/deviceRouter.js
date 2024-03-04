const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create_device', checkRole('ADMIN'), deviceController.create)
router.get('/getall_device', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router