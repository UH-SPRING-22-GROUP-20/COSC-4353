const router = require("express").Router();
const mysql = require("../db");
const cors = require("cors")

router.use(cors());

//profile with username
router.get("/api/profileget/:username", async (req, res) =>
{
  const username = req.params.username
  try 
  {
    const user = await mysql.query("SELECT * FROM COSC4353.client_information where username = ?; ",[username], (err, results)=>
    {
      if(err)
      {
        console.error(err.message)
        return res.status(400).json("please complete")
      };
      res.status(200).json({
        status: "succcccess",
        results: results
    })
    });
  } 
  catch (err) 
  {
    console.log(err);
    res.status(500).send("Server Error");

  }
})


// submit client information
router.post("/update", async (req, res) => 
{
    const {username, name, street, street2, city, state, zipcode} = req.body;
      try
      {
        const customer =  await mysql.query(
          "INSERT INTO COSC4353.client_information (username, name, street, street2, city,state,zipcode) VALUES (?, ?, ?, ?, ?, ?, ?);",
          [username, name, street, street2, city, state, zipcode],
          (err, results) =>
          {
            if (err) {
              console.error(err.message);
              return res.status(401);
            };
            return res.send("Success!")
          });
        } 
        catch (err) 
        {
          console.log(err);
          res.status(500).send("Server Error");
        }
        });

// edit client information
router.put("/change", async (req, res) => {
   const {username, name, street, street2, city, state, zipcode} = req.body;

     try
     {
       const customer =  await mysql.query(
         "INSERT INTO COSC4353.client_information (username, name, street, street2, city,state,zipcode) VALUES (?, ?, ?, ?, ?, ?, ?);",
         [username, name, street, street2, city, state, zipcode],
         (err, results) =>
         {
           if (err) 
           {
             console.error(err.message);
             return res.status(401);
           };
           return res.send("Success!")
           
         });
         

       } 
       catch (err) 
       {
         console.log(err);
         res.status(500).send("Server Error");
         }
       });

module.exports=router;