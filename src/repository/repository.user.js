const { pool } = require('../DB')

async function getUsersDB() {
    const client = await pool.connect()
    const sql = `SELECT *FROM users JOIN users_info ON users.info_id=users_info.id`
    const data = (await client.query(sql)).rows
    return data
}

async function getUsersByIdDB(user_id) {
    const client = await pool.connect()
    const sql = `SELECT users.name, users.surname, users_info.birth,users_info.city,users_info.age
     FROM users JOIN users_info ON users.info_id=users_info.id WHERE users.id=$1`
    const data = (await client.query(sql, [user_id])).rows
    return data
}

async function createUsersDB(name, surname, birth, city, age) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')


        const sql = `INSERT INTO users_info(birth, city, age) VALUES ($1, $2, $3) 
        RETURNING *`
        const data = (await client.query(sql, [birth, city, age])).rows[0]

        const sql2 = `INSERT INTO users(name, surname,info_id) VALUES ($1, $2,$3)`
        await client.query(sql2, [name, surname, data.id])

        const sql3 = `SELECT users.name, users.surname, users_info.birth, users_info.city, users_info.age 
        FROM users 
        JOIN users_info ON users_info.id =users.info_id
        WHERE  users.info_id =$1 `
        const data3 = (await client.query(sql3, [data.id])).rows;

        await client.query('COMMIT')

        return data3
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(`createUsersDB :${error.message}`);
        return []
    }
}

async function updateUsersDB(info_id, name, surname, birth, city, age) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const sql = ` UPDATE users_info SET birth=$1, city=$2, age=$3 WHERE id=$4`
        await client.query(sql, [birth, city, age, info_id])

        const sql2 = `UPDATE users SET name=$1, surname=$2 where id=$3`
        await client.query(sql2, [name, surname, info_id])

        const sql3 = `SELECT users.name, users.surname, users_info.birth, users_info.city, users_info.age 
        FROM users
        JOIN users_info ON users.info_id = users_info.id
        WHERE  users.info_id =$1 `
        const data = (await client.query(sql3, [info_id])).rows

        await client.query('COMMIT')
        return data
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(`updateUsersDB :${error.message}`);
        return []
    }

}

async function deleteUsersDB(info_id) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const sql = `DELETE FROM users WHERE id=$1`
        await client.query(sql, [info_id])

        const sql2 = `DELETE FROM users_info WHERE id=$1 RETURNING *`
        const data = (await client.query(sql2, [info_id])).rows
        console.log(data);
        await client.query('COMMIT')
        return data

    } catch (error) {
        await client.query('ROLLBACK')
        console.log(`deleteUsersDB :${error.message}`);
        return []
    }
}

async function patchUsersDB(info_id, dataFromClient) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const sql = `SELECT * FROM users
        JOIN  users_info
        ON users.info_id = users_info.id
        WHERE users.info_id=$1`
        const data = (await client.query(sql, [info_id])).rows[0]

        const mergeData = { ...data, ...dataFromClient }
        
        const sql2 = `UPDATE users SET name = $1, surname =$2 WHERE info_id =$3`
        await client.query(sql2, [mergeData.name, mergeData.surname, info_id])

        const sql3 = `UPDATE users_info SET birth=$1, city=$2, age=$3 WHERE id=$4`
        await client.query(sql3, [mergeData.birth, mergeData.city, mergeData.age, info_id])

        const sql4 = `SELECT * FROM users
        JOIN  users_info
        ON users.info_id = users_info.id
        WHERE users.info_id=$1`
        const data2 = (await client.query(sql4, [info_id])).rows

        await client.query('COMMIT')
        return data2

    } catch (error) {
        await client.query('ROLLBACK')
        console.log(`patchUsersDB :${error.message}`);
        return []
    }

}




module.exports = { getUsersDB, getUsersByIdDB, createUsersDB, updateUsersDB, deleteUsersDB, patchUsersDB }