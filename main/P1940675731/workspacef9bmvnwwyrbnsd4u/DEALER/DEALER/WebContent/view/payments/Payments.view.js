sap.ui.jsview("com.vikalp.dealermgmt.view.payments.Payments", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.Accounts
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.payments.Payments";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.Accounts
	*/ 
	createContent : function(oController) {
		
		var oApp = new sap.m.SplitApp("PaymentTab",{});
//		"SplitApp",
//		var masterPage = sap.ui.view({id:"paymentsMenu", viewName:"com.vikalp.dealermgmt.view.payments.PaymentsMenu", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var masterPage1 = sap.ui.view({id:"paymentsMenu1", viewName:"com.vikalp.dealermgmt.view.payments.PaymentsMenu1", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var detailPage = sap.ui.view({id:"paymentsInfo", viewName:"com.vikalp.dealermgmt.view.payments.PaymentsInfo", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var detailPage1 = sap.ui.view({id:"paymentsInfo1", viewName:"com.vikalp.dealermgmt.view.payments.PaymentsInfo1", type:sap.ui.core.mvc.ViewType.JS});
//
//		
//		oApp.addMasterPage(masterPage).addMasterPage(masterPage1);
//		
//		oApp.addDetailPage(detailPage).addDetailPage(detailPage1);
		
		return oApp;
	}

});