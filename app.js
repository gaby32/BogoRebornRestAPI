const express = require('express');
const logger = require('morgan');
const user = require('./routes/User');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');

const app = express();
var cors = require('cors');

app.use(cors());

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.json({"BogoRebornAPI" : "Rest"});
});

app.use('/User', user);
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      req.body.userId = decoded.id;
      next();
    }
  });
}

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.log(err);

  if(err.status === 404)
    res.status(404).json({message: "Not found"});
  else
    res.status(500).json({message: "Something looks wrong :déçu: !!!"});
});

app.listen(3000, function(){
  console.log('Node server listening on port 3000');
});