const { ExceptionType } = require('../exceptions/exceptions.type')

async function isValidInfoId(req, res, next) {
    const { info_id } = req.params
    if (!info_id) throw new Error(ExceptionType.ID_NOT_FOUND.message)
    if (isNaN(info_id)) throw new Error(ExceptionType.ID_NOT_VALID.message)
    next()
}
async function isValidUserId(req, res, next) {
    const { user_id } = req.params
    if (!user_id) throw new Error(ExceptionType.ID_NOT_FOUND.message)
    if (isNaN(user_id)) throw new Error(ExceptionType.ID_NOT_VALID.message)
    next()
}

async function isValidBody(req, res, next) {
    const { name, surname, birth, city, age } = req.body

    if (!name) throw new Error(ExceptionType.NAME_NOT_FOUND.message)
    if (!surname) throw new Error(ExceptionType.SURNAME_NOT_FOUND.message)
    if (!birth) throw new Error(ExceptionType.BIRTH_NOT_FOUND.message)
    console.log(birth);
    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g.test(birth)) throw new Error(ExceptionType.BIRTH_NOT_VALID.message)
    if (!city) throw new Error(ExceptionType.CITY_NOT_FOUND.message)
    if (!age) throw new Error(ExceptionType.AGE_NOT_FOUND.message)
    if (isNaN(age)) throw new Error(ExceptionType.AGE_NOT_VALID.message)
    next()

}

module.exports = { isValidInfoId, isValidUserId, isValidBody };