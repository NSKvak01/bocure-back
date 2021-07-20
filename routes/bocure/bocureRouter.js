const express = require("express")
const router = express.Router()
const jwtMiddleware = require("../utils/jwtMiddleware")
const {getAllBocures, addBocure, deleteBocure, getBocuresFromAPI} = require("./controller/bocureController")

router.get("/get-all-bocures", getAllBocures)
router.post("/add-bocure", addBocure)
router.delete("/delete-bocure/:id", deleteBocure)
router.get("/get-bocures-from-api", getBocuresFromAPI )

module.exports = router