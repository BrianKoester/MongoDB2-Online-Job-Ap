## MongoDB2: Online Job Application

#### Objective
You are the CTO of Omega 3 Studios. You need to hire some badass web developers, and you decide to create an online job application.

#### Skills
* Node.js
* Express.js
* MongoDB
* jQuery
* Jade

#### Resources
* [mongodb.org](http://docs.mongodb.org/manual/contents/)
* [Mongo Collection Commands](http://docs.mongodb.org/manual/reference/method/js-collection/)
* [Mongoose](http://mongoosejs.com/)

#### Requirements
#### Part I (Submitting the Form)

1. Grab the starter code from [here](https://github.com/RefactorU/exercise-starters/tree/master/mongodb/job-application).
2. Let's start by getting the data to submit to the server. Write some client-side JS to serialize the form on submit __$('#myform').serialize()__ and send the data to the post endpoint __/applicant__ via AJAX __$.post()__
3. In the __/applicant__ route console.log() the data __req.body__
4. Send a response back to the client like this __res.send({success : 'Success!'})__;
5. Write some jQuery to show the hidden success message located in index.jade when you the client receives a response in the __$.post__ call

#### Part II (MongoDB)

1. Install Mongoose in your project __npm install mongoose --save__.
2. Include Mongoose in your app.js on the server __var mongoose = require('mongoose')__;
3. Call __.connect()__ to connect to MongoDB. Give your DB a name and connect __mongoose.
  ```
  connect('mongodb://localhost/mycompanyname');
  ```
4. Start Mongodb by running sudo mongod in a new Terminal tab
5. Based on the data received from the client in the "/applicant" endpoint, think about how you would structure the data in the database. Create a Mongoose model based on how the data should be structured. For example :
  ```
  var Cat = mongoose.model('Cat', { name: String });
  ```

  Remember that Mongoose will not create the database or the collections until you attempt to insert something into the database.
  
  __You should see this after completing #2 in Part III__



#### Part III (Storing the data)

1. Now lets go back to the __/applicant__ endpoint.
2. Store the recieved data from __req.body__ in your "applicants" model that you previously created
  ```
  var kitty = new Cat({ name: 'Zildjian' }); kitty.save()
  ```

  Use the example on the Mongoose homepage to guide you [http://mongoosejs.com](http://mongoosejs.com/)

3. Go into your Mongo Shell and see if the data was successfully stored after the form is submitted. __db.applicants.find()__
  
  Run these commands in Mongo Shell to see your new DB and collection
  * __show dbs__
  * __use applications__
  * __show collections__

  You have successfuly submitted a form and stored the data in a database!

#### Part IV (Listing the applicants)

1. Now in the __/applicants__ route, lets pull out all of our applicants from your "applicants" collection
  ```Cat.find({}, ...)
  ```

2. Take that data and pass it to the "applicants" view using __res.render('applicants', data)__
3. In the applicants.jade file, write some jade to loop through the applicants you are passing and output the name of the applicant in a list.
4. Once you have written the jade logic to list out the applicants you should be able to hit [http://localhost:3000/applicants](http://localhost:3000/applicants) and see a list of the submitted applications

#### Bonus I

1. Add a delete button to each of your applicant names in the applicants list __/applicants__
2. When the button is clicked, send an AJAX request to the server to delete the item from your Mongo Collection
3. When the client receives the response from the server, remove the item from the list

#### Bonus II (Application renderer)

1. Create a jade file that can render and job applicant.
2. Create a route that renders your new jade file and passes applicant data to it. This route should look like "/:userid". In Express this route will take anything that is passed to it and the :userid is accessed by using __req.params__
3. In your list that displays your applicants. Make each name a link.
4. When you click on this link it should go to a route that looks something like __"/5266ec1d3939f24149000001"__

  __Success!__ You have successfully built a fully functional web app!
