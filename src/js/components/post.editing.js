import {
  getRequest,
  postRequest
} from "../API/api";

const postEditing =
  ("postEditing", {
    bindings: {
      id: "="
    },

    templateUrl: "postEditingTemplate.html",

    controller: function postEditingCtrl($scope, $route) {

      const currentUserId = $scope.$parent.$parent.$parent.currentUserId;

      $scope.editingPost = $event => {
        this.id = null;
        const title = $scope.$parent.$parent.post.title;
        const content = $scope.$parent.$parent.post.content;

        getRequest("posts").then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].postId === this.id) {
              data[i].title = title;
              data[i].content = content;
              postRequest("posts", JSON.stringify(data))
              break;
            } else {
              continue
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