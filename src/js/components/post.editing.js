import { getRequest, postRequest } from "../API/api";

const postEditing =
  ("postEditing",
  {
    // templateUrl: "../../views/post",
    template:
      "<div>" +
        "<textarea></textarea>" +
        "<textarea></textarea>" +
        "<button ng-click='editingPost($event)'>Edit post</button>" +
        "<button ng-click='canselEditingPost($event)'>Cancel</button>" +
      "</div>",

    controller: function postEditingCtrl($scope, $route) {

    }
  });

export default postEditing;
