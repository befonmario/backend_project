import sql from "./connection.js";

const User = function(user){
    this.username = user.username
    this.name = user.name
    this.password = user.password
    this.email = user.email
}

const tableName = 'users'

User.create = (newUser, result) => {
    sql.query(`INSERT INTO ${tableName} SET ? `, newUser, (err, res) => {
        if(err)result(err, null)
        result(null, {id: res.insertId, newUser})
    })
}

User.getAll = (result) =>{
    sql.query(`SELECT * FROM ${tableName}`, (err, res)=>{
        if(err) result(err, null)
        result(null, res)
    })
}

User.findById = (id, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE id = ${id}`, (err, res) =>{
        if(err) {
            result(err, null)
            return
        }
        //jika data ditemukan
        if(res.length) {
            result(null, res[0])
            return
        }
        //jika kosong
        result({type: 'not_found'}, null)
    })
}

User.findByUsername = (username, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE username = ?`,username , (err, res) =>{
        if(err) {
            result(err, null)
            return
        }
        //jika data ditemukan
        if(res.length) {
            result(null, res[0])
            return
        }
        //jika kosong
        result({type: 'not_found'}, null)
    })
}

User.update = (id, data, result) =>{
    sql.query(`UPDATE ${tableName} SET question = ? , option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_answer = ? WHERE id = ?`,
        [data.question, data.option_a, data.option_b, data.option_c, data.option_d, data.correct_answer, id], (err, res) => {
            if(err) {
                result(err, null)
                return
            }

            if(res.affectedRows == 0) {
                result({type: 'not_found'}, null)
                return
            }

            result(null, {id: id, data})
        })
}

User.delete = (id, result) => {
    sql.query(`DELETE FROM ${tableName} where id = ${id}`, (err, res) => {
        if(err) {
            result(err, null)
            return
        }

        if(res.affectedRows == 0) {
            result({type: 'not_found'}, null)
            return
        }
        result(null, res)
    })
}


export default User