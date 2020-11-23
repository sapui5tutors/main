sap.ui.jsview("com.vikalp.dealermgmt.view.orders.MainOrder", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.orders.MainOrder
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.orders.MainOrder";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.orders.MainOrder
	*/ 
	createContent : function(oController) {
		debugger;
		
		  var orApp = new sap.m.App("orAppId",{});
			
//			var orders = sap.ui.view({id:"orders", viewName:"com.vikalp.dealermgmt.view.orders.Orders", type:sap.ui.core.mvc.ViewType.JS});
			
//	        var orderCartDetail = sap.ui.view({id:"orderCartDetail", viewName:"com.vikalp.dealermgmt.view.orders.OrderCartDetail", type:sap.ui.core.mvc.ViewType.JS});
		
//	       var orderCheckoutDetail = sap.ui.view({id:"orderCheckoutDetail", viewName:"com.vikalp.dealermgmt.view.orders.OrderCheckoutDetail", type:sap.ui.core.mvc.ViewType.JS});
//	       
//	       var orderShippingDetail = sap.ui.view({id:"orderShippingDetail", viewName:"com.vikalp.dealermgmt.view.orders.OrderShippingDetail", type:sap.ui.core.mvc.ViewType.JS}); 
//	       
//	       var orderReviewDetail = sap.ui.view({id:"orderReviewDetail", viewName:"com.vikalp.dealermgmt.view.orders.OrderReviewDetail", type:sap.ui.core.mvc.ViewType.JS}); 
//	       orApp.addPage(orders).addPage(orderCartDetail).addPage(orderCheckoutDetail).addPage(orderShippingDetail).addPage(orderReviewDetail); 
//			orApp.setInitialPage(orders);
//		    oApp.addDetailPage(orderInfo).addDetailPage(orderItemDetail).addDetailPage(orderCartDetail);

//			oApp.setInitialDetail(orderInfo);
//	       orApp.addPage(orderCartDetail).addPage(orderCheckoutDetail).addPage(orderShippingDetail).addPage(orderReviewDetail); 

		
		
 		return orApp ;
	}

});