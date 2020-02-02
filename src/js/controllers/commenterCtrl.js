import { postRequest, getRequest } from "../API/api";
// import  userService from "../factory/factory";

const commenterCtrl = function(
  userService,
  $scope,
  $rootScope,
  $location,
  $route
) {
  $scope.postTitle = "";
  $scope.postContent = "";
  $scope.isCreatingPost = false;
  $scope.isAddingPost = false;
  $scope.isPosting = false;
  $scope.errorMessage = "";
  $scope.currentUser;
  const errorMessage =
    "If you want add post, you should enter post title and content";

  getRequest("currentUser").then(data => {
    $scope.currentUser = data;
    $scope.$apply();
  });

  $scope.addPost = () => {
    $scope.isCreatingPost = true;
    $scope.isAddingPost = true;
  };

  $scope.createPost = () => {
    $scope.isPosting = true;
    const title = $scope.postTitle;
    const content = $scope.postContent;
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    if (title !== "" && content !== "") {
      getRequest("posts").then(data => {
        const dateOfCreating = new Date();
        if (!data.length) {
          const newPost = {
            dateOfCreating: dateOfCreating,
            userId: $scope.currentUser.id,
            postId:
              $scope.currentUser.id +
              alphabet[Math.floor(Math.random() * alphabet.length)] +
              Math.floor(Math.random() * 10), //generate ID like '2f5'
            title: title,
            content: content
          };
          data.push(newPost);
          postRequest("posts", JSON.stringify(data)).then(() => {
            $route.reload();
          });
        } else if (!data.find(index => index.id === $scope.currentUser.id)) {
          const newPost = {
            dateOfCreating: dateOfCreating,
            userId: $scope.currentUser.id,
            postId:
              $scope.currentUser.id +
              alphabet[Math.floor(Math.random() * alphabet.length)] +
              Math.floor(Math.random() * 10), //generate ID like '2f5'
            // userName: `${$scope.currentUser.firstName} ${$scope.currentUser.lastName}`,
            title: title,
            content: content
          };
          data.unshift(newPost);
          postRequest("posts", JSON.stringify(data)).then(() => {
            $route.reload();
          });
        } else {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === $scope.currentUser.id) {
              const newPost = {
                dateOfCreating: dateOfCreating,
                userId: $scope.currentUser.id,
                postId:
                  $scope.currentUser.id +
                  alphabet[Math.floor(Math.random() * alphabet.length)] +
                  Math.floor(Math.random() * 10), //generate ID like '2f5'
                // userName: `${$scope.currentUser.firstName} ${$scope.currentUser.lastName}`,
                title: title,
                content: content
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
        }
      });
    } else {
      $scope.errorMessage = errorMessage;
      $scope.isPosting = false;
      setTimeout(() => {
        $scope.errorMessage = "";
        $scope.$apply();
      }, 5000);
    }
  };

  $scope.canselCreatingPost = () => {
    $scope.isCreatingPost = false;
    $scope.isAddingPost = false;
    $scope.postTitle = "";
    $scope.postContent = "";
    $scope.isPosting = false;
  };
};

export default commenterCtrl;
