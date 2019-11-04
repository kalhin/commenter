const signInCtrl = function($scope, $window, $location) {
  const vm = this;

  const userName = localStorage.getItem("userName");
  const userPassw = localStorage.getItem("userPassw");

  $scope.user = {};
  let user = $scope.user;

  user.name = "";
  user.password = "";
  user.isRememberPassword = true;

  const inputField = document.querySelectorAll("input");

  $scope.$watch("user.isRememberPassword", newValue => {
    user.isRememberPassword = newValue;
    console.log(user.isRememberPassword);
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

  $scope.signIn = () => {
    if (userName === inputField[0].value && userPassw === inputField[1].value) {
      api(user.isRememberPassword);
      $location.path("/commenter");
      console.log("set data to local storage");
    } else if (
      userName !== inputField[0].value &&
      userPassw === inputField[1].value
    ) {
      inputField[0].setAttribute("class", "red-border");
      inputField[1].classList.remove("red-border");
    } else if (
      userName === inputField[0].value &&
      userPassw !== inputField[1].value
    ) {
      inputField[1].setAttribute("class", "red-border");
      inputField[0].classList.remove("red-border");
    } else {
      inputField[0].setAttribute("class", "red-border");
      inputField[1].setAttribute("class", "red-border");
    }
  };

  const api = isRememberPassword => {
    localStorage.setItem("isRememberPassword", isRememberPassword);
  };
};

export default signInCtrl;
