var f = angular.module("FactModule", ['ngResource']);

f.factory("MenuFactory", function($resource){
    var menuitems;
    var menuResource = $resource("http://localhost:3000/wsmenuitems/:id", {"id":"@mid"},{myupdate:{method: "PUT"}})
    return {
        getMenuItems: function(){
            menuitems = menuResource.query();
            return menuitems;
        },
        addNewMenuItem: function(newmenuitem){
            menuResource.save(newmenuitem, function(data){
                menuitems.push(data);
            }, function(err, staus){
                console.log("save err");
            })
            //menuitems.push(newmenuitem);
        },
        removeMenuItem: function(index, itemid){
            menuResource.remove({"id": itemid}, function(){
                menuitems.splice(index,1);
            }, function(){
                console.log("Delete error")
            })
            
        },
        updateMenuItem: function(menuItem,index){
            menuResource.myupdate({"id": menuItem.id},menuItem,function(){
                menuitems[index]=menuItem;
            }), function(){
                console.log("Update error")
            }
            
        }
    }
})

f.factory("OrderFactory", function(){
    var orders = [];
    
    return{
        getOrders: function(){
            return orders;
        },
        addOrder: function(newItem){
            orders.push(newItem)
        },
        deleteOrder: function(index){
            orders.splice(index, 1)
        }
    }
})