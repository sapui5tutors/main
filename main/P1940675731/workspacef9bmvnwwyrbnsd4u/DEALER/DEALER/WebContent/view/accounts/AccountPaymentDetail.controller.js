sap.ui.controller("com.vikalp.dealermgmt.view.accounts.AccountPaymentDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.accounts.AccountPaymentDetail
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.accounts.AccountPaymentDetail
*/
//	onBeforeRendering: function() {
//		
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.accounts.AccountPaymentDetail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.accounts.AccountPaymentDetail
*/
//	onExit: function() {
//
//	}
	NavButtonTap:function(){
		debugger;

		
		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
		router.navTo("AccountProfile",{customer:customerName[0]});
		sap.ui.getCore().byId("menulist").getItems()[0].setSelected(true);
	}
});