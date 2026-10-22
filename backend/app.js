const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let quizData = [
    {
        "id": 1,
        "category": "VideoGames",
        "subCategory": "Metroidvania",
        "answer": "Hollow Knight: Silksong",
        "questions": [
            {
                "level": 1,
                "text": "This is the second game in the series. After the success of the first title, this game focuses on the story of an important side character."
            },
            {
                "level": 2,
                "text": "This game was one of the most anticipated indie games."
            },
            {
                "level": 3,
                "text": "Development of this game began as an expansion for the original game before evolving into a standalone title."
            },
            {
                "level": 4,
                "text": "This game was nominated for Game of the Year at The Game Awards 2025."
            },
            {
                "level": 5,
                "text": "It is the sequel to a critically acclaimed 2017 Metroidvania developed by Team Cherry."
            }
        ]
    }
]


app.get('/' , (req,res) => {
  res.send('hello server');
});

app.get('/quiz' , (req,res) => {
  res.json(quizData);
});

let nextId;

if (quizData.length > 0) {
  nextId = Math.max(
        ...quizData
            .filter(item => item && typeof item === 'object' && !Array.isArray(item))
            .map(item => item.id ?? 0)
    ) + 1;
} else {
  nextId = 1;
}

app.post('/quiz', (req, res) => {
  console.log(req.body);
  if(!req.body.category) 
    return res.status(400).json({
        message: "invalid request, category is required"
    });
  const newQuiz = 
    {
      "id": nextId,
      "category": req.body.category,
      "subCategory": req.body.subCategory,
      "answer": req.body.answer,
      "questions": req.body.questions
      
    };
    
    quizData.push(newQuiz);

    return res.status(201).json({
    message: "quiz created successfully",
    quiz: newQuiz
});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});