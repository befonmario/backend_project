import Quiz from "../models/Quiz.js";

export const createQuiz = (req, res) => {
    const quizData = req.body;

    Quiz.create(quizData, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Gagal menambahkan kuis" });
        }
        res.status(201).json(data);
    });
};


export const quizzesQuestion = (req, res) => {
    Quiz.getAll((err, data) => {
        if (err) {
            res.status(500).json({ message: "Gagal mengambil data kuis" });
            return;
        }
        
        // Memformat setiap objek quiz
        const formattedQuizzes = data.map(quiz => {
            const { id, name, data, } = quiz;
            const parsedData = JSON.parse(data);
            const { questions_list } = parsedData;
            const sortedQuestions = questions_list.sort((a, b) => a.question_number - b.question_number);
            return {
                id,
                name,
                questions_list: sortedQuestions.map(({ question_number, question, options }) => ({
                    question_number,
                    question,
                    options
                })),
            };
        });

        res.json(formattedQuizzes);
    });
};

export const updateQuiz = (req, res) => {
    const { id } = req.params;
    const updatedQuiz = req.body;

    Quiz.updateById(id, updatedQuiz, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Gagal mengupdate kuis" });
            return;
        }
        res.json(data);
    });
};

export const quizzesQuestionById = (req, res) => {
    const { id } = req.params;
    
    Quiz.getById(id, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Gagal mengambil data kuis" });
            return;
        }
        
        if (!data) {
            res.status(404).json({ message: "Kuis tidak ditemukan" });
            return;
        }
        
        // Memformat data kuis
        const { id: quizId, name, data: quizData } = data; // Ubah variabel data menjadi quizData
        const parsedData = JSON.parse(quizData);
        const { questions_list } = parsedData;
        const sortedQuestions = questions_list.sort((a, b) => a.question_number - b.question_number);
        
        const formattedQuiz = {
            id: quizId, // Gunakan variabel quizId yang sudah diganti nama untuk menghindari konflik
            name,
            questions_list: sortedQuestions.map(({ question_number, question, options }) => ({
                question_number,
                question,
                options
            })),
        };
        
        res.json(formattedQuiz);
    });
};

export const publishQuizById = (req, res) => {
    const quizId = req.params.id;

    Quiz.publishById(quizId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({ message: `Kuis dengan ID ${quizId} tidak ditemukan` });
            } else {
                return res.status(500).json({ message: "Gagal membuat menjadi public" });
            }
        }
        res.json({ message: `Kuis dengan ID ${quizId} telah menjadi public` });
    });
};


