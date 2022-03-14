const router = require("express").Router()
const mysql = require("../db")
const bcrypt = require('bcrypt');
const express = require("express");
const jwtGenerator = require('../utils/jwtGenerator')
const jwt = require('jsonwebtoken');
const valid = require("../middleware/valid")
const authorize = require("../middleware/authorize")

router.post("/register", valid, async (req,res) => 
{
    const {username,password}  = req.body;
    const salt =  await bcrypt.genSalt(10);
    const pwd =  await bcrypt.hash(password,salt);
    try 
    {
            let x = false
            const user = await mysql.query("select * from COSC4353.UserCredentials where username =?",[username], (err,results)=>
            {
                if(err){
                    console.error(err.message);
                    return res.status(401);

                }
                if (results.length > 0)
                {
                
                    return res.status(401).json("User already exists");
                
                }
                
                mysql.query("INSERT INTO COSC4353.UserCredentials (username, password)  VALUES(?,?);",[username,pwd] ,(error, results, fields) =>
                {
                    if(error)
                    {
                        return console.error(error.message);
                    }
                    else
                        var x =1;
                        const token = jwtGenerator(username);
                        res.json({token});
                }); 
            });



        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// login module

router.post("/login", valid,async (req,res)=>
{
    const {username,password}  = req.body;
    try 
    {
        mysql.query("SELECT * FROM COSC4353.UserCredentials WHERE username =?;",[username] ,function (err,rows)
        {
            if(err)
            {
                console.error(err.message);
                return res.status(401);
            }
            if (rows.length === 0)
            {
                return res.status(401).json("Username does not exist.");
            }
            
            bcrypt.compare(password, rows[0].password, function(err, result) {
                if(result)
                {
                    const token = jwtGenerator(username);
                    return res.json({token})
                }
                else
                {
                   var x =1
                    return res.status(401).json("Wrong credentials!");
                }
            });
        });
        
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verified", authorize, async(req,res) =>
{
    try 
    {
        res.json(true)
    } 
    catch (error) 
    {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports=router;