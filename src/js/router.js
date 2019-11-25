const router = ($routeProvider, $locationProvider) => {
  $routeProvider
  // .when("/", {
  //   templateUrl: "src/views/commenter.html",
  //   controller: "commenterCtrl"
  // })
  .when("/", {
    templateUrl: "src/views/mainPage.html",
    controller: "mainPageCtrl"
  })
  .when("/signUp", {
    templateUrl: "src/views/signUp.html",
    controller: "signUpCtrl"
  })
  .when("/signIn", {
    templateUrl: "src/views/signIn.html",
    controller: "signInCtrl"
  })
  .when("/commenter", {
    templateUrl: "src/views/commenter.html",
    controller: "commenterCtrl"
  })
  .otherwise({
    redirectTo: "/"
  });
  $locationProvider.html5Mode(true);                        
};

export default router;
