const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// path.join() is used here to ensure that the path is correct, no matter the operating system
app.use(express.static(path.join(__dirname, '../client/dist')));app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
