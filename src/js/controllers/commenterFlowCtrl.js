const commenterFlowCtrl = ($scope, $rootScope) => {
    const vm = this;

    const firstName = $rootScope.user.firstName;
    const lastName = $rootScope.user.lastName;
    $scope.user.firstName = firstName[0].toUpperCase() + firstName.slice(1);
    $scope.user.lastName[0].toUpperCase() + firstName.slice(1);
}

export default commenterFlowCtrl;