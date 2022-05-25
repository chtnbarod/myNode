const express = require('express')

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// GET API
router.get('/get-api', async (req, res) => {
    res.send(req.body.name);
});

// POST API
router.post('/test', async (req, res) => {
  res.send(`${JSON.stringify(req.body)}`);
});


router.get('/',function(req,res){
  res.sendFile("public/home.html" , { root : __dirname });

});

const app = express();

app.use('/', app_API)

const port = process.env.port || 3001;
app.listen(port);
console.log(`Running at  http://localhost:${port}`);


//module.exports = router


