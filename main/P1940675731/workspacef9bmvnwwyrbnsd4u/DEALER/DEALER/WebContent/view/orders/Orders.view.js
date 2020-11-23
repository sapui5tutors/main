sap.ui.jsview("com.vikalp.dealermgmt.view.orders.Orders", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.orders.Orders
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.orders.Orders";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.orders.Orders
	*/ 
	createContent : function(oController) {
 	
		
       var oApp = new sap.m.SplitApp("appId",{});
		
//		var orderList = sap.ui.view({id:"orderList", viewName:"com.vikalp.dealermgmt.view.orders.OrdersList", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var orderInfo = sap.ui.view({id:"orderInfo", viewName:"com.vikalp.dealermgmt.view.orders.OrdersInfo", type:sap.ui.core.mvc.ViewType.JS});
		
//	    var orderItemDetail =sap.ui.view({id:"orderItemDetail", viewName:"com.vikalp.dealermgmt.view.orders.OrderItemDetail", type:sap.ui.core.mvc.ViewType.JS});
		
//	    var orderCartDetail = sap.ui.view({id:"orderCartDetail", viewName:"com.vikalp.dealermgmt.view.orders.OrderCartDetail", type:sap.ui.core.mvc.ViewType.JS});
	     
//	    oApp.addMasterPage(orderList);
//		
//	    oApp.addDetailPage(orderInfo).addDetailPage(orderItemDetail);
////	    .addDetailPage(orderCartDetail);
//
//		oApp.setInitialDetail(orderInfo);
//		var oAppPage = new sap.m.App("pageId",{});
	
//		oAppPage.addPage(orderCartDetail);
//		var arr = [oAp]
		return oApp;
	}

		


});