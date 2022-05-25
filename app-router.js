const express = require('express')
var bodyParser = require('body-parser')

const app = express();


const router = express.Router()

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


router.get('/',function(req,res){
  res.sendFile("public/home.html" , { root : __dirname });

});

app.use(express.json())
app.use('/', router)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.port || 3001;
app.listen(port);
console.log(`Running at  http://localhost:${port}`);


//module.exports = router


