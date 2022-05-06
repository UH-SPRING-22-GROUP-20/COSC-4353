const router = require("express").Router();
const mysql = require("../db")

const auth = require("../middleware/authorize")

router.get("/", auth , async (req,res) =>
{
    try {
        res.json(req.user);
    } catch (err) {
        console.error(err.message);
    }
})



module.exports = router;