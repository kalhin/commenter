import {
  getDataRequest,
  wtiteDataRequest
} from "../API/api";

const signUpCtrl = function ($scope, $window, $location, $rootScope) {

  $scope.errorMessage = "";

  $scope.user = {};
  const user = $scope.user;

  user.firstName = "";
  user.lastName = "";
  user.password = "";
  user.repeatPassword = "";

  $scope.userNamePattern = /^[a-zA-Z0-9_-]{3,15}$/; //low and up case and from 5 to 15 characters or numbers
  $scope.userPasswPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Minimum 6 characters, at least one letter and one number
  $scope.userRepeatPasswPattern = user.password;

  $scope.$watch("user.password", newValue => {
    $scope.userRepeatPasswPattern = newValue;
  });

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

  $scope.signUp = () => {
    getDataRequest()
      .then(data => {
        return new Promise((resolve, reject) => {
          if (!data.length) {
            data.push({
              id: 1,
              password: user.password,
              first_name: user.firstName,
              last_name: user.lastName
            });
            resolve(data);
            console.log("Data changed...");
          } else {
            if (checkIsExistData(data, user.firstName, user.lastName)) {
              $scope.errorMessage = `User ${user.firstName} ${user.lastName} already exist!`;
              setTimeout(() => {
                $scope.errorMessage = "";
                $scope.$apply();
              }, 3000);
              user.firstName = "";
              user.lastName = "";
              $scope.$apply();
              console.log("Request failed!");
              console.error("This name already exist")
              reject();
            } else {
              data.push({
                id: data[data.length - 1].id + 1,
                password: user.password,
                first_name: user.firstName,
                last_name: user.lastName
              });
              resolve(data);
              console.log("Data changed...");
            }
          }
          //   if (checkIsExistData(data, user.firstName, user.lastName)) {
          //     $scope.errorMessage = `User ${user.firstName} ${user.lastName} already exist!`;
          //     user.firstName = "";
          //     user.lastName = "";
          //     $scope.$apply();
          //     console.log("Request failed!");
          //     console.error("This name already exist")
          //     reject();
          //   } else {
          //     data.push({
          //       id: data[data.length - 1].id + 1,
          //       password: user.password,
          //       first_name: user.firstName,
          //       last_name: user.lastName
          //     });
          //     resolve(data);
          //     console.log("Data changed...");
          //   }
        });
      })
      .then(newData => {
        wtiteDataRequest(newData).then(() => {
          $location.path("/signIn");
          $scope.$apply();
        });
      });
  };

  const checkIsExistData = (data, userFirstName, userLastName) => {
    let bool;
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].first_name === userFirstName &&
        data[i].last_name === userLastName
      ) {
        bool = true;
        break;
      } else {
        bool = false;
      }
    }
    return bool;
  };

  $scope.signInRedirect = () => $location.path("/signIn");
};

export default signUpCtrl;