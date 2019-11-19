import { getRequest, postRequest } from "../API/api";

const postsComponent =
  ("postsComponent",
  {
    // templateUrl: "../../views/post",
    template:
      "<div id={{post.postId}} ng-repeat='post in $ctrl.posts'>" +
      "<h2>{{post.userName}}</h2>" +
      "<h3>{{post.title}}</h3>" +
      "<div ng-hide={{post.isCurrentUser}}>" +
      "<button ng-click='editPost($event)'>Edit post</button>" +
      "<button ng-click='removePost($event)'>Remove post</button>" +
      "</div>" +
      "<p>{{post.content}}</p>" +
      "</div>",

    controller: function postCtrl($scope, $route) {

      let currentUser;
      getRequest("currentUser").then(data => {
        currentUser = data
        getRequest("posts").then(data => {

          let printData = [];
          data.forEach(user => {
            user.posts.forEach(post => {
              if (user.id === currentUser.id) {
                post.isCurrentUser = false;
                printData.push(post);
              } else {
                post.isCurrentUser = true;
                printData.push(post);
              }
            })
          });

          
          this.posts = printData;
          $scope.$apply();
        });
      });

      $scope.editPost = $event => {
        console.log("edit post");
      };

      $scope.removePost = $event => {
        const currentPostId = $event.target.parentElement.parentElement.id;
        console.log(currentPostId)
        getRequest("posts").then((data) => {

          for (let i = 0; i < data.length; i++) {
            if (data[i].id == currentUser.id) {
              // if (data[i].posts.length <= 1) {
              //   data.splice(i, 1)
              // } else {
                for (let j = 0; j < data[i].posts.length; j++) {
                  if (data[i].posts[j].postId == currentPostId) {
                    data[i].posts.splice(j, 1);
                    break;
                  } else {
                    continue;
                  }
                }
              // }
            } else {
              continue;
            }
          }
          postRequest("posts", JSON.stringify(data)).then(() => $route.reload());
        })
      };
    }
  });

export default postsComponent;
