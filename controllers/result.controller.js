import QuizResult from '../models/Result.js';

// Membandingkan jawaban dan menyimpan hasil ke dalam tabel quizresult
export const bandingkanJawaban = (req, res) => {
    const { nama } = req.params;

    QuizResult.getAttemptAndScore(nama, (err, { total_attempt, score }) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const attemptNo = total_attempt;
        const quizId = '';

        QuizResult.saveQuizResult(nama, quizId, score, attemptNo, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('Quiz result updated successfully');
            res.send('Quiz result updated successfully');
        });
    });
};
