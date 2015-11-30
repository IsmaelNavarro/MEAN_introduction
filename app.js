var app = angular.module("flapperNews", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("home", {
			url: "/home",
			templateUrl: "/home.html",
			controller: "MainCtrl"
		})
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

	$urlRouterProvider.otherwise("home");
});

app.factory('posts', [function() {
	var o = {
		posts: []
	};
	return o;
}]);

app.controller("MainCtrl",[
	'$scope',
	'posts',
	function($scope, posts) {

		$scope.test = "hola";

		$scope.posts = posts.posts;

		$scope.addPost = function() {
			if (!$scope.title || $scope.title === '') {
				return;
			}
			$scope.posts.push({
				title: $scope.title,
				upvotes: 0,
				link: $scope.link,
				comments: [{
					author: 'Joe',
					body: 'Cool post!',
					upvotes: 0
				}, {
					author: 'Bob',
					body: 'Great idea but everything is wrong!',
					upvotes: 0
				}]
			});
			$scope.title = "";
			$scope.link = "";
		};

		$scope.incrementUpvotes = function(post) {
			post.upvotes++;
		};
	}
]);

app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts) {
		$scope.post = posts.posts[$stateParams.id];

		$scope.addComment = function(){
		  if($scope.body === '') { return; }
		  $scope.post.comments.push({
		    body: $scope.body,
		    author: 'user',
		    upvotes: 0
		  });
		  $scope.body = '';
		};

	}
]);