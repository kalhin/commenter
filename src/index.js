import angular from "angular";
import ngRoute from "angular-route";
import router from "./js/router";

import "./js/controllers/initCtrl";
import "./services/dataBaseService";

import mainPageCtrl from "./js/controllers/mainPageCtrl";
import signUpCtrl from "./js/controllers/signUpCtrl";
import signInCtrl from "./js/controllers/signInCtrl";
import commenterCtrl from "./js/controllers/commenterCtrl";

import postsComponent from "./js/components/posts.component";



const appModule = angular.module("myApp", [ngRoute]);

appModule.config(router);

appModule.controller("mainPageCtrl", mainPageCtrl);
appModule.controller("signUpCtrl", signUpCtrl);
appModule.controller("signInCtrl", signInCtrl);
appModule.controller("commenterCtrl", commenterCtrl);

appModule.component("postsComponent", postsComponent);