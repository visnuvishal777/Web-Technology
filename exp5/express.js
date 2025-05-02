const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


app.post('/login', (req, res) => {
  const { username, email, password, remember } = req.body;

  
  if (username === 'visnu' && email === 'visnu@example.com' && password === '123456') {
    if (remember) {
      res.cookie('username', username, { maxAge: 900000, httpOnly: true });
    }
    res.sendFile(path.join(__dirname, 'views', 'welcome.html'));
  } else {
    res.send(`
      <h3 style="color:red;text-align:center;">Invalid credentials</h3>
      <p style="text-align:center;"><a href="/">Try again</a></p>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});