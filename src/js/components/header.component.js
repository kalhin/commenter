import { postRequest, getRequest } from "../API/api";

const headerComponent =
  ("headerComponent",
  {
    template:
      "<div class='header'>" +
        "<div class='header__logo'>" +
          "<img src='../../src/img/logo.png' alt='logo'>" +
        "</div>" +
        "<h1 class='header__title'>ComMEnteR</h1>" +
        '<button class="btn" type="button" ng-click="logout()">Logout</button>' +
      "</div>",

      controller: function postEditingCtrl($scope, $route, $location) {
        $scope.logout = () => {
          postRequest("currentUser", JSON.stringify({})).then(() => {
            localStorage.setItem("isUserLogin", false);
            $location.path("/");
            $scope.$apply();
          });
        };
      }
  });

export default headerComponent;
