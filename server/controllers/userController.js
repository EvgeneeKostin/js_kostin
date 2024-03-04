const { query } = require('express')
const ApiError = require('../error/ApiErrors')
const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const generateJWT = (id, email, password, role) => {
    return jwt.sign(
        {id, email, password, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next){
        const {email, password, role} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Email или пароль не введены.'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Такой пользователь уже существует.'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJWT(user.id, user.email, user.password, user.role)
        return res.json(token)
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal('Неверный eMail или пароль.'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Неверный eMail или пароль.'))
        }
        const token = generateJWT(user.id, user.email, user.password, user.role)
        return res.json(token)
    }

    async check(req, res, next){
        const token = generateJWT(req.user.id, req.user.email, req.user.password, req.user.role)
        return res.json({token})
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