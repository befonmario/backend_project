import sql from "./connection.js";

const User = function(user){
    this.username = user.username
    this.name = user.name
    this.password = user.password
    this.email = user.email
    this.role = user.role
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
    sql.query(`UPDATE ${tableName} SET username =?, name = ?, password = ?, email = ?, WHERE id = ?`,
        [data.username, data.name, data.password, data.email, id], (err, res) => {
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

User.findByName = (name, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE name = ?`, name, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // Jika tidak ada pengguna dengan nama tersebut
        result({ type: 'not_found' }, null);
    });
};

User.updateProfile = (id, newData, result) => {
    sql.query(
        `UPDATE ${tableName} SET username = ?, name = ?, email = ? WHERE id = ?`,
        [newData.username, newData.name, newData.email, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // Tidak ada pengguna yang ditemukan dengan ID yang diberikan
                result({ type: 'not_found' }, null);
                return;
            }

            // Profil pengguna berhasil diperbarui
            result(null, { id: id, newData });
        }
    );
};



export default User