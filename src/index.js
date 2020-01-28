import angular from "angular";
import ngRoute from "angular-route";
import router from "./js/router";
import "./scss/main.scss";

import "./js/controllers/initCtrl";
import "./services/dataBaseService";

import userService from "./js/factory/factory";

import mainPageCtrl from "./js/controllers/mainPageCtrl";
import signUpCtrl from "./js/controllers/signUpCtrl";
import signInCtrl from "./js/controllers/signInCtrl";
import commenterCtrl from "./js/controllers/commenterCtrl";

import postsComponent from "./js/components/posts.component";
import postEditing from "./js/components/post.editing";
import headerComponent from "./js/components/header.component";
import footerComponent from "./js/components/footer.component";



const appModule = angular.module("myApp", [ngRoute]);

appModule.config(router);

appModule.factory("userService", userService);

appModule.controller("mainPageCtrl", mainPageCtrl);
appModule.controller("signUpCtrl", signUpCtrl);
appModule.controller("signInCtrl", signInCtrl);
appModule.controller("commenterCtrl", commenterCtrl);

appModule.component("postsComponent", postsComponent);
appModule.component("postEditing", postEditing);
appModule.component("headerComponent", headerComponent);
appModule.component("footerComponent", footerComponent);