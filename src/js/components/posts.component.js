import { getRequest } from "../API/api";

const postsComponent =
  ("postsComponent",
  {
    // templateUrl: "../../views/post.html",
    template:
      "<div ng-repeat='post in $ctrl.posts'>" +
      "<h2>{{post.userName}}</h2>" +
      "<h3>{{post.title}}</h3>" +
      "<p>{{post.content}}</p>" +
      "</div>",

    controller: function postCtrl($scope) {
      getRequest("posts").then(data => {
        console.log(data)
        let printData = [];
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].posts)
          printData.push(data[i].posts)
        }
        console.log(printData)
        this.posts = printData[0];
        $scope.$apply();
      });
    }
  });

export default postsComponent;
