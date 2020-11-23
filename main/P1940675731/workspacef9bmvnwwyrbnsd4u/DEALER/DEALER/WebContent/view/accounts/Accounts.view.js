sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.Accounts", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.Accounts
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.Accounts";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.Accounts
	*/ 
	createContent : function(oController) {
		
		var oApp = new sap.m.SplitApp("SplitApp",{});
		
//		var masterPage = sap.ui.view({id:"accountMenu", viewName:"com.vikalp.dealermgmt.view.accounts.AccountMenu", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var detailPage = sap.ui.view({id:"accountInfo", viewName:"com.vikalp.dealermgmt.view.accounts.AccountInfo", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var ProfileDetailPage = sap.ui.view({id:"accountProfileDetail", viewName:"com.vikalp.dealermgmt.view.accounts.AccountProfile", type:sap.ui.core.mvc.ViewType.JS});
////		
//		var PerformanceDetailPage = sap.ui.view({id:"accountPerformanceDetail", viewName:"com.vikalp.dealermgmt.view.accounts.AccountPerformance", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var AccountPaymentDetail = sap.ui.view({id:"AccountPaymentDetail", viewName:"com.vikalp.dealermgmt.view.accounts.DealerPaymentDetail", type:sap.ui.core.mvc.ViewType.JS});
//		
//		oApp.addMasterPage(masterPage);
//		
//		oApp.addDetailPage(detailPage).addDetailPage(ProfileDetailPage).addDetailPage(PerformanceDetailPage).addDetailPage(AccountPaymentDetail);
		
//		oApp.setInitialDetail("accountProfileDetail");
		
		return oApp;
	}

});