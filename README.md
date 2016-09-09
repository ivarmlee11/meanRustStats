
###### Controllers were getting executed twice. If you use the ui-router module for Angular the controller is already being passed into the view. I was accidentally using ng-controller="foo" within the view, thus executing the controller again ater the view had been loaded.. 

###### http://stackoverflow.com/questions/15535336/combating-angularjs-executing-controller-twice

###### Tech used: npm-cron, AngularJS 1.x, Mongoose, MongoDB, 
