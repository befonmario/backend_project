const Result = function(quizResult) {
    this.quizId = quizResult.quizId;
    this.name = quizResult.name;
    this.score = quizResult.score;
};

const quizResultTableName = 'quizresult';

Result.create = (newQuizResult, result) => {
    const { quizId, name, score } = newQuizResult;
    const sqlQuery = `
        INSERT INTO ${quizResultTableName} (quizId, name, score)
        VALUES (?, ?, ?)
    `;
    const values = [quizId, name, score];

    sql.query(sqlQuery, values, (err, res) => {
        if (err) {
            console.error("Kesalahan:", err);
            result(err, null);
            return;
        }
        
        console.log("Data hasil kuis berhasil ditambahkan:", { quizId, name, score });
        result(null, { quizId, name, score });
    });
};

export default Result;
