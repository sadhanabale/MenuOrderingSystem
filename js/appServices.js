var s = angular.module("SvcModule",['FactModule']);

s.service("MenuService", function(MenuFactory){
    this.getAllMenuItems = function(){
        return MenuFactory.getMenuItems();
    }
	this.addNewMenuItem = function(newmenuitem){
		MenuFactory.addNewMenuItem(newmenuitem);
	}
	this.removeMenuItem = function(idx,itemid){
		MenuFactory.removeMenuItem(idx,itemid);
	}
	this.updateMenuItem = function(item, idx){
		MenuFactory.updateMenuItem(item, idx);
	}
});

s.service("OrderService", function(OrderFactory){
    this.getAllOrders = function(){
        return OrderFactory.getOrders();
    }
    this.addNewOrder = function(newitem){
        OrderFactory.addOrder(newitem);
    }
    this.deleteOrder = function(idx){
        OrderFactory.deleteOrder(idx);
    }
    this.getTotalAmount = function(){
        var total = 0;
        angular.forEach(OrderFactory.getOrders(),function(e){
            total += (e.price * e.qty);
        });
        return total;
    }
})