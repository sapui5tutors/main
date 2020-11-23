sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountOrder", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountOrder
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountOrder";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountOrder
	*/ 
	createContent : function(oController) {
		var oApp2 = new sap.m.SplitApp("appsId",{});
		
//		var masterPage2 = sap.ui.view({id:"accountOrderMaster", viewName:"com.vikalp.dealermgmt.view.accounts.AccountOrderMaster", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var detailPage2 = sap.ui.view({id:"accountOrderDetail", viewName:"com.vikalp.dealermgmt.view.accounts.AccountOrderDetail", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var itemDetailPage = sap.ui.view({id:"accountorderItemDetail", viewName:"com.vikalp.dealermgmt.view.accounts.AccountOrderitemDetailPage", type:sap.ui.core.mvc.ViewType.JS});
////		
//		oApp2.addMasterPage(masterPage2);
//		
//		oApp2.addDetailPage(detailPage2).addDetailPage(itemDetailPage);
//
//		oApp2.setInitialDetail("accountOrderDetail");
		
		return oApp2;
	}

});