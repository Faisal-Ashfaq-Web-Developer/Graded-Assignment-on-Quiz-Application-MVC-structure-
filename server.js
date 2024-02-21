const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { User, Quiz } = require('./models');
const app = express();
const PORT = 3000;
const secretKey = 'yourSecretKey'; // Replace with a secure secret key in production

// Temporary in-memory database
const users = [];
const quizzes = [];

// Middleware
app.use(bodyParser.json());

// Authentication middleware
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user;
        next();
    });
}

// Routes
app.post('/signup', (req, res) => {
    const { username, password, role } = req.body;
    const user = new User(users.length + 1, username, password, role);
    users.push(user);

    // Generate and send a JWT token upon successful signup
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey);
    res.status(201).json({ message: 'User created successfully', token });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Generate and send a JWT token upon successful login
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey);
        res.status(200).json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/admin/add-question', authenticateToken, (req, res) => {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }

    const { question, options, correctOption } = req.body;
    const quiz = new Quiz(quizzes.length + 1, question, options, correctOption);
    quizzes.push(quiz);
    res.status(201).json({ message: 'Question added successfully', quiz });
});

app.delete('/admin/remove-question/:questionId', authenticateToken, (req, res) => {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }

    const questionId = parseInt(req.params.questionId);
    const index = quizzes.findIndex(q => q.id === questionId);

    if (index !== -1) {
        quizzes.splice(index, 1);
        res.status(200).json({ message: 'Question removed successfully' });
    } else {
        res.status(404).json({ message: 'Question not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
