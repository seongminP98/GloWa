const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
  });