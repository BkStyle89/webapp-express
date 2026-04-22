const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3010;
const postRouter = require('./controller/controller')
const error500 = require('./middlewares/error500.js')
const path = require('path')

app.use(express.json());
app.use(cors())
app.use('/movies_cover', express.static(path.join(__dirname, 'movies_cover')));

// Base route
app.get('/', (req, res, next) => {
  res.send('Server del mio blog');
});

app.use("/post", postRouter)
app.use(error500);



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
