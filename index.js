const express = require('express');
const app = express();
const router = express.Router();


// Configuring body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  // view router
  app.use('/', router);

  router.get('/',function(req,res){
      res.sendFile("public/home.html" , { root : __dirname });

    });


  // api router
  router.post('/test', (req, res) => {
    return `${JSON.stringify(req.body)}`;
  });


// Running server
const port = process.env.port || 3001;
app.listen(port);
console.log(`http://localhost:${port}`);
