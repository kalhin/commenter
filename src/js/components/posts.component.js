import { getRequest, postRequest } from "../API/api";

const postsComponent =
  ("postsComponent",
  {
    bindings: {
      user: "<"
    },

    templateUrl: "post.html",

    controller: function postCtrl($scope, $route) {
      $scope.currentUserId;
      this.type = "post";
      this.openModal = false;

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
                    index => index.id === post.userId
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
              console.log(printData)
              this.posts = printData;
              $scope.$apply();
            }
          );
        }
      });

      $scope.editPost = (currentPostId, event) => {
        this.editingId = currentPostId;
      };

      console.log(this.aproved)

      $scope.removePost = (currentPostId, event) => {
        this.openModal = true;
        if (this.aproved) {
          console.log(111111111111111)
          const removingPost = event.target.parentElement.parentElement.parentElement;
          removingPost.remove();
  
          getRequest("posts").then(data => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].postId == currentPostId) {
                data.splice(i, 1);
                break;
              } else {
                continue;
              }
            }
            postRequest("posts", JSON.stringify(data));
          });
        }
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
