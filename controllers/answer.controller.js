import Answer from "../models/Answer.js";

export const createAnswer = (req, res) => {
    const answerData = req.body;
    const currentUser = req.user; // Mengambil informasi pengguna dari sesi atau token autentikasi

    // Memastikan currentUser memiliki nilai
    if (!currentUser || !currentUser.name) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Menambahkan nama pengguna ke data jawaban
    answerData.name = currentUser.name;

    Answer.create(answerData, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Gagal menambahkan jawaban" });
        }
        res.status(201).json(data);
    });
};

export const getAnswerByName = (req, res) => {
    const { name } = req.user; // Mengambil nama pengguna dari sesi atau token autentikasi

    Answer.getByName(name, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Gagal mengambil jawaban" });
        }
        const formattedData = data.map(item => ({ "kuis yang sudah dikerjakan": item.quizId, "nama": item.name }));
        res.status(200).json(formattedData);
    });
};
