import { postRequest, getRequest } from "../API/api";

const commenterCtrl = ($scope, $rootScope, $location, $route) => {
  // console.log($rootScope.user)

  $scope.errorMessage = "";
  const errorMessage =
    "If you want add post, you should enter post title and content";

  $scope.createPost = () => {
    let currentUser;
    getRequest("currentUser").then(data => {
      currentUser = data;
    });
    const title = prompt("Please add Title to your post");
    const content = prompt("Please add Content for your post");

    if (title !== null && content !== null) {
      getRequest("posts").then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === currentUser.id) {
            const newPost = {
              postId: data[i].posts.length + 1,
              userName: `${currentUser.firstName} ${currentUser.lastName}`,
              title: title,
              content: content,
              comments: []
            };
            data[i].posts.push(newPost);
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
  };

  // $scope.user.firstName = firstName[0].toUpperCase() + firstName.slice(1);
  // $scope.user.lastName = lastName[0].toUpperCase() + lastName.slice(1);

  $scope.logout = () => {
    postRequest("curentUser", JSON.stringify({})).then(() => {
      localStorage.setItem("isUserLogin", false);
      $location.path("/");
      $scope.$apply();
    });
  };
};

export default commenterCtrl;
