const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dataUsers = require("../data/data.json");

router.post("/", (req, res) => {
  const { username, password } = req.body;

  const authentifikasi = dataUsers.find((data) => {
    return data.username == username;
  });

  if (authentifikasi) {
    bcrypt.compare(password, authentifikasi.password, function (err, result) {
      if (result) {
        const data = authentifikasi.id;
        const token = jwt.sign({ data }, "jwtSecretDataTodoForToken", {
          expiresIn: 300,
        });
        res.json({ token: token, data: authentifikasi });
      } else {
        res.send({ message: "username/password is correct" });
      }
    });
  } else {
    res.send({ message: "username/password is wrong !" });
  }
});

module.exports = router;
