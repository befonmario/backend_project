import sql from "./connection.js";
import { v4 as uuidv4 } from 'uuid';

const Quiz = function(quiz) {
    this.id = quiz.id || uuidv4(); 
    this.name = quiz.name;
    this.data = quiz.data;
    this.isPublished = quiz.isPublished || false;
};

const tableName = 'quizzes';

Quiz.create = (newQuiz, result) => {
    const { name, data, isPublished } = newQuiz;

    // Pastikan data dan nama tidak kosong
    if (!data) {
        console.error("Kesalahan: Data tidak boleh kosong");
        result({ message: "Data tidak boleh kosong" }, null);
        return;
    } else if (!name) {
        console.error("Kesalahan: nama tidak boleh kosong");
        result({ message: "name tidak boleh kosong" }, null);
        return;
    }

    const newId = uuidv4(); // Generate UUID baru
    const sqlQuery = `
        INSERT INTO ${tableName} (id, name, data, isPublished) 
        VALUES (?, ?, ?, ?)
    `;

    const values = [newId, name, JSON.stringify(data), isPublished || false];

    sql.query(sqlQuery, values, (err, res) => {
        if (err) {
            console.error("Kesalahan:", err);
            result(err, null);
            return;
        }
        
        console.log("Kuis berhasil ditambahkan:", { id: newId, ...newQuiz });
        result(null, { id: newId, ...newQuiz });
    });
};


// Metode untuk mengambil semua data kuis
Quiz.getAll = result => {
    sql.query("SELECT * FROM quizzes", (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(err, null);
            return;
        }
        console.log("Quizzes:", res);
        result(null, res);
    });
};

Quiz.getById = (id, result) => {
    const sqlQuery = "SELECT * FROM quizzes WHERE id = ?";
    
    sql.query(sqlQuery, id, (err, res) => {
        if (err) {
            console.error("Error:", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Kuis ditemukan:", res[0]);
            result(null, res[0]);
            return;
        }

        // Kuis tidak ditemukan dengan ID yang diberikan
        result({ kind: "not_found" }, null);
    });
};

Quiz.updateById = (id, updatedQuiz, result) => {
    const { name, data, isPublished } = updatedQuiz;
    const sqlQuery = `
        UPDATE quizzes 
        SET name = ?, data = ?, isPublished = ? 
        WHERE id = ?
    `;
    const values = [name, JSON.stringify(data), isPublished || false, id];

    sql.query(sqlQuery, values, (err, res) => {
        if (err) {
            console.error("Kesalahan:", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // Kuis tidak ditemukan dengan ID yang diberikan
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Kuis berhasil diupdate:", { id, ...updatedQuiz });
        result(null, { id, ...updatedQuiz });
    });
};

Quiz.publishById = (id, result) => {
    const sqlQuery = `
        UPDATE quizzes 
        SET isPublished = true
        WHERE id = ?
    `;

    sql.query(sqlQuery, id, (err, res) => {
        if (err) {
            console.error("Kesalahan:", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // Kuis tidak ditemukan dengan ID yang diberikan
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Kuis dengan ID", id, "sudah diubah menjadi public");
        result(null, res);
    });
};

export default Quiz;
