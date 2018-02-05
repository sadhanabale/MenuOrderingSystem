var app = angular.module("menuApp", ['ngSanitize','ctrlModule','ngRoute','ngMessages','ngCsv','ngStorage']);

app.run(function($rootScope){
    console.log("run");
	$rootScope.isLogin = false;
});

app.config(function($routeProvider){
    console.log("config");
    
    $routeProvider.when("/",{
        template: "<h3>Welcome to my Restaurant</h3>"
    });
    $routeProvider.when("/menucard",{
        templateUrl: "partials/menucard.html"
    });
    $routeProvider.when("/manage",{
        templateUrl: "partials/manage.html",
        controller: "MenuController"
    });
	$routeProvider.when("/login",{
        templateUrl: "partials/login.html",
        controller: "LoginController"
    });
	$routeProvider.when("/error",{
        template: "<h3>Invalid credentials</h3>"
    });
	$routeProvider.when("/logout",{
        templateUrl: "partials/logout.html"
    });
	$routeProvider.when("/signup",{
        templateUrl: "partials/signup.html",
        controller: "SignUpController"
    });
    $routeProvider.otherwise({
       template: "<h3>No Route match found</h3>" 
    });
});

//app.value("vorders",[]);
app.filter("truncate", function(){
	
	return function(input, param){
		var result = (input.length>param)? input.substr(0,param) + "..." : input;
		return result;
	}
});