const express = require('express');
const app = express();
const PORT = 3001;

app.get('/travel', (req, res) => {
  res.send('Моё любимое место для путешествий — Япония.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
