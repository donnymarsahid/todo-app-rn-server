const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const dataUsers = require('../data/data.json');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const findUserWithId = dataUsers.find((data) => {
    return data.id == id;
  });
  res.send(findUserWithId);
});

router.post('/:id', (req, res) => {
  const id = req.params.id;
  const { activity, date, time } = req.body;

  const findUser = dataUsers.find((data) => {
    return data.id == id;
  });

  findUser.activities.push({
    id: uuidv4(),
    activity,
    date,
    time,
    complete: '',
  });

  fs.writeFileSync('data/data.json', JSON.stringify(dataUsers));
  res.send(findUser);
});

// Complete
router.put('/complete/:id', (req, res) => {
  const id = req.params.id;

  const activityUser = req.body.activity;

  const findUser = dataUsers.find((data) => {
    return data.id == id;
  });

  const findActivities = findUser.activities.find((activity) => {
    return activity.activity == activityUser;
  });

  if (activityUser) {
    findActivities.complete = moment(Date.now()).format('LLL');
  }

  fs.writeFileSync('data/data.json', JSON.stringify(dataUsers));
  res.send({ message: 'success complete' });
});

// Delete
router.delete('/delete/:idUser', (req, res) => {
  const idUser = req.params.idUser;
  const indexUserActivity = req.body.indexUserActivity;

  const findUser = dataUsers.find((data) => {
    return data.id == idUser;
  });

  findUser.activities.splice(indexUserActivity, 1);

  res.send({ message: 'success delete' });
  fs.writeFileSync('data/data.json', JSON.stringify(dataUsers));
});

router.put('/update/:idUser', (req, res) => {
  const idUser = req.params.idUser;
  const { idUserActivity, activityUser, date, time } = req.body;

  const findUserWithId = dataUsers.find((data) => {
    return data.id == idUser;
  });

  const findUserActivity = findUserWithId.activities.find((data) => {
    return data.id == idUserActivity;
  });

  if (activityUser) {
    findUserActivity.activity = activityUser;
  }
  if (date) {
    findUserActivity.date = date;
  }
  if (time) {
    findUserActivity.time = time;
  }
  res.send({ message: 'success update todo ' });
});

module.exports = router;
