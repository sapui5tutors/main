sap.ui.jsview("com.vikalp.dealermgmt.view.main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.main
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.main
	*/ 
	createContent : function(oController) {
		
		this.setDisplayBlock(true);
		
		var app = new sap.m.App("appNavContainer").addStyleClass("navContaner");
//		
//		var Z_DMA_Losgin = sap.ui.view({id:"Login", viewName:"com.vikalp.dealermgmt.view.Login", type:sap.ui.core.mvc.ViewType.JS});
		
//		app.addPage(Z_DMA_Login);
//		this.orouter = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//		this.orouter.navTo("Login", null, false);
//		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//		router.navTo("Login",null,false);
		return app;
 		
	}

});