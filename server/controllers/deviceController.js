const ApiError = require('../error/ApiErrors')
const {Device} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const { waitForDebugger } = require('inspector')

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
        const {id} = req.params
        const device = await Device.findOne({where: {id}})
        return res.json(device)
    }

    async getAll(req, res){
        const {brandId, typeId} = req.query
        let devices;
        if (!brandId && !typeId){
            devices = await Device.findAll()
        }
        if (brandId && !typeId){
            devices = await Device.findAll({where: {brandId}})
        }
        if (!brandId && typeId){
            devices = await Device.findAll({where: {typeId}})
        }
        if (brandId && typeId){
            devices = await Device.findAll({where: {typeId, brandId}})
        }
        return res.json(devices)
    }
}

module.exports = new DeviceController()