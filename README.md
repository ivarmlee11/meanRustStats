
###### controllers were getting executed twice. if you use the ui-router module for Angular the controller is already being passed in to the view. i was accidentally using ng-controller=(the controller name) within the view- thus executing the controller twice. 

###### http://stackoverflow.com/questions/15535336/combating-angularjs-executing-controller-twice