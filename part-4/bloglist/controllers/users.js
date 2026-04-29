const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')



usersRouter.get('/', async(request, response)=> {
    const users = await User
      .find({}).populate('blogs')
      response.json(users)
})


usersRouter.post('/', async (request, response) => {
    const {username, name, password}  = request.body

    if(!username || !password) {
        return response.status(400).json({error:'Both password and username must be given'})
    }

    if(password.length<3) {
        return response.status(400).json({error:'Password must contain at least three characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter





 