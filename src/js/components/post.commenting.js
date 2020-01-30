import { getRequest, postRequest } from "../API/api";

const postCommenting =
  ("postCommenting",
  {
    bindings: {
      id: "=",
      user: "<"
    },

    template:
      "<div>" +
        // "<p>{{$ctrl.user.firstName + ' ' + $ctrl.user.lastName}}</p>" +
        "<div class='input'>" +
          "<input class='input__field' type='text' placeholder='{{placeholderErrorMessage}}' ng-model='comment'></input>" +   
        "</div>" +
        "<div class='btn-position'>" +       
        `<button ng-class="isLeavingPost ? 'btn-disabled' : 'btn'" ng-disabled="isLeavingPost" ng-click='leavingComment($event)'>Leave</button>` +
        "<button class='btn' ng-click='canselCommentingPost()'>Cancel</button>" +
        "</div>" +
      "</div>",

    controller: function postCommentingCtrl($scope, $route) {
        $scope.comment = "";
        $scope.isLeavingPost = false;
        $scope.placeholderErrorMessage = "Leave your comment here";

      $scope.leavingComment = $event => {
        if ($scope.comment.length === 0) {
            $scope.placeholderErrorMessage = "If you want add comment, you should enter comment here";
            $scope.isLeavingPost = false;
        } else {
            $scope.isLeavingPost = true;
            console.log('id', this)
            // getRequest("posts").then((data) => {
        
            //   for (let i = 0; i < data.length; i++) {
            //     if (data[i].id === currentUserId) {
            //       for (let j = 0; j < data[i].posts.length; j++) {
            //         if (data[i].posts[j].postId === this.id) {
            //           data[i].posts[j].title = title;
            //           data[i].posts[j].content = content;
        
            //           postRequest("posts", JSON.stringify(data)).then(() => {
            //             $route.reload();
            //           });
            //           break;
            //         } else {
            //           continue
            //         }
            //       }
        
            //       break;
            //     } else {
            //       continue;
            //     }
            //   }
            // })
        }
    //     const title = $scope.$parent.$parent.post.title;
    //     const content = $scope.$parent.$parent.post.content;

      }

      $scope.canselCommentingPost = () => {
        $scope.$parent.$parent.$parent.isCommenting = false;
      }
    }
  });

export default postCommenting;
