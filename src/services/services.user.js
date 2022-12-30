const { getUsersDB, getUsersByIdDB, createUsersDB, updateUsersDB, deleteUsersDB, patchUsersDB } = require('../repository/repository.user')
const { ExceptionType } = require('../exceptions/exceptions.type')

async function getUsers() {
    const users = await getUsersDB()
    if (!users.length) throw new Error(ExceptionType.GET_USERS_NOT_FOUND.message)
    return users
}

async function getUsersById(user_id) {
    const user = await getUsersByIdDB(user_id)
    if (!user.length) throw new Error(ExceptionType.GET_USER_NOT_FOUND.message)
    return user
}

async function createUsers(name, surname, birth, city, age) {
    const users = await createUsersDB(name, surname, birth, city, age)
    if (!users.length) throw new Error(ExceptionType.POST_USER_NOT_FOUND.message)
    return users
}

async function updateUsers(info_id, name, surname, birth, city, age) {
    const users = await updateUsersDB(info_id, name, surname, birth, city, age)
    if (!users.length) throw new Error(ExceptionType.PUT_USER_NOT_FOUND.message)
    return users
}

async function deleteUsers(info_id) {
    const users = await deleteUsersDB(info_id)
    if (!users.length) throw new Error(ExceptionType.DELETE_USER_NOT_FOUND)
    return users
}

async function patchUsers(info_id, dataFromClient) {
    const users = await patchUsersDB(info_id, dataFromClient)
    if (!users.length) throw new Error(ExceptionType.PATCH_USER_NOT_FOUND)
    return users
}


module.exports = { getUsers, getUsersById, createUsers, updateUsers, deleteUsers, patchUsers }