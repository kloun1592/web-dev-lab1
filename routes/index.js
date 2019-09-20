const express = require('express'),
      router = express.Router(),
      parser = require('./parser/parser');

router.get('/', function(req, res) {
    parser.getNews('https://vc.ru/')
      .then(news => {
          res.render('index', { titles: news });
      })
      .catch(() => {
          res.status(500).send('Error');
      })
});

module.exports = router;
