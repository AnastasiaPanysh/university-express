const { getUsersDB, getUsersByIdDB, createUsersDB, updateUsersDB, deleteUsersDB, patchUsersDB } = require('../repository/repository.user')

async function getUsers() {
    const users = await getUsersDB()
    if (!users.length) throw new Error('DB is empty')
    return users
}

async function getUsersById(id) {
    const users = await getUsersByIdDB(id)
    if (!users.length) throw new Error('DB is empty')
    return users
}

async function createUsers(name, surname, birth, city, age) {
    const users = await createUsersDB(name, surname, birth, city, age)
    if (!users.length) throw new Error('DB is empty')
    return users
}

async function updateUsers(id, name, surname, birth, city, age) {
    const users = await updateUsersDB(id, name, surname, birth, city, age)
    if (!users.length) throw new Error('DB is empty')
    return users
}

async function deleteUsers(id) {
    const users = await deleteUsersDB(id)
    if (!users.length) throw new Error('DB is empty')
    return users
}

async function patchUsers(info_id, dataFromClient) {
    const users = await patchUsersDB(info_id, dataFromClient)
    if (!users.length) throw new Error('DB is empty')
    return users
}


module.exports = { getUsers, getUsersById, createUsers, updateUsers, deleteUsers, patchUsers }