const commenterFlowCtrl = ($scope) => {
    const vm = this;

    const userName = localStorage.getItem("userName");
    $scope.userName = userName[0].toUpperCase() + userName.slice(1);
}

export default commenterFlowCtrl;