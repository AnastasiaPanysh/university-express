const { getUsersDB, getUsersByIdDB } = require('../repository/repository.user')

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


module.exports = { getUsers, getUsersById }