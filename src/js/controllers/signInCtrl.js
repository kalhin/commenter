import { getDataRequest, postRequest } from "../API/api";

const signInCtrl = function($scope, $window, $location, $rootScope) {

  $scope.errorMessage = "Please fill in this form to enter account.";

  $rootScope.user = {};
  $scope.user = {};
  const user = $scope.user;

  user.firstName = "";
  user.lastName = "";
  user.password = "";

  $scope.userNamePattern = /^[a-zA-Z0-9_-]{3,15}$/; //low and up case and from 5 to 15 characters or numbers
  $scope.userPasswPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Minimum 6 characters, at least one letter and one number

  $scope.showPassw = $event => {
    $event.target.parentNode
      .querySelector("input")
      .setAttribute("type", "text");
    const imgUrl = $event.target.getAttribute("src");
    const img = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
    const input = $event.target.parentNode.querySelector("input");
    img !== "view.png"
      ? ($event.target.setAttribute("src", "../../src/img/view.png"),
        input.setAttribute("type", "password"))
      : ($event.target.setAttribute("src", "../../src/img/hide.png"),
        input.setAttribute("type", "text"));
  };

  $scope.signIn = () => {
    getDataRequest().then(data => {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].first_name === user.firstName &&
          data[i].last_name === user.lastName &&
          data[i].password === user.password
        ) {
          $rootScope.user.firstName = user.firstName;
          $rootScope.user.lastName = user.lastName;
          $rootScope.user.id = data[i].id;

          postRequest("isUserLogin", true).then(() => {
            $location.path("/commenter");
            $scope.$apply();
          });
          break;
        } else {
          if (
            data[i].first_name === user.firstName &&
            data[i].last_name === user.lastName &&
            data[i].password !== user.password
          ) {
            $scope.errorMessage = `Wrong password! Please check it.`;
            $scope.$apply();
            break;
          } else if (
            data[i].first_name === user.firstName &&
            data[i].last_name !== user.lastName &&
            data[i].password === user.password
          ) {
            $scope.errorMessage = `Wrong last name: ${user.lastName}! Please check it.`;
            $scope.$apply();
            break;
          } else if (
            data[i].first_name !== user.firstName &&
            data[i].last_name === user.lastName &&
            data[i].password === user.password
          ) {
            $scope.errorMessage = `Wrong first name: ${user.firstName}! Please check it.`;
            $scope.$apply();
            break;
          } else {
            $scope.errorMessage = `User: ${user.firstName} ${user.lastName} does not exist!`;
            $scope.$apply();
          }
        }
      }
    });
  };

  $scope.signUpRedirect = () => $location.path("/signUp");
};

export default signInCtrl;
