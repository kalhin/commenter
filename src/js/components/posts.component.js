import { getRequest, postRequest } from "../API/api";

const postsComponent =
  ("postsComponent",
  {
    bindings: {
      user: "<"
    },

    templateUrl: "post.html",
    // template:
    //   "<div class='post' id={{post.postId}} ng-repeat='post in $ctrl.posts'>" +
    //   "<div class='post__userBlock'>" +
    //   "<h2 class='post__userName'>{{post.user}}</h2>" +
    //   "<div ng-show={{post.isCurrentUser}}>" +
    //   `<button ng-class="post.postId == $ctrl.editingId ? 'btn-disabled btn-big' : 'btn btn-big'" ng-disabled="post.postId == $ctrl.editingId" ng-click="editPost(post.postId, $event)">Edit post</button>` +
    //   `<button  class='btn btn-big' ng-click='removePost(post.postId, $event)'>Remove post</button>` +
    //   "</div>" +
    //   "</div>" +
    //   "<div class='post__postBlock'>" +
    //   "<h3 class='post__title'>{{post.title}}</h3>" +
    //   "<p class='post__content'>{{post.content}}</p>" +
    //   "<post-editing  id='$ctrl.editingId' ng-if='post.postId == $ctrl.editingId'></post-editing>" +

    //   `<div ng-class='comment.backround%2 === 0 ? "comment comment-bgColorGreyLight" : "comment comment-bgColorGrey"' id={{comment.commentId}} ng-repeat='comment in post.allComments'>` +
    //   "<div class='comment__data' >" +
    //   "<p class='comment__userName'>{{comment.commentOwnerName}}</p>" +
    //   "<p class='comment__content' ng-if='$ctrl.commentingId != comment.commentId'>{{comment.content}} </p>" +

    //   "<div ng-if='$ctrl.commentingId == comment.commentId' >" +
    //   "<input class='comment__input' type='text' ng-model='comment.content'></input>" +
    //   "<div class='comment__btn' ng-click='sendEditingComment(comment.commentId, comment.content)'>" +
    //   "<img src='../../img/right-arrow.png' alt='right arrow'>" +
    //   "</div>" +
    //   "<div class='comment__btn' ng-click='cancelEditingComment($ctrl.commentingId, comment.content)'>" +
    //   "<img src='../../img/cancel.png' alt='cancel'>" +
    //   "</div>" +
    //   "</div>" +

    //   "</div>" +
    //   "<div class='comment__btns' ng-if='comment.commentOwnerId === currentUserId'>" +
    //   "<div class='comment__btn' ng-click='editComment(comment.commentId, comment.content)'>" +
    //   "<img src='../../img/pencil.png' alt='pencil'>" +
    //   "</div>" +
    //   "<div class='comment__btn' ng-click='removeComment(comment.commentId, $event)'>" +
    //   "<img src='../../img/rubbish.png' alt='rubbish'>" +
    //   "</div>" +
    //   "</div>" +
    //   "</div>" +
    //   "<div class='btn-position'>" +
    //   `<button ng-class="post.postId == $ctrl.postId ? 'btn-disabled' : 'btn'" ng-if='!post.isCurrentUser' ng-disabled=' post.postId == $ctrl.postId' ng-click='leaveCommentPost(post.postId, event)'>Leave comment</button>` +
    //   "</div>" +
    //   "<post-commenting user='$ctrl.user' commentId='$ctrl.commentingId' id='$ctrl.postId' ng-if='post.postId == $ctrl.postId'></post-commenting>" +
    //   "</div>" +
    //   "</div>",

    controller: function postCtrl($scope, $route) {
      $scope.currentUserId;

      $scope.$parent.$watch("currentUser", (newValue, oldValue) => {
        if (newValue !== oldValue) {
          $scope.currentUserId = newValue.id;

          const getUserData = getRequest("users");
          const getPostsData = getRequest("posts");
          const getCommentsData = getRequest("comments");

          Promise.all([getUserData, getPostsData, getCommentsData]).then(
            values => {
              const [userData, postsData, commentsData] = values;
              let printData = postsData.map(post => {
                if (post.userId === $scope.currentUserId) {
                  post.isCurrentUser = true;
                  const user = userData.find(
                    index => index.id === $scope.currentUserId
                  );
                  post.user = `${user.first_name} ${user.last_name}`;
                  let color = 0;

                  const comments = commentsData.map(comment => {
                    if (comment.postId == post.postId) {
                      comment.backround = color;
                      color++;
                      return comment;
                    }
                  });
                  post.allComments = comments.filter(
                    item => item !== undefined
                  );

                  return post;
                } else {
                  post.isCurrentUser = false;
                  const user = userData.find(
                    index => index.id !== $scope.currentUserId
                  );
                  post.user = `${user.first_name} ${user.last_name}`;
                  let color = 0;
                  const comments = commentsData.map(comment => {
                    if (comment.postId === post.postId) {
                      comment.backround = color;
                      color++;
                      return comment;
                    }
                  });
                  post.allComments = comments.filter(
                    item => item !== undefined
                  );

                  return post;
                }
              });
              this.posts = printData;
              $scope.$apply();
            }
          );
        }
      });

      $scope.editPost = (currentPostId, event) => {
        this.editingId = currentPostId;
      };

      $scope.removePost = (currentPostId, event) => {
        const currentBtn = event.target;
        currentBtn.setAttribute("disabled", true);
        currentBtn.className = "btn-big btn-disabled";
        const editBtn = currentBtn.parentElement.firstChild;
        // editBtn.setAttribute("disabled", true);
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

      $scope.leaveCommentPost = (currentPostId, event) => {
        this.postId = currentPostId;
      };

      $scope.editComment = (commentId, content) => {
        this.commentingId = commentId;
      };

      $scope.cancelEditingComment = (commentId, content) => {
        console.log($scope);
        this.commentingId = null;
      };

      $scope.sendEditingComment = (commentId, content) => {
        this.commentingId = null;

        getRequest("comments").then(data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].commentId === commentId) {
              data[i].content = content;
              postRequest("comments", JSON.stringify(data));
              break;
            } else {
              continue;
            }
          }
        });
      };

      $scope.removeComment = (commentId, event) => {
        const removingComment =
          event.target.parentElement.parentElement.parentElement.parentElement
            .parentElement;
        removingComment.remove();

        getRequest("comments").then(data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].commentId == commentId) {
              data.splice(i, 1);
              break;
            } else {
              continue;
            }
          }
          postRequest("comments", JSON.stringify(data));
        });
      };
    }
  });

export default postsComponent;
