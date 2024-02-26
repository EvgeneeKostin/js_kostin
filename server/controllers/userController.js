const { query } = require('express')
const ApiError = require('../error/ApiErrors')
const { User } = require('../models/models')
const bcrypt = require('bcrypt')

class UserController {
    async registration(req, res, next){
        const {email, password} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Email или пароль не введены.'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Такой пользователь уже существует.'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        return res.json({message: user})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email, password}})
        if (!user){
            return next(ApiError.internal('Неверный eMail или пароль.'))
        }
        return res.json({message: "Вы авторизовались."})
    }

    async check(req, res, next){
        const {id} = req.query
        if (!id){
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(query)
    }

    async getAllUsers(req, res){
        const users = await User.findAll()
        return res.json({message: users})
    }

    async deleteUser(req, res, next){
        const id = req.body
        if (!id){
            return next(ApiError.badRequest('Пользователь для удаления не указан.'))
        }
        let result = await User.destroy({where: {id}})
        return res.json({message: result})
    }
}

module.exports = new UserController()