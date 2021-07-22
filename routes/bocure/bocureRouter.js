const express = require("express")
const router = express.Router()
const jwtMiddleware = require("../utils/jwtMiddleware")
const {getAllBocures, addBocure, deleteBocure, getBocuresFromAPI, getBocureByKey} = require("./controller/bocureController")

router.get("/get-all-bocures",jwtMiddleware, getAllBocures)
router.post("/add-bocure", jwtMiddleware, addBocure)
router.delete("/delete-bocure/:id",jwtMiddleware, deleteBocure)
router.get("/get-bocures-from-api", jwtMiddleware,getBocuresFromAPI )
router.get("/get-bocure-by-key", getBocureByKey )

module.exports = router