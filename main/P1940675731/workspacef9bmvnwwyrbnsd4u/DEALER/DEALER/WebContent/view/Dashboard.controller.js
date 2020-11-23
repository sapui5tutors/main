var appCon = new sap.ui.getCore().byId("appSubNavContainer");
sap.ui.controller("com.vikalp.dealermgmt.view.Dashboard", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Dashboard
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Dashboard
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Dashboard
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Dashboard
*/
//	onExit: function() {
//
//	}

	onAccountsTileClicked:function(oEvent){
		debugger;
//		oEvent.getSource().getItems()[0].setSelected(true);
		this.uname = data.userName;
		var router = sap.ui.core.routing.Router.getRouter("appRouter");
		var history2 = sap.ui.core.routing.History.getInstance();
//		router.navTo("Dashboard");
		oHasher = sap.ui.core.routing.HashChanger.getInstance(); 
		
		if(oHasher.getHash() == ""){
			var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
			router.navTo("AccountMenu");
			var menlist = sap.ui.getCore().byId("menulist");
			menlist.getItems()[0].setSelected(true);
//			window.history.go(-1);
//			oHasher.setHash("Dashboard")  
//		router._oRouter._prevMatchedRequest.replace("AccountMenu","");
//		sap.ui.getCore().byId("appSubNavContainer").to("Dashboard");
		}
		else
			{
			debugger;
			if(history2.aHistory.includes("AccountMenu"))
				{var menlist = sap.ui.getCore().byId("menulist");
			menlist.getItems()[0].setSelected(true);
				}
			
			var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
			router.navTo("AccountProfile");
//			,{customer:customerName[0]}
			}
		
//		var accountInfoPage = new sap.ui.view({id:"account", viewName:"com.vikalp.dealermgmt.view.accounts.Accounts",viewData:data.userName, type:sap.ui.core.mvc.ViewType.JS});
//		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//		router.navTo("AccountMenu");
//		appCon.addPage(accountInfoPage);
//		appCon.to(accountInfoPage);
	},
	
	onOrdersTileClick:function(){
		
//		var ordersListPage = new sap.ui.view({id:"order", viewName:"com.vikalp.dealermgmt.view.orders.Orders", type:sap.ui.core.mvc.ViewType.JS});
//		var ordersListPage = new sap.ui.view({id:"mainOrder", viewName:"com.vikalp.dealermgmt.view.orders.MainOrder", type:sap.ui.core.mvc.ViewType.JS});
//		appCon.addPage(ordersListPage);
//		appCon.to(ordersListPage);	
		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
		router.navTo("OrdersInfo");
		
	},
	
	onPaymentsTileClicked:function(){
		
//		var paymentsListPage = new sap.ui.view({viewName:"com.vikalp.dealermgmt.view.payments.Payments", type:sap.ui.core.mvc.ViewType.JS});
////		id:"payments", 
//		appCon.addPage(paymentsListPage);
//		appCon.to(paymentsListPage);
		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
		router.navTo("PaymentsMenu");
		
	},
	
	onProductsTileClicked:function(){
		
		var productsListPage = new sap.ui.view({viewName:"com.vikalp.dealermgmt.view.products.Products", type:sap.ui.core.mvc.ViewType.JS});
	id:"payments", 
	appCon.addPage(productsListPage);
	appCon.to(productsListPage);
//	var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//	router.navTo("ProductsInfo");
	},
	

});