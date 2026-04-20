const express = require('express');
const app = express();
const PORT = 3010;
const postRouter = require('./controller/controller')
const error500 = require('./middlewares/error500.js')

app.use(express.json());


// Base route
app.get('/', (req, res) => {
  res.send('Server del mio blog');
});

app.use("/post", postRouter)
app.use(error500);



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
