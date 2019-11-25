import { getRequest, postRequest } from "../API/api";

const postEditing =
  ("postEditing",
  {
    // templateUrl: "../../views/post",
    template:
      "<div>" +
        "<label for='title'>Title</label>" +
        "<textarea id='title'>{{$ctrl.title}}</textarea>" +         
        "<label for='content'>Content</label>" +
        "<textarea id='content'>{{$ctrl.content}}</textarea>" +         
        "<button ng-click='editingPost($event)'>Edit</button>" +
        "<button ng-click='canselEditingPost()'>Cancel</button>" +
      "</div>",

    bindings: {
      currentUserId: "=",
      id: "=",
      title: "=",
      content: "="
    },

    controller: function postEditingCtrl($scope, $route) {
      this.title;
      this.content;

      $scope.editingPost = $event => {
        getRequest("posts").then((data) => {
          console.log(this)
          // console.log(this.id)
          // console.log(data)
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === this.id) {
              const title = this.title;
              const content = this.content;
              // const newPost = {
              //   postId: data[i].posts[0].postId + 1,
              //   userName: `${currentUser.firstName} ${currentUser.lastName}`,
              //   title: title,
              //   content: content,
              //   comments: []
              // };
              // data[i].posts.unshift(newPost);
              // postRequest("posts", JSON.stringify(data)).then(() => {
              //   $route.reload();
              // });
  
              break;
            } else {
              continue;
            }
          }
        })
      }

      $scope.canselEditingPost = () => {
        this.id = null
      }
    }
  });

export default postEditing;
