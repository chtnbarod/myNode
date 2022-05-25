const express = require('express')
var bodyParser = require('body-parser')

const app = express();


const router = express.Router()

var favicon = require('serve-favicon')
var path = require('path')

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
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

// router.get('/',function(req,res){
//   res.sendFile("public/view/home.html" , { root : __dirname });
// });

router.get('/', express.static('public'),function(req,res){
  // do something
   })

// router.get('/', function (req, res) {  
//   res.sendFile(__dirname + "/public/" + "index.html");
// }) 

app.use(express.json())
app.use('/', router)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.port || 3001;
app.listen(port);
console.log(`Running at  http://localhost:${port}`);


module.exports = app


