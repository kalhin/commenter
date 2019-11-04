import angular from "angular";
import ngRoute from "angular-route";
import router from "./js/router";
import signUpCtrl from "./js/controllers/signUpCtrl";
import signInCtrl from "./js/controllers/signInCtrl";
import commenterFlowCtrl from "./js/controllers/commenterFlowCtrl";

const appModule = angular.module("myApp", [ngRoute]);

appModule.config(router);
appModule.controller("signUpCtrl", signUpCtrl);
appModule.controller("signInCtrl", signInCtrl);
appModule.controller("commenterFlowCtrl", commenterFlowCtrl);