# Rust Server Stats Tracker

###### This is a MEAN app that tracks player stats for a computer game called Rust.
###### Tech used: AngularJS 1.X, Mongoose, MongoDB, NVD3(Plug and play D3 Chart Library), Node.js, Express.js
###### Server community site
###### http://rustorbust.org
###### Stats
###### http://pwnserver.apmnerdery.com:8888/getPlayersGlobalStats

### Install Instructions
###### Clone the repo
###### CD into root folder, run 'npm install' to install packages
###### Install MongoDB
###### Run 'npm install -g nodemon' to install nodemon, (for running the app locally)
###### Run 'npm install -g foreman' to install foreman, (for running the app locally with .env variables)
###### Change the server stats page URL located in the .env file to get hooked up to your stats
###### Change the server stats page URL located in the env.js file within the pubclic/app folder to hook up to your stats
###### Run 'nf run nodemon' in the root folder to spark up that local server!
###### Navigate to http://localhost:3000
---------------------------------------------------------
### Notes to self/things to improve
###### Controllers were getting executed twice. If you use the ui-router module for Angular the controller is passed into the view when you set up the router. I was accidentally using ng-controller="foo" within the view as well, thus executing the controller again ater the view had been loaded...

###### http://stackoverflow.com/questions/15535336/combating-angularjs-executing-controller-twice


###### When this redirect is enabled the response object I get from the 
GET request for player stats is HTML
```
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
```

###### AngularJS factories vs services

###### http://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html

###### https://toddmotto.com/factory-versus-service

###### Understanding Dependency Injection

###### https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection

###### MongoDB query the DB for a value LIKE the search term entered

###### http://stackoverflow.com/questions/9824010/mongoose-js-find-user-by-username-like-value

###### Accessing .env variables in the front-end(Angular)

###### http://www.jvandemo.com/how-to-configure-your-angularjs-application-using-environment-variables/

---------------------------------------------------------
######  The MIT License (MIT)
######  Copyright (c) 2016 Ivar Lee

######  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

######  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

######  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.