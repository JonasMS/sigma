const { Router } = require('express');
const router = new Router();
const fs = require('fs');
const path = require('path');

// Paths
const outboxPath = path.join(__dirname, 'outbox.json');

router.get('/outbox', (req, res) => {
  console.log('hit outbox');
  fs.readFile(outboxPath, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

router.post('/outbox', (req, res) => {
  const body = JSON.stringify(req.body);
  fs.writeFile(outboxPath, body, err => {
    if (err) throw err;
    res.sendStatus(200);
  })
});

module.exports = router;
