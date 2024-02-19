const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/create_device', deviceController.create)
router.get('/getall_device', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router