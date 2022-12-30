const express = require('express')
const { getUsers, getUsersById, createUsers, updateUsers, deleteUsers, patchUsers } = require('../services/services.user')
const { isValidInfoId, isValidUserId, isValidBody } = require('../helper/validation')
const { buildResponse } = require('../helper/buildResponse')

const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const user = await getUsers()
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.get('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params
        const user = await getUsersById(user_id)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.post('/', isValidBody, async (req, res) => {
    try {
        const { name, surname, birth, city, age } = req.body
        const user = await createUsers(name, surname, birth, city, age)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.put('/:info_id', isValidBody, async (req, res) => {
    try {
        const { info_id } = req.params
        const { name, surname, birth, city, age } = req.body
        const user = await updateUsers(info_id, name, surname, birth, city, age)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.delete('/:info_id', async (req, res) => {
    try {
        const { info_id } = req.params
        const user = await deleteUsers(info_id)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.patch('/:info_id', async (req, res) => {
    try {
        const { info_id } = req.params
        const user = await patchUsers(info_id, req.body)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

module.exports = route