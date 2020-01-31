import {
  getRequest,
  postRequest
} from "../API/api";

const postsComponent =
  ("postsComponent",

    {
      // templateUrl: "../../views/post",
      bindings: {
        user: "<"
      },

      template: "<div class='post' id={{post.postId}} ng-repeat='post in $ctrl.posts'>" +
        "<div class='post__userBlock'>" +
        "<h2 class='post__userName'>{{post.userName}}</h2>" +
        "<div ng-show={{post.isCurrentUser}}>" +
        `<button ng-class="post.postId == $ctrl.editingId ? 'btn-disabled btn-big' : 'btn btn-big'" ng-disabled="post.postId == $ctrl.editingId" ng-click="editPost(post.postId, $event)">Edit post</button>` +
        `<button  class='btn btn-big' ng-click='removePost(post.postId, $event)'>Remove post</button>` +
        "</div>" +
        "</div>" +
        "<div class='post__postBlock'>" +
        "<h3 class='post__title'>{{post.title}}</h3>" +
        "<p class='post__content'>{{post.content}}</p>" +
        "<post-editing  id='$ctrl.editingId' ng-if='post.postId == $ctrl.editingId'></post-editing>" +
        "<div class='btn-position'>" +
        `<button ng-class="isCommenting ? 'btn-disabled' : 'btn'" ng-if='!post.isCurrentUser' ng-disabled='isCommenting' ng-click='commentPost()'>Leave comment</button>` +
        "</div>" +
        "<post-commenting user='$ctrl.user' id='post.postId' ng-if='isCommenting && !post.isCurrentUser'></post-commenting>" +
        "</div>" +
        "</div>",

      controller: function postCtrl($scope, $route) {
        $scope.currentUserId;
        $scope.isCommenting = false;

        $scope.$parent.$watch("currentUser", (newValue, oldValue) => {
          if (newValue !== oldValue) {
            $scope.currentUserId = newValue.id
            getRequest("users").then(userData => {
              getRequest("posts").then(postData => {

                // sort surrent user posts to top of list (need add post create date)
                // const currentUserAllPosts = data.find(index => index.id === $scope.currentUser.id);
                // data.unshift(currentUserAllPosts);
                // const currentUserAllPostsIndex = data.indexOf(currentUserAllPosts, 1);
                // data.splice(currentUserAllPostsIndex, 1)

                let printData = [];
                postData.forEach(post => {
                  if (post.userId === $scope.currentUserId) {
                    post.isCurrentUser = true;
                    const iterateUser = userData.find(item => item.id === post.userId);
                    post.userName = `${iterateUser.first_name} ${iterateUser.last_name}`;
                    printData.push(post);
                  } else {
                    post.isCurrentUser = false;
                    const iterateUser = userData.find(item => item.id === post.userId);
                    post.userName = `${iterateUser.first_name} ${iterateUser.last_name}`;
                    printData.push(post);
                  }
                });

                this.posts = printData;
                $scope.$apply();
              });
            });
          }
        });

        $scope.editPost = (currentPostId, $event) => {
          this.editingId = currentPostId;
        };

        $scope.removePost = (currentPostId, $event) => {

          const currentBtn = $event.target;
          currentBtn.setAttribute("disabled", true);
          currentBtn.className = "btn-big btn-disabled";
          const editBtn = currentBtn.parentElement.firstChild;
          editBtn.setAttribute("disabled", true);
          editBtn.className = "btn-big btn-disabled";

          getRequest("posts").then(data => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].postId == currentPostId) {
                data.splice(i, 1);
                break;
              } else {
                continue;
              }
            }
            postRequest("posts", JSON.stringify(data)).then(() => {
              $route.reload();
            });
          });
        };

        $scope.commentPost = () => {
          $scope.isCommenting = true;
        }
      }
    });

export default postsComponent;