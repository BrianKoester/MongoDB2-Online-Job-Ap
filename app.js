/***
* Server Side JS
***/

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// MongoDB
// Create to the DB if it doesn't exist and connect to it
mongoose.connect('mongodb://localhost/omega');

// setup and define mongoDB collection
var Applicant = mongoose.model('Applicant', { 	  name: String,
											       bio: String,
										        skills: String,
											     years: Number,
											       why: String });


//renders the index page
app.get('/', function(req, res){
	res.render('index')
});


//displays a list of applicants
app.get('/applicants', function(req, res){

   //Pull everything from our Applicant collection and send it to the client
    Applicant.find({}, function(err, data){
        //send the applicant data to the client using res.render as an array (renders the applicants.jade file)
        res.render('applicants', {newApplicants : data})
    });

});


// creates a new Applicant
app.post('/applicant', function(req, res){
	var newApplicant = new Applicant({     name: req.body.name,
											bio: req.body.bio,
								         skills: req.body.skills,
									      years: req.body.years,
									        why: req.body.why });
	newApplicant.save();
	res.send({success: 'Success!'});

});


// delete a selected Applicant
app.post('/delete', function(req, res){
	var deleteApplicant = req.body.name;
	//var deleteApplicantFound = db.Applicant.find({name: deleteApplicant});

	Applicant.findOneAndRemove({name: deleteApplicant}, function(err, doc) {
		console.log('found and remove ', doc);
		res.send({success: 'Success!'});

	});

});


// selects a unique applicant and displays info
app.get('/:userid', function(req,res) {
  var userId = req.params.userid;

  if(userId) {

    Applicant.findById(userId, function(err, data){
        console.log('User ', data);

        //send the Applicant data to the client using res.render
        res.render('applicant', data);
    });

  }
  else {
    res.send('The user ID you entered is not valid.');
  }

});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
