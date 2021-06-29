const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');
const cors = require('cors');

const joinRouter = require('./routes/join');
const authRouter = require('./routes/auth');
const friendRouter = require('./routes/friend');
const scheduleRouter = require('./routes/schedule');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB연결 성공');
  })
  .catch((err) => {
    console.log('에러');
    console.error(err);
  });

const app = express();

app.set('port', process.env.PORT || 8000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use('/auth', authRouter);
app.use('/join', joinRouter);
app.use('/friend', friendRouter);
app.use('/schedule', scheduleRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  //에러핸들러
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
