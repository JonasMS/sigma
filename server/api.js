const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => {
  console.log('req received');
  res.send();
});

module.exports = router;
