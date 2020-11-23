sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountPayment", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountPayment
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountPayment";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountPayment
	*/ 
	createContent : function(oController) {
var oApp1 = new sap.m.SplitApp("Split");
		
//		var masterPage1 = sap.ui.view({id:"accountMaster1", viewName:"com.vikalp.dealermgmt.view.accounts.AccountPaymentMaster", type:sap.ui.core.mvc.ViewType.JS});
//		
//		var detailPage1 = sap.ui.view({id:"accountDetail1", viewName:"com.vikalp.dealermgmt.view.accounts.AccountPaymentDetail", type:sap.ui.core.mvc.ViewType.JS});
//		
//		oApp1.addMasterPage(masterPage1);
//		
//		oApp1.addDetailPage(detailPage1);
		
		return oApp1;
	}

});