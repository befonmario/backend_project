import sql from "./connection.js";

const QuizResult = function(quizResult) {
    this.nama = quizResult.nama;
    this.quizId = quizResult.quizId;
    this.score = quizResult.score;
    this.attemptNo = quizResult.attemptNo;
};

const tableName = 'quizresult';

// Mendapatkan total attempt dan score dari answeruser
QuizResult.getAttemptAndScore = (nama, callback) => {
    const query = `
        SELECT COUNT(*) AS total_attempt, SUM(IF(au.answer = q.answer, 1, 0)) AS score
        FROM answeruser au
        JOIN quizzes q ON au.questionId = q.questionId
        WHERE au.nama = ?
    `;
    sql.query(query, [nama], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, { total_attempt: 0, score: 0 });
        }
        const { total_attempt, score } = results[0];
        callback(null, { total_attempt, score });
    });
};

// Menyimpan hasil quiz ke dalam tabel quizresult
QuizResult.saveQuizResult = (nama, quizId, score, attemptNo, callback) => {
    const insertQuery = `
        INSERT INTO ${tableName} (nama, quizId, score, attemptNo)
        VALUES (?, ?, ?, ?)
    `;
    sql.query(insertQuery, [nama, quizId, score, attemptNo], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

export default QuizResult;
