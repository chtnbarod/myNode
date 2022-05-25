// var mysql = require('mysql')
// var connection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database : "myTest"
// })




// // Connecting to database
// connection.connect(function(err) {
//     if(err){
//       console.log("Error in the connection")
//       console.log(err)
//     }
//     else{
//       console.log(`Database Connected`)
//       connection.query(`SHOW DATABASES`, 
//       function (err, result) {
//         if(err)
//           console.log(`Error executing the query - ${err}`)
//         else
//           console.log("Result: ",result) 
//       })
//     }
// })


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
  const book = req.body;
  console.log(`abc ${JSON.stringify(book)}`);
  res.send(`test calling ${test_fun(JSON.stringify(book))}`);
});

app.listen(port);
console.log(`Running at  http://localhost:${port}`);

'use strict';

const fs = require('fs');



function test_fun(mJson) {

    //fs.mkdirSync("mtest")

    var jsonObj = JSON.parse(mJson);

    // stringify JSON Object
    var jsonContent = JSON.stringify(jsonObj);
    console.log(jsonContent);

    try {
        fs.writeFileSync("myJson.json" , jsonContent)
        fs.close
        console.log("File written successfully");
      } catch(err) {
        console.log(err + " error");
      }


     // return `Not 2 ${mJson}`;  

      fs.readFileSync("./km.txt", "utf-8" , (err, data) => {
        return data;
      });

      return `Not 2 ${mJson}`;

 }  
