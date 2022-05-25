const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.port || 3001;



// view router
app.use('/', router);


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',function(req,res){
    res.sendFile("public/home.html" , { root : __dirname });

  });

app.post('/test', (req, res) => {
  return `${JSON.stringify(req.body)}`;
});

app.listen(port);
console.log(`Running at  http://localhost:${port}`);
