import { postRequest, getRequest } from "../API/api";

const commenterCtrl = function($scope, $rootScope, $location, $route) {

  $scope.postTitle = "";
  $scope.postContent = "";
  $scope.isCreatingPost = false;
  $scope.isAddingPost = false;
  $scope.errorMessage = "";
  const errorMessage =
    "If you want add post, you should enter post title and content";

  let currentUser;
  getRequest("currentUser").then(data => {
    currentUser = data;
  });

  $scope.addPost = () => {
    $scope.isCreatingPost = true;
    $scope.isAddingPost = true;
  }

  $scope.createPost = () => {
    const title = $scope.postTitle;
    const content = $scope.postContent;
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    if (title !== "" && content !== "") {
      getRequest("posts").then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === currentUser.id) {
            const newPost = {
              postId: currentUser.id + alphabet[Math.floor(Math.random() * alphabet.length)] + Math.floor(Math.random() * 10), //generate ID like '2f5'
              userName: `${currentUser.firstName} ${currentUser.lastName}`,
              title: title,
              content: content,
              comments: []
            };
            data[i].posts.unshift(newPost);
            postRequest("posts", JSON.stringify(data)).then(() => {
              $route.reload();
            });

            break;
          } else {
            continue;
          }
        }
      });
    } else {
      $scope.errorMessage = errorMessage;
      setTimeout(() => {
        $scope.errorMessage = "";
        $scope.$apply();
      }, 5000);
    }
  }

  $scope.canselCreatingPost = () => {
    $scope.isCreatingPost = false;
    $scope.isAddingPost = false;
    $scope.postTitle = "";
    $scope.postContent = "";
  }

  $scope.logout = () => {
    postRequest("currentUser", JSON.stringify({})).then(() => {
      localStorage.setItem("isUserLogin", false);
      $location.path("/");
      $scope.$apply();
    });
  };
};

export default commenterCtrl;
