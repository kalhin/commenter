import { postRequest, getRequest } from "../API/api";

const headerComponent =
  ("headerComponent",
  {
    bindings: {
      user: "<"
    },

    template:
      "<div class='header'>" +
        "<div class='header__logo'>" +
          "<img src='../../src/img/logo.png' alt='logo'>" +
        "</div>" +
        "<div>" +
        "<h1 class='header__title'>ComMEnteR</h1>" +
        "<p class='header__userName'>{{$ctrl.user.firstName + ' ' + $ctrl.user.lastName}}</p>" +
        "</div>" +
        '<button class="btn" type="button" ng-click="logout()">Logout</button>' +
      "</div>",

      controller: function headerComponentCtrl($scope, $route, $location) {

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
