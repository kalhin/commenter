import {
  getDataRequest,
  postRequest
} from "../API/api";

const signInCtrl = function ($scope, $window, $location, $rootScope) {
  $scope.errorMessage = "";

  $rootScope.user = {};
  $scope.user = {};
  // const user = $scope.user;

  $scope.user.firstName = "";
  $scope.user.lastName = "";
  $scope.user.password = "";

  $scope.userNamePattern = /^[a-zA-Z0-9_-]{3,15}$/; //low and up case and from 3 to 15 characters or numbers
  $scope.userPasswPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Minimum 6 characters, at least one letter and one number

  $scope.showPassw = $event => {
    $event.target.parentNode
      .querySelector("input")
      .setAttribute("type", "text");
    const imgUrl = $event.target.getAttribute("src");
    const img = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
    const input = $event.target.parentNode.querySelector("input");
    img !== "view.png" ?
      ($event.target.setAttribute("src", "../../src/img/view.png"),
        input.setAttribute("type", "text")) :
      ($event.target.setAttribute("src", "../../src/img/hide.png"),
        input.setAttribute("type", "password"));
  };

  $scope.signIn = () => {
    getDataRequest().then(data => {
      if (!data.length) {
        console.log("REDIRECT")
        $scope.errorMessage = `User: ${$scope.user.firstName} ${$scope.user.lastName} does not exist!`;
        $scope.$apply()
        hideErrorMessage();
        setTimeout(() => {
          $location.path("/signUp")
          $scope.$apply()
        }, 3000);
      } else {
        console.log("FINED USER")
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].first_name === $scope.user.firstName &&
            data[i].last_name === $scope.user.lastName &&
            data[i].password === $scope.user.password
          ) {
            postRequest(
              "currentUser",
              JSON.stringify({
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                id: data[i].id
              })
            ).then(() => {
              localStorage.setItem("isUserLogin", true);
              $location.path("/commenter");
              $scope.$apply();
            });

            break;
          } else {
            if (
              data[i].first_name === $scope.user.firstName &&
              data[i].last_name === $scope.user.lastName &&
              data[i].password !== $scope.user.password
            ) {
              $scope.errorMessage = `Wrong password! Please check it.`;
              $scope.$apply();
              hideErrorMessage();
              break;
            } else if (
              data[i].first_name !== $scope.user.firstName &&
              data[i].last_name === $scope.user.lastName &&
              data[i].password === $scope.user.password
            ) {
              $scope.errorMessage = `Wrong first name: ${$scope.user.firstName}! Please check it.`;
              $scope.$apply();
              hideErrorMessage();
              break;
            } else if (
              data[i].first_name === $scope.user.firstName &&
              data[i].last_name !== $scope.user.lastName &&
              data[i].password === $scope.user.password
            ) {
              $scope.errorMessage = `Wrong last name: ${$scope.user.lastName}! Please check it.`;
              $scope.$apply();
              hideErrorMessage();
              break;
            } else if (i === data.length - 1) {
              $scope.errorMessage = `User: ${$scope.user.firstName} ${$scope.user.lastName} does not exist!`;
              $scope.$apply();
              hideErrorMessage();
              break;
            } else {
              continue;
            }
          }
        }
      }
    });
  };

  const hideErrorMessage = () => {
    setTimeout(() => {
      $scope.errorMessage = "";
      $scope.$apply();
    }, 3000)
  };

  $scope.signUpRedirect = () => $location.path("/signUp");
};

export default signInCtrl;