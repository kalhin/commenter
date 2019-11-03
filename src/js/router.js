const router = ($routeProvider, $locationProvider) => {
  $routeProvider
  .when("/", {
    templateUrl: "src/views/signUp.html",
    controller: "signUpCtrl"
  })
  .when("/signIn", {
    templateUrl: "src/views/signIn.html",
    controller: "signInCtrl"
  })
  .otherwise({
    redirectTo: "/"
  });
  $locationProvider.html5Mode(true);                        
};

export default router;
