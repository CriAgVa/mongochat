var express = require('express');
var router = express.Router();

const formidable = require('formidable');
var mongoose = require("mongoose");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Salas de chat' });
});

/* GET home page. */
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'MongoChat' });
});

/* GET home page. */
router.get('/chat/s:sala', function(req, res, next) {
  var sala = req.params.sala;
  res.render('chat', { title: 'Sala '+sala, sala: sala });
});



module.exports = router;
