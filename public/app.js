var app = angular.module('Blog', []);

app.controller('PostController', function ($scope, $http) {
    $scope.posts = [{title: 'first'}, {title: 'second'}, {title: 'third'}];
    function loadPosts() {
        $http.get('/posts').success(function (posts) {
            $scope.posts = posts;
        });
    }

    loadPosts();
    $scope.savePost = function () {
        $http.post('/post', {post: $scope.newpost}).success(function () {
            loadPosts();
        });
    }

    $scope.showPost = function (post) {
        if (post.show) {
            post.show = false;
        } else {
            post.show = true;
        }
    }
});
