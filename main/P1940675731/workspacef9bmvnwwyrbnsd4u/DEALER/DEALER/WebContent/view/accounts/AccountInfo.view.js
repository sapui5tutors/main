sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountInfo", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountInfo
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountInfo";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountInfo
	*/ 
	createContent : function(oController) {
		
//		var accountOverviewTab = new sap.m.IconTabFilter({
//			
//			icon:"sap-icon://company-view",
//			content:[new sap.m.Text({text:"Account Overview Tab"})]
//		});
//		
//		var creditInfoTab = new sap.m.IconTabFilter({
//			
//			icon:"sap-icon://hint",
//			content:[new sap.m.Text({text:"Credit Information Overview Tab"})]
//		});
//		
//		var salesSummary = new sap.m.IconTabFilter({
//			
//			icon:"sap-icon://sales-notification",
//			content:[new sap.m.Text({text:"Sales Summary Tab"})]
//		});
//		
//		var profileTabFilter = new sap.m.IconTabBar({
//			
//			items:[accountOverviewTab,creditInfoTab,salesSummary],
//			content:[new sap.m.Button({text:"Click ME"})]
//		});
		
		
		
		return new sap.m.Page({
			title: "Account Information",

			content: [
//profileTabFilter
			]
		});
	}

});