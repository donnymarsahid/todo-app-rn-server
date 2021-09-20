const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const dataUsers = require("../data/data.json");

router.post("/", (req, res) => {
  const { username, password } = req.body;

  const authentifikasi = dataUsers.find((data) => {
    return data.username == username;
  });

  if (authentifikasi) {
    const data = authentifikasi.id;
    const token = jwt.sign({ data }, "jwtSecretDataTodoForToken", {
      expiresIn: 300,
    });
    res.json({ token: token, data: authentifikasi });
  } else {
    res.send({
      message: "username/password is wrong yeah !",
      username,
      testerTwo: authentifikasi,
    });
  }
});

module.exports = router;
