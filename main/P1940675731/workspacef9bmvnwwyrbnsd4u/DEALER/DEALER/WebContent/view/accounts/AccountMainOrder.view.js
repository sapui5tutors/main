sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountMainOrder", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountMainOrder
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountMainOrder";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountMainOrder
	*/ 
	createContent : function(oController) {
	var	accApp = new sap.m.App("accApp",{});
		
 		return accApp;
	}
});