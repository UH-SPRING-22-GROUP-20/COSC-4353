const router = require("express").Router();
const mysql = require("../db");
const cors = require("cors")
// const { Router } = require("express");


router.use(cors());


//go to profile page with userID
// router.get("/:userID", async (req, res) =>{
//   const userID = req.params.userID;
//   try {
//     const user = await mysql.query("SELECT * FROM COSC4353.UserCredentials where userID = ?", [userID], (err, results)=>{
//       if(err) throw err;
//       console.log(results);
//     res.status(200).json({
//       status: "successss",
//       data:{
//         data: results
//       },
//     })
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error");

//     }
// })

//profile with username
router.get("/api/profileget", async (req, res) =>{ // ?username="username", :userame
  // const username = req.body.username;
  const username = req.params["username"]?  req.params["username"] : ""  // optional 
  // const username = req.query("username")
  try {
    const user = await mysql.query("SELECT * FROM client_information where username = ?; ",[username], (err, results)=>{
      if(err){
        console.error(err.message)
        return res.status(400).json("please complete")
      };
      res.status(200).json({
        status: "succcccess",
        results: results
    })
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");

    }
})


// submit client information
router.post("/update", async (req, res) => {
   // console.log(req.body);
    const {username, name, street, street2, city, state, zipcode} = req.body;

      try{
        const customer =  await mysql.query(
          "INSERT INTO client_information (username, name, street, street2, city,state,zipcode) VALUES (?, ?, ?, ?, ?, ?, ?);",
          [username, name, street, street2, city, state, zipcode],
          (err, results) =>{
            if (err) {
              console.error(err.message);
              return res.status(401);
            };
           // console.log(results);
            
            return res.send("Success!")
            
          });
          

        } catch (err) {
          console.log(err);
          res.status(500).send("Server Error");

          }
        });

// edit client information
router.put("/change", async (req, res) => {
  // console.log(req.body);
   const {username, name, street, street2, city, state, zipcode} = req.body;

     try{
       const customer =  await mysql.query(
         "INSERT INTO client_information (username, name, street, street2, city,state,zipcode) VALUES (?, ?, ?, ?, ?, ?, ?);",
         [username, name, street, street2, city, state, zipcode],
         (err, results) =>{
           if (err) {
             console.error(err.message);
             return res.status(401);
           };
          // console.log(results);
           
           return res.send("Success!")
           
         });
         

       } catch (err) {
         console.log(err);
         res.status(500).send("Server Error");

         }
       });

module.exports=router;