import { getRequest, postRequest } from "../API/api";

const postEditing =
  ("postEditing",
  {
    bindings: {
      id: "<",
      title: "<",
      content: "<"
    },

    template:
      "<div>" +
        "<div class='textArea'>" +
          "<label class='textArea__label' for='title'>Title</label>" +
          "<textarea class='textArea__field' rows='1' id='title'>{{$ctrl.title}}</textarea>" +   
        "</div>" +
        "<div class='textArea'>" +
          "<label class='textArea__label' for='content'>Content</label>" +
          "<textarea class='textArea__field' rows='10' id='content'>{{$ctrl.content}}</textarea>" + 
        "</div>" + 
        "<div class='btn-position'>" +       
        "<button class='btn' ng-click='editingPost($event)'>Edit</button>" +
        "<button class='btn' ng-click='canselEditingPost()'>Cancel</button>" +
        "</div>" +
      "</div>",

    controller: function postEditingCtrl($scope, $route) {

      $scope.title = this.title;
      $scope.content = this.content;
      const currentUserId = $scope.$parent.$parent.$parent.currentUserId;
      // console.log($scope)

      $scope.editingPost = $event => {
        getRequest("posts").then((data) => {

          debugger;
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === currentUserId) {
              for (let j = 0; j < data[i].posts.length; j++) {
                if (data[i].posts[j].postId === this.id) {
                  data[i].posts[j].title = this.title;
                  data[i].posts[j].content = this.content;

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
