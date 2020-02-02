import { getRequest, postRequest } from "../API/api";

const modal =
  ("modal",
  {
    bindings: {
      title: "<",
      type: "<",
      ismodalopen: "=",
      aproved: "="
    },

    templateUrl: "modal.html",

    controller: function modalCtrl($scope, $route) {

      $scope.aprove = () => {
          this.ismodalopen = false;
          this.aproved = true;
      };

      $scope.cancel = () => {
          this.ismodalopen = false;
          this.aproved = false;
      };
    }
  });

export default modal;
