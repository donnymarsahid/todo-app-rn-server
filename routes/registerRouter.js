const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const fs = require("fs");

const dataUsers = require("../data/data.json");

const saltRounds = 10;

router.post("/", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, password) => {
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
});

module.exports = router;
