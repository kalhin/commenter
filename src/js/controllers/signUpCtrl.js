const signUpCtrl = function($scope, $window, $location) {
  const vm = this;

  const userNameRegexp = new RegExp(/^[a-zA-Z0-9_-]{5,15}$/); //low and up case and from 5 to 15 characters or numbers
  const userPasswRegexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/); // Minimum 6 characters, at least one letter and one number

  $scope.user = {};
  let user = $scope.user;

  user.name = "";
  user.isUserNameValidate = false;

  user.password = "";
  user.isUserPasswValidate = false;

  user.repeatPassword = "";
  user.isRepeatPasswValidate = false;

  const inputField = document.querySelectorAll("input");

  $scope.$watch("user.name", newValue => {
    user.isUserNameValidate = userNameRegexp.test(newValue);

    !user.isUserNameValidate && newValue.length
      ? inputField[0].setAttribute("class", "red-border")
      : inputField[0].classList.remove("red-border");

    // console.log(user.isUserNameValidate);
  });

  $scope.$watch("user.password", newValue => {
    user.isUserPasswValidate = userPasswRegexp.test(newValue);

    !user.isUserPasswValidate && newValue.length
      ? inputField[1].setAttribute("class", "red-border")
      : inputField[1].classList.remove("red-border");

    // console.log(user.isUserPasswValidate);
  });

  $scope.$watch("user.repeatPassword", newValue => {
    user.password === newValue && user.password !== null
      ? (user.isRepeatPasswValidate = true)
      : (user.isRepeatPasswValidate = false);

    !user.isRepeatPasswValidate && newValue.length
      ? inputField[2].setAttribute("class", "red-border")
      : inputField[2].classList.remove("red-border");

    // console.log(user.isRepeatPasswValidate);
  });

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

  $scope.signUp = () => {
    if (
      user.isUserNameValidate &&
      user.isUserPasswValidate &&
      user.isRepeatPasswValidate
    ) {
      api(user.name, user.password); //need add promise
      $location.path("/signIn");
      console.log("set data to local storage");
    } else {
      console.error("form not validate");
    }
  };

  const api = (userName, userPassw) => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userPassw", userPassw);
  };
};

export default signUpCtrl;
