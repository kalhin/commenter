import { postRequest } from "../API/api";

const commenterCtrl = ($scope, $rootScope, $location) => {
    const vm = this;
    // $scope.user = {}
    $scope.isPostCreated = false;

    $scope.createPost = () => {
        console.log("post created");
        $scope.isPostCreated = true;
    }
    

    // const firstName = $rootScope.user.firstName;
    // const lastName = $rootScope.user.lastName;

    // $scope.user.firstName = firstName[0].toUpperCase() + firstName.slice(1);
    // $scope.user.lastName = lastName[0].toUpperCase() + lastName.slice(1);

    $scope.logout = () => {
        postRequest("isUserLogin", false).then(() => {
            $location.path("/");
            $scope.$apply();
        });
    }
} 

export default commenterCtrl;