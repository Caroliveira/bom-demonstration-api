const express = require("express");
const router = express.Router();
const projects = require("./projects");

router.get("/projects/:id", projects.findById);
router.post("/projects", projects.create);
router.put("/projects/:id", projects.update);

module.exports = router;
