import { getRequest, postRequest } from "../API/api";

const postsComponent =
  ("postsComponent",
  {
    // templateUrl: "../../views/post",
    template:
      "<div class='post' id={{post.postId}} ng-repeat='post in $ctrl.posts'>" +
        "<div class='post__userBlock'>" +
          "<h2 class='post__userName'>{{post.userName}}</h2>" +
          "<div ng-show={{post.isCurrentUser}}>" +
            `<button ng-class="post.postId == $ctrl.editingId ? 'btn-disabled btn-big' : 'btn btn-big'" ng-disabled="post.postId == $ctrl.editingId" ng-click="editPost(post.postId, $event)">Edit post</button>` +
            `<button ng-class="isRemovingPost ? 'btn-disabled btn-big' : 'btn btn-big'" ng-click='removePost(post.postId)' ng-disabled='isRemovingPost'>Remove post</button>` +
          "</div>" +
        "</div>" +
        "<div class='post__postBlock'>" +
          "<h3 class='post__title'>{{post.title}}</h3>" +
          "<p class='post__content'>{{post.content}}</p>" +
          "<post-editing  id='$ctrl.editingId' ng-if='post.postId == $ctrl.editingId'></post-editing>" +
        "</div>" +
      "</div>",  

    controller: function postCtrl($scope, $route) {
      $scope.currentUserId;
      $scope.isRemovingPost = false;

      $scope.$parent.$watch("currentUser", (newValue, oldValue) => {
        if (newValue !== oldValue) {
          $scope.currentUserId = newValue.id

          getRequest("posts").then(data => {
            let printData = [];
            data.forEach(user => {
              user.posts.forEach(post => {
                if (user.id === $scope.currentUserId) {
                  post.isCurrentUser = true;
                  printData.push(post);
                } else {
                  post.isCurrentUser = false;
                  printData.push(post);
                }
              });
            });
  
            this.posts = printData;
            $scope.$apply();
          });
        }
      });

      $scope.editPost = (currentPostId, $event) => {
        this.editingId = currentPostId;
      };

      $scope.removePost = currentPostId => {
        $scope.isRemovingPost = true;
        getRequest("posts").then(data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == $scope.currentUserId) {
              for (let j = 0; j < data[i].posts.length; j++) {
                if (data[i].posts[j].postId == currentPostId) {
                  data[i].posts.splice(j, 1);
                  break;
                } else {
                  continue;
                }
              }
            } else {
              continue;
            }
          }
          postRequest("posts", JSON.stringify(data)).then(() =>
            $route.reload()
          );
        });
      };
    }
  });

export default postsComponent;
