const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const fs = require("fs");

const dataUsers = require("../data/data.json");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  dataUsers.push({
    id: uuidv4(),
    username,
    password,
    create_at: moment(new Date()).format("LL"),
    activities: [],
  });
  res.send({ message: "success register" });
  fs.writeFileSync("data/data.json", JSON.stringify(dataUsers));
});

module.exports = router;
