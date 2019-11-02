const signUpCtrl = function($scope, $window) {
    $window.location.href = '/signUp';
  const vm = this;

  const userNameRegexp = new RegExp(/^[a-zA-Z0-9_-]{5,15}$/); //low and up case and from 5 to 15 characters or numbers
  const userPasswRegexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/); // Minimum 6 characters, at least one letter and one number

  $scope.user = {};
  let user = $scope.user;

  user.name = null;
  user.isUserNameValidate = false;
  user.nameErrorMessage = null;
  let nameErrorMessage = "must be from 5 to 15 digits or letters of the Latin alphabet";

  user.password = null;
  user.isUserPasswValidate = false;
  user.passwErrorMessage = null;
  let passwErrorMessage = "must be minimum 6 characters, at least one letter and one number"

  user.repeatPassword = null;
  user.isRepeatPasswValidate = false;
  user.repeatPasswErrorMessage = null;
  const repeatPasswErrorMessage = "password does not match"

  user.isRememberPassword = true;

  $scope.$watch("user.name", function(newValue) {
    user.isUserNameValidate = userNameRegexp.test(newValue);
    console.log(user.isUserNameValidate);
  });

  $scope.$watch("user.password", function(newValue) {
    user.isUserPasswValidate = userPasswRegexp.test(newValue);
    console.log(user.isUserPasswValidate);
  });

  $scope.$watch("user.repeatPassword", function(newValue) {
    user.password === newValue && user.password !== null
      ? (user.isRepeatPasswValidate = true)
      : (user.isRepeatPasswValidate = false);
    console.log(user.isRepeatPasswValidate);
  });

  $scope.signUp = function() {
    user.isUserNameValidate &&
    user.isUserPasswValidate &&
    user.isRepeatPasswValidate
      ? console.log(true)
      : console.log(false);
  };

};

export default signUpCtrl;

