import { getRequest } from "../API/api";

const mainPageCtrl = ($scope, $location) => {

    getRequest("isUserLogin").then(data => {
        if (data) {
          $location.path("/commenter");
          $scope.$apply();
        }
      });

    $scope.signUpRedirect = () => $location.path("/signUp");
    $scope.signInRedirect = () => $location.path("/signIn")
}

export default mainPageCtrl;