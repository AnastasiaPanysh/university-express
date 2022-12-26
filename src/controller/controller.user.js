const express = require('express')
const { getUsers, getUsersById, createUsers, updateUsers, deleteUsers, patchUsers } = require('../services/services.user')

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

route.post('/', async (req, res) => {
    try {
        const { name, surname, birth, city, age } = req.body
        const user = await createUsers(name, surname, birth, city, age)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, surname, birth, city, age } = req.body
        const user = await updateUsers(id, name, surname, birth, city, age)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await deleteUsers(id)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.patch('/:info_id', async (req, res) => {
    try {
        const { info_id } = req.params
        const user = await patchUsers(info_id, req.body)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = route