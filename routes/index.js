var express = require('express');
var router = express.Router();
var request = require('request');
var parseString = require('xml2js').parseString;

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.post('/rss',function(req,res,next){
  var topic = req.body.topic;
  var data;
  var index={
    topstories:'topstories',
    mostRecentStrories:'/1221656',
    india:'/-2128936835',
    world:'/296589292'
  }
  if(topic=='top stories'){
    data=index.topstories;
  }
  if(topic=='most recent stories'){
    data=index.mostRecentStrories;
  }
  if(topic =='india'){
    data=index.india;
  } 
  if(topic== "world"){
    data=index.world;
  }
  const options = {
    
        method: 'GET',
    
        uri: 'https://timesofindia.indiatimes.com/rssfeeds'+data+'.cms',
    
        headers: { 'User-Agent': 'test' },
    
        json: true
    
  }
  request(options,function(err, response, xml){
    parseString(xml, function (err, result) {
          res.send(result)
      });
  }); 
})

module.exports = router;

 