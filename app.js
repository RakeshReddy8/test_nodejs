const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => res.send('Hello, Jenkins Pipeline! ESNE Project with Jenkins WebHook at 13:35'));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
