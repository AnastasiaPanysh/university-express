const express = require('express')
const { getUsers, getUsersById } = require('../services/services.user')

const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const user = await getUsers()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await getUsersById(id)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = route