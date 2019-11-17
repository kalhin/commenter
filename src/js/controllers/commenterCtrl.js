import { postRequest, getRequest } from "../API/api";

const commenterCtrl = ($scope, $rootScope, $location) => {
    // console.log($rootScope.user)
    
    $scope.errorMessage = ""
    const errorMessage = "If you want add post, you should enter post title and content"

    $scope.createPost = () => {
        const title = prompt("Please add Title to your post");
        const content = prompt("Please add Content for your post");

        if (title !== null && content !== null) {
            getRequest("posts").then((data) => {
                // const userId = $rootScope.user.id;

                for (let i = 0; i < data.length; i++) {
                    if (true) {
                    // if (data[i].id === userId) {
                        const newPost = {
                            postId: data[i].posts.length + 1,
                            title: title,
                            content: content
                        }
                        data[i].posts.push(newPost);
                        console.log(data[i])
                        // postRequest("posts", data);
                        // $scope.$apply();
                        break;
                    } else {
                        continue;
                    }
                }
            })
        } else {
            $scope.errorMessage = errorMessage;
            setTimeout(() => {
                $scope.errorMessage = ""; 
                $scope.$apply();
            },5000);
        }
    }
    

    // const firstName = $rootScope.user.firstName;
    // const lastName = $rootScope.user.lastName;

    // $scope.user.firstName = firstName[0].toUpperCase() + firstName.slice(1);
    // $scope.user.lastName = lastName[0].toUpperCase() + lastName.slice(1);

    $scope.logout = () => {
        postRequest("isUserLogin", false).then(() => {
            $rootScope.user.firstName = "";
            $rootScope.user.lastName = "";
            $rootScope.user.id = null;

            $location.path("/");
            $scope.$apply();
        });
    }
} 

export default commenterCtrl;