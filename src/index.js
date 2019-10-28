// import "./css/main.css"
const angular = require("angular");
const appModule = angular.module("myApp", []);

appModule.controller("appCtrl", function($scope) {
    $scope.name = "Hello"
});