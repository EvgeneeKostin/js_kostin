const { query } = require('express')
const ApiError = require('../error/ApiErrors')
const {User} = require('../models/models')

class UserController {
    async registration(req, res, next){
        const {email, password} = req.body
        if (!email, password){
            return next(ApiError.badRequest('Эмейл или пароль не введины'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const user = await User.create({email, password})
        return res.json({message: user})
    }

    async login(req, res){

    }

    async check(req, res, next){
        const {id} = req.query
        if (!id){
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(query)
    }
}

module.exports = new UserController()