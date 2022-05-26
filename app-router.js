const { Socket } = require('dgram')
const express = require('express')
var bodyParser = require('body-parser')

const app = express();


const router = express.Router()

var favicon = require('serve-favicon')
var path = require('path')

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

const http = require('http').createServer(app)

// middleware that is specific to this router
router.use((req, res, next) => {
  next()
})

// GET API
router.get('/get-api', async (req, res) => {
    res.send(req.body);
});

// POST API
router.post('/test', async (req, res) => {
  //res.send(res.json({requestBody: req.body}));
  res.send(`${JSON.stringify(req.body)}`);
});


// all view  path

router.get('/', express.static('public'))

router.get('/home',function(req,res){
  res.sendFile("public/view/home.html" , { root : __dirname });
});

app.use(express.json())
app.use('/', router)
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.port || 3001;
http.listen(port);
console.log(`Running at  http://localhost:${port}`);


const cors = require('cors')
app.use(cors())

module.exports = http


