const userService = function($rootScope) {
    let user = {};
    let post = {};

    return {
        setPostTitle: function() {
            return post.title
        },

        getPostTitle: function(title) {
            post.title = title;
            $rootScope.$broadcast("updates")
        },

        setPostContent: function() {
            return post.content
        },

        getPostContent: function(content) {
            post.content = content;
            $rootScope.$broadcast("updates")
        }
    }
}

export default userService;