import angular from "angular";
import angularRoute from "angular-route";
import signUpCtrl from "./js/controllers/signUpCtrl";
import router from "./js/router";

const appModule = angular.module("myApp", [angularRoute]);

appModule.config(router);
appModule.controller("signUpCtrl", signUpCtrl);
appModule.controller("signInCtrl", signUpCtrl);