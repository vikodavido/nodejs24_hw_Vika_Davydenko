const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/message', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('http://localhost:4000/message-recieve', { message });
    res.send('Message sent to Service B');
  } catch (error) {
    res.status(500).send('Failed to send message');
  }
});

app.listen(3000, () => {
  console.log('Service A running on http://localhost:3000');
});
