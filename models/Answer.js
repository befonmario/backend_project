import sql from "./connection.js";

const Answer = function(answer) {
    this.quizId = answer.quizId;
    this.attemptedQuestion = answer.attemptedQuestion;
    this.name = answer.name;
};

const tableName = 'answeruser';

Answer.create = (newAnswer, result) => {
    const { quizId, attemptedQuestion, name } = newAnswer;
    const sqlQuery = `
        INSERT INTO ${tableName} (quizId, attemptedQuestion, name)
        VALUES (?, ?, ?)
    `;
    const values = [quizId, JSON.stringify(attemptedQuestion), name];

    sql.query(sqlQuery, values, (err, res) => {
        if (err) {
            console.error("Kesalahan:", err);
            result(err, null);
            return;
        }
        
        console.log("Data jawaban berhasil ditambahkan:", { quizId, attemptedQuestion, name });
        result(null, { quizId, attemptedQuestion, name });
    });
};

Answer.getByName = (name, result) => {
    const sqlQuery = `
        SELECT * FROM ${tableName} WHERE name = ?
    `;
    const values = [name];

    sql.query(sqlQuery, values, (err, res) => {
        if (err) {
            console.error("Kesalahan:", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Data ditemukan:", res);
            result(null, res);
        } else {
            result({ type: 'not_found' }, null);
        }
    });
};

export default Answer;
