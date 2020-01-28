import { getRequest, postRequest } from "../API/api";

const postEditing =
  ("postEditing",
  {
    bindings: {
      id: "="
    },

    template:
      "<div>" +
        "<div class='textArea'>" +
          "<label class='textArea__label' for='title'>Title</label>" +
          "<textarea class='textArea__field' rows='1' id='title' ng-model='$parent.$parent.post.title'></textarea>" +   
        "</div>" +
        "<div class='textArea'>" +
          "<label class='textArea__label' for='content'>Content</label>" +
          "<textarea class='textArea__field' rows='10' id='content' ng-model='$parent.$parent.post.content'></textarea>" + 
        "</div>" + 
        "<div class='btn-position'>" +       
        `<button ng-class="isEditingPost ? 'btn-disabled' : 'btn'" ng-disabled="isEditingPost" ng-click='editingPost($event)'>Edit</button>` +
        "<button class='btn' ng-click='canselEditingPost()'>Cancel</button>" +
        "</div>" +
      "</div>",

    controller: function postEditingCtrl($scope, $route) {
      $scope.isEditingPost = false;

      const currentUserId = $scope.$parent.$parent.$parent.currentUserId;

      $scope.editingPost = $event => {
        $scope.isEditingPost = true;
        const title = $scope.$parent.$parent.post.title;
        const content = $scope.$parent.$parent.post.content;

        getRequest("posts").then((data) => {

          for (let i = 0; i < data.length; i++) {
            if (data[i].id === currentUserId) {
              for (let j = 0; j < data[i].posts.length; j++) {
                if (data[i].posts[j].postId === this.id) {
                  data[i].posts[j].title = title;
                  data[i].posts[j].content = content;

                  postRequest("posts", JSON.stringify(data)).then(() => {
                    $route.reload();
                  });
                  break;
                } else {
                  continue
                }
              }

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
