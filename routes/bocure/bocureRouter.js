const express = require("express")
const router = express.Router()
const jwtMiddleware = require("../utils/jwtMiddleware")
const {getAllBocures, addBocure, deleteBocure, getBocuresFromAPI, getBocureByKey} = require("./controller/bocureController")

router.get("/get-all-bocures", getAllBocures)
router.post("/add-bocure", addBocure)
router.delete("/delete-bocure/:id", deleteBocure)
router.get("/get-bocures-from-api", getBocuresFromAPI )
router.get("/get-bocure-by-key", getBocureByKey )

module.exports = router