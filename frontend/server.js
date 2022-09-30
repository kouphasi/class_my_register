const express = require('express')
// const loginRouter = require("./routes/loginRouter")
const app = express()
const cors = require('cors')
const serveStatic = require('serve-static')

const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
	app.use(cors())
}

app.use(serveStatic(__dirname + '/dist'))
// app.use('/img', express.static(__dirname + '/dist/img/'));
// app.use('/css', express.static(__dirname + '/dist/css/'));
// app.use('/js', express.static(__dirname + '/dist/js/'));
// app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// app.use("/api/logincheck", loginRouter) 
app.get('/api/message', (req, res) => {
	res.send('get message')
})
app.post('/', function(req, res, next) {
    const setid_pass = {id: "sophiaess", pass: "hello"}
    const getid_pass = {id: req.body.id, pass: req.body.pass}

    const id_check = (setid_pass.id === getid_pass.id)?1:0
    const pass_check = (setid_pass.pass === getid_pass.pass)?1:0
    const check = (id_check+pass_check>1)?1:0
    const param = {
        check,
        id_check,
        pass_check
    }
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  });