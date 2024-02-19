const ApiError = require('../error/ApiErrors')
const {Type} = require('../models/models')

class TypeController{
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json({message: type})
    }

    async getAll(req, res){
        const type = await Type.findAll()
        return res.json(type)
    }
}

module.exports = new TypeController()    