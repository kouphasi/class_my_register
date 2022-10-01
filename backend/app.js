var createError = require('http-errors');
var express = require('express');
var path = require('path');
const serveStatic = require('serve-static');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var samples = require('./routes/sample'); 
const loginRouter = require("./routes/loginRouter")
const apis = require("./routes/apis")

//ここからスタート
var app = express();

const port = process.env.PORT || 8000
if (process.env.NODE_ENV !== 'production') {
	app.use(cors())
}

app.use(serveStatic(__dirname + '/dist'))
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/img', express.static(__dirname + '/dist/static/img/'));
// app.use('/css', express.static(__dirname + '/dist/static/css/'));
// app.use('/js', express.static(__dirname + '/dist/static/js/'));
// app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'))

// app.use('/users', usersRouter);
// app.use('/samples', samples);  
app.use("/api/logincheck", loginRouter) 
app.get('/api/message', (req, res) => {
	res.send('get message')
})
app.use("/api/apis", apis)
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
