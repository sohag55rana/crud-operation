const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('curd operation working!')
})

app.listen(port, () => {
    console.log(`crud opersation working on 5000 post ${port}`)
})