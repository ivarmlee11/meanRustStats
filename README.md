This app is tracking stats for this server

http://rustorbust.org/stats/

JSON object I am getting data from

http://pwnserver.apmnerdery.com:8888/getPlayersGlobalStats


###### Controllers were getting executed twice. If you use the ui-router module for Angular the controller is already being passed into the view. I was accidentally using ng-controller="foo" within the view, thus executing the controller again ater the view had been loaded.. 

###### http://stackoverflow.com/questions/15535336/combating-angularjs-executing-controller-twice

###### Tech used: npm-cron, AngularJS 1.x, Mongoose, MongoDB...


// FROM: http://www.mongodb.org/display/DOCS/Updating#Updating-update%28%29
// 
// db.collection.update( criteria, objNew, upsert, multi )
//   criteria - query which selects the record to update;
//   objNew - updated object or $ operators (e.g., $inc) which manipulate the object
//   upsert - if this should be an "upsert"; that is, if the record does not exist, insert it
//   multi - if all documents matching criteria should be updated
//
// SQL VERSION: 
// UPDATE myTable SET dateField = '2011-01-01' WHERE condField = 'condValue'


###### db.myCollection.update({condField: 'condValue'}, { $set: { dateField: new Date(2011, 0, 1)}}, false, true);


###### https://gist.github.com/sym3tri/858142



###### D3 and AngularJs

###### http://busypeoples.github.io/post/reusable-chart-components-with-angular-d3-js/

###### More on AngularJS factoires vs services

###### http://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html

###### https://toddmotto.com/factory-versus-service

###### Understanding Dependency Injection

###### https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection

###### MongoDB query the DB for a value LIKE the search term entered

###### http://stackoverflow.com/questions/9824010/mongoose-js-find-user-by-username-like-value