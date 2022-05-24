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
const router = express.Router();
const port = process.env.port || 3001;



// view router
app.use('/', router);
app.use('/ab', router);

router.get('/',function(req,res){
    res.sendFile("public/home.html" , { root : __dirname });

  });

router.post("/ab" ,test_fun);

app.listen(port);
console.log(`Running at  http://localhost:${port}`);


function test_fun(){
    console.log("runing");
    return "Hello 481";
}

// const fs = require('fs');
// function test_fun(mJson) {

//     fs.mkdirSync("mtest")

//     var jsonObj = JSON.parse(mJson);

//     // stringify JSON Object
//     var jsonContent = JSON.stringify(jsonObj);
//     console.log(jsonContent);

//     try {
//         fs.writeFileSync("mtest/myJson.json" , jsonContent)
//         fs.close
//         console.log("File written successfully");
//       } catch(err) {
//         console.error(err + " error");
//       }

//  }

 // test_fun('{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}');
  
