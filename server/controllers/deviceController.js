const ApiError = require('../error/ApiErrors')
const {Device} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

class DeviceController{
    async create(req, res, next){
        try{
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName})
            return res.json(device)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res){

    }

    async getAll(req, res){

    }
}

module.exports = new DeviceController()