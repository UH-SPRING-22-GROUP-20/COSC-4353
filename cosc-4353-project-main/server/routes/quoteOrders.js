const router = require("express").Router();
const mysql = require("../db");
const cors = require("cors");

router.get("/", (req, res) => {
  res.send("Hello world!");
});

// submit fuel quote form
router.post("/fuelquoteform", async (req, res) => {
    console.log(req.body);
    const gallons = req.body.gallons;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    const delivery_date = req.body.delivery_date;
    const suggest_quote = req.body.suggest_quote;
      try{
        const customer =  await mysql.query(
          "INSERT INTO COSC4353.fuelquote (gallons_req, delivery_street, delivery_city, delivery_state, delivery_zipcode, delivery_date, suggest_quote) VALUES ( ?, ?, ?, ?, ?, ?, ?);",
          [gallons, street,city,state,zipcode,delivery_date, suggest_quote],
          (err, results) =>{
            if (err) {
              res.status(400).json({
                status: "This form has already been placed",
                data: results,
              });
              console.log({ message: "This form has already been placed!!" });
            };
            // console.log(results);
            return res.send("Success!")
  
            
          });
        } catch (err) {
          console.log(err);
          }
        });
  //get all quote history info
  router.get("/getquotehistory", (req, res) => {
    const sql = "SELECT * FROM COSC4353.order_history;";
    const query = mysql.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.status(400).json({
        status: "success",
        results,
      });
    });
  });

  //get pricing module info
  router.get("/api/v1/pricingmodule", (req, res) => {
    const sql = "SELECT * FROM COSC4353.state_price;";
    const query = mysql.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.status(400).json({
        status: "Success",
        results,
      });
    });
  });

///GET HISTORY
  router.get("/getorder/:username", async (req, res) =>
  {
    const username = req.params.username
    try 
    {
      const user = await mysql.query("SELECT * FROM COSC4353.fuelquote where username = ?; ",[username], (err, results)=>
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
    } catch (err) 
    {
      console.log(err);
      res.status(500).send("Server Error");
  
      }
  })

  module.exports=router;
