var c = angular.module("ctrlModule", ['SvcModule']);

c.run(function(){
    console.log("ctrl run");
});

c.config(function(){
    console.log("ctrl config");
});


//c.controller("MenuController", function($scope,vorders)
c.controller("MenuController", function($scope, MenuService, OrderService){
	var flag = -1;
   console.log("Menu controller"); 
    //$scope.msg = "Deloitte, BLR";
    //$scope.menuitem = {code:"VG101", name:"Dosa", price:75, description:"Plain DOsa"}

    
    $scope.itemsList = MenuService.getAllMenuItems();
    
    $scope.placeOrder = function(menuitem){
        var orderedItems = {name: menuitem.name,price:menuitem.price,qty: 1,}
        OrderService.addNewOrder(orderedItems);
            //vorders.push(orderedItems);
        //$scope.chosen = true;
    }
	$scope.save = function(){
		if(flag == -1){
			MenuService.addNewMenuItem($scope.newmenuitem);
		}
		else{
			MenuService.updateMenuItem($scope.newmenuitem, flag);
			flag = -1;
		}
		$scope.newmenuitem = {};
	}
	$scope.remove = function(idx, itemid){
		MenuService.removeMenuItem(idx,itemid);
	}
	$scope.edit = function(selecteditem, idx){
		$scope.newmenuitem = angular.copy(selecteditem);
		flag= idx;
	}
//    $scope.itemAdded = function(idx){
//        $scope.idx.chosen = true;
//    }
});
//c.controller("OrderController",function($scope,vorders)
c.controller("OrderController",function($scope, OrderService,$http){
    $scope.orderedItems = OrderService.getAllOrders();
    
    $scope.totalAmount = function(){
        return OrderService.getTotalAmount();
//         var total = 0;
//        angular.forEach($scope.orderedItems,function(e){
//            total += (e.price * e.qty);
//        });
//        return total;
    }
        $scope.removeItem = function(idx){
            OrderService.deleteOrder(idx);
            //vorders.splice(idx,1)
            //$scope.chosen = false;
        }                

});

c.controller("MainController", function($scope, $location, $rootScope,$sessionStorage){
	
	if($sessionStorage.uname == "admin"){
		$rootScope.isLogin = true;
	}
	$scope.$on("$routeChangeSuccess", function(){
		console.log("Route Change Success" + $location.path());
		if($location.path() == "/logout"){
			$sessionStorage.$reset();
			$rootScope.isLogin = false;
		}
	});
	$scope.$on("$routeChangeStart", function(){
		if(!$rootScope.isLogin){
			if($location.path() == "/manage"){
				$location.path("/login");
			}
		}
	});
});

c.controller("LoginController", function($scope,$location,$rootScope,$sessionStorage){
	$scope.doLogin = function(){
		if($scope.login.username == "admin"){
			$sessionStorage.uname = "admin";
			$location.path("/manage");
			$rootScope.isLogin = true;
		}
		else{
			$location.path("/error");
		}
	}
});

c.controller("SignUpController", function($scope){
	$scope.stateList = [{"stateId":1,"name":"Karnataka"},{"stateId":2,"name":"Kerala"}]
	$scope.$watch("user.state", function(newval, oldval){
		console.log("oldval " + oldval ,"Newval " + newval);
		if(newval==1){
			$scope.citylist =[{"cityId":101,"Name":"Bangalore"},{"cityId":102,"Name":"Mysore"},{"cityId":103,"Name":"Mangalore"}]
		}
		else if(newval == 2){
			$scope.citylist = [{"cityId":201,"Name":"Munnar"},{"cityId":202,"Name":"Allepey"},{"cityId":203,"Name":"Tekeddey"}]
		}
	})
});



