import { getRequest, postRequest } from "../API/api";

const postsComponent =
  ("postsComponent",
  {
    // templateUrl: "../../views/post",
    template:
      "<div id={{post.postId}} ng-repeat='post in $ctrl.posts'>" +
        "<h2>{{post.userName}}</h2>" +
        "<div ng-show={{post.isCurrentUser}}>" +
          "<button class='btn' ng-disabled='post.postId == $ctrl.editingId' ng-click='editPost(post.postId)'>Edit post</button>" +
          "<button class='btn' ng-click='removePost(post.postId)'>Remove post</button>" +
        "</div>" +
        "<h3>{{post.title}}</h3>" +
        "<p>{{post.content}}</p>" +
        "<post-editing currentUser='$ctrl.currentUser' id='$ctrl.editingId' title='post.title' content='post.content' ng-if='post.postId == $ctrl.editingId'></post-editing>" +
      "</div>",

      bindings: {
        currentUser: "="
      },  

    controller: function postCtrl($scope, $route) {
      this.editingId;
      console.log(111, this.currentUser)
      // this.currentUser;

      getRequest("currentUser").then(data => {
        this.currentUserId = data.id;
        // console.log(this.currentUserId)
        getRequest("posts").then(data => {
          let printData = [];
          data.forEach(user => {
            user.posts.forEach(post => {
              if (user.id === this.currentUserId) {
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
      });

      $scope.editPost = currentPostId => {
        this.editingId = currentPostId;
      };

      $scope.removePost = currentPostId => {

        getRequest("posts").then(data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == this.currentUserId) {
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
