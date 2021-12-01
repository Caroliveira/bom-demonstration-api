const express = require("express");
const router = express.Router();
const edges = require("./edges");

router.get("/edges/:id", edges.findById);
router.post("/edges", edges.create);
router.put("/edges/:id", edges.update);

module.exports = router;
