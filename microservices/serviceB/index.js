const express = require('express');

const app = express();
app.use(express.json());

app.post('/message-recieve', (req, res) => {
  const { message } = req.body;
  console.log(`Received message: ${message}`);
  res.send('Message received by Service B');
});

app.listen(4000, () => {
  console.log('Service B running on http://localhost:4000');
});
