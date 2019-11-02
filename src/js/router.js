const router = function($routeProvider) {
  $routeProvider
  .when("/signUp", {
    templateUrl: "src/views/signUp.html",
    controller: "signUpCtrl"
  })
  .when("/signIn", {
    templateUrl: "src/views/signIn.html",
    controller: "signInCtrl"
  })
  .otherwise({
    redirectTo: '/'
  });
};

export default router;
