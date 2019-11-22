import { getRequest, postRequest } from "../API/api";

const postsComponent =
  ("postsComponent",
  {
    // templateUrl: "../../views/post",
    template:
      "<div id={{post.postId}} ng-repeat='post in $ctrl.posts'>" +
        "<h2>{{post.userName}}</h2>" +
        "<div ng-show={{post.isCurrentUser}}>" +
          "<button ng-click='editPost($event)'>Edit post</button>" +
          "<button ng-click='removePost($event)'>Remove post</button>" +
        "</div>" +
        "<h3>{{post.title}}</h3>" +
        "<p>{{post.content}}</p>" +
        "<post-editing ng-if='post.postId === editingId'></post-editing>" +
      "</div>",

    controller: function postCtrl($scope, $route) {
      $scope.editingId = null;
      let currentUser;
      getRequest("currentUser").then(data => {
        currentUser = data;
        getRequest("posts").then(data => {
          let printData = [];
          data.forEach(user => {
            user.posts.forEach(post => {
              if (user.id === currentUser.id) {
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

      $scope.editPost = $event => {
        const postContent = $event.target.parentElement.parentElement;
        console.log(postContent.id)
        const id = postContent.id;
        $scope.editingId = id;
        // const post = postContent.parentElement;
        // const editBlock = document.createElement("div");
        // post.appendChild(editBlock);
        // const title = postContent.children[2].innerHTML;
        // const content = postContent.children[3].innerHTML;

        // const createTextArea = (ngModelAttribute, innerContent) => {
        //   const textarea = document.createElement("textarea");
        //   textarea.setAttribute("ng-model", ngModelAttribute);
        //   textarea.innerHTML = innerContent;
        //   editBlock.appendChild(textarea);
        // };
        // createTextArea("post.title", title);
        // createTextArea("post.content", content);

        // const createButton = (clickFunc, buttonContent) => {
        //   const button = document.createElement("button");

        //   button.setAttribute("ng-click", clickFunc);
        //   button.innerHTML = buttonContent;
        //   editBlock.appendChild(button);
        // };
        // createButton($scope.editingPost, "Edit post");
        // createButton($scope.cancelEditPost, "Cancel");

        // const editButton = $event.target;
        // editButton.setAttribute("disabled", true);
      };

      // $scope.editingPost = () => {
      //   console.log("editing");
      // };

      // $scope.cancelEditPost = () => {
      //   console.log("Cansel");
      //   // const editButton = $event.target;
      //   // editButton.setAttribute("disabled", false);
      // };

      $scope.removePost = $event => {
        const currentPostId =
          $event.target.parentElement.parentElement.parentElement.id;
        getRequest("posts").then(data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == currentUser.id) {
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
