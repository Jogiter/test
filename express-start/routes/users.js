var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user', (req, res, next) => {
  res.send('Got a GET request at /user');
});

router.post('/user', (req, res) => res.send('Got a POST request at /user'));

module.exports = router;
