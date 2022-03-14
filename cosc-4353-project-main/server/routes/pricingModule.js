const router = require("express").Router()
const mysql = require("../db");

router.get("/quote/:username/:gallons_req", async(req,res)=>
{
    const username = req.params.username;
    const gallons_req = req.params.gallons_req;
    const delivery_date = req.body;
    var state;
    var street;
    var city;
    var zipcode;

    try
    {
        
        const getState = await mysql.query("SELECT * from COSC4353.client_information where username =?", [username], (err,results) =>
        {
            if(err)
            {
                console.error(err.message)
                return res.status(400).json("Please complete profile");
            }
            
            else if (results.length == 0)
            {
                return res.status(400).json("Complete your profile");
                

            }
            
            else
            {
                state = results[0].state;
                street = results[0].street
                zipcode = results[0].zipcode
                city = results[0].city

    const pastOrders =  mysql.query("select * from COSC4353.fuelquote where username =?",[username], (err,results)=>{
                
        if(err)
        {
            console.error(err.message);
            return res.status(401);

        }
        
        var companyMargin = 0.1;
        var currentPrice = 1.50;
        var stateMargin;
        var rateHistoryMargin;
        var gallonsMargin;
        
        if(state == "TX")
        {
            stateMargin = 0.02;
        }
        else{
            stateMargin = 0.04;
        }

        if (gallons_req > 1000){
            gallonsMargin = 0.02;
        }
        else{
            gallonsMargin = 0.03;
        }
        

        if (results.length > 0)
        {     
            rateHistoryMargin = 0.01;
        }
        else
        {
            rateHistoryMargin = 0;
        }

        var margin = currentPrice * (stateMargin - rateHistoryMargin + gallonsMargin + companyMargin)
        var price = margin + currentPrice;
        var total = gallons_req * price;
        
        
            return res.status(200).json({
                data:
                {   username,
                    gallons_req,
                    state,
                    street,
                    city,
                    zipcode,
                    price,
                    total
                }
            });
    
    });
            }
        });

    }
    catch(err)
    {
        console.error(err.message);
    }
    
});


router.post("/submit", (req,res)=>
{
    const {username, 
        gallons_req, 
        state, 
        zipcode, 
        street, 
        price, 
        total, 
        city, 
        date} = req.body;

        const query = mysql.query("INSERT INTO COSC4353.fuelquote (username, gallons_req, state, zipcode, street, price, total, city, date) VALUES (?,?,?,?,?,?,?,?,?)" , [username, gallons_req, 
            state, zipcode, street, price, total, 
            city, date], (err,results)=>
            {
                if(err)
                {
                    console.error(err.message);
                }
                else
                {
                    res.status(200).json("Inserted Quote");
                    console.log(results);
                }

            })
});

module.exports = router;