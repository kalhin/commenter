import {
  getRequest,
  postRequest
} from "../API/api";

const postCommenting =
  ("postCommenting", {
    bindings: {
      id: "=",
      user: "<"
    },
    templateUrl: "postCommenting.html",

    controller: function postCommentingCtrl($scope, $route) {
      $scope.comment = "";
      $scope.isLeavingPost = false;
      $scope.placeholderErrorMessage = "Leave your comment here";
      const currentUserData = $scope.$parent.$parent.$parent.$parent.currentUser;
      const currentUserId = currentUserData.id;
      const currentUser = `${currentUserData.firstName} ${currentUserData.lastName}`;

      $scope.leavingComment = event => {
        
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        if ($scope.comment.length === 0) {
          $scope.placeholderErrorMessage = "If you want add comment, you should enter comment here";
          $scope.isLeavingPost = false;
        } else {
          $scope.isLeavingPost = true;
          console.log('id', this)
          getRequest("comments").then(data => {
            console.log(data)
            const dateOfCreating = new Date();
            const newComment = {
              dateOfCreating: dateOfCreating,
              commentOwnerId: currentUserId,
              postId: this.id,
              commentId: "C" + currentUserId + alphabet[Math.floor(Math.random() * alphabet.length)] + Math.floor(Math.random() * 10),
              commentOwnerName: currentUser,
              content: $scope.comment
            }
            data.push(newComment);
            postRequest("comments", JSON.stringify(data)).then(() => {
              $route.reload();
            });
          })
        }
      }

      $scope.canselCommentingPost = () => {
        this.id = null;
      }
    }
  });

export default postCommenting;