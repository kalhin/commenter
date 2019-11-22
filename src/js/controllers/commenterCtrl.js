import { postRequest, getRequest } from "../API/api";

const commenterCtrl = ($scope, $rootScope, $location, $route) => {
  // console.log($rootScope.user)
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

    if (title !== "" && content !== "") {
      getRequest("posts").then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === currentUser.id) {
            const newPost = {
              postId: data[i].posts[0].postId + 1,
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

  


  

  // $scope.user.firstName = firstName[0].toUpperCase() + firstName.slice(1);
  // $scope.user.lastName = lastName[0].toUpperCase() + lastName.slice(1);

  $scope.logout = () => {
    postRequest("currentUser", JSON.stringify({})).then(() => {
      localStorage.setItem("isUserLogin", false);
      $location.path("/");
      $scope.$apply();
    });
  };
};

export default commenterCtrl;
