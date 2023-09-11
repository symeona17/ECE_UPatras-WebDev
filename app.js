const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database'); // Require the database module

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Handle root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Handle form submissions
app.post('/submit_form', (req, res) => {
    const { name, surname, email, message } = req.body;
    
    // Call the insertFormData function from the database module
    db.insertFormData(name, surname, email, message, (error) => {
        if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error submitting form' });
        } else {
            res.json({ success: true, message: 'Form submitted successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
