var data;
sap.ui.jsview("com.vikalp.dealermgmt.view.subContainer", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.subContainer
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.subContainer";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.subContainer
	*/ 
	
	createContent : function(oController) {
		debugger;	
		this.setDisplayBlock(true);
		
		
		data = this.getViewData();
		
		console.log("data",data);
		
		console.log("dataRoel",data.Role);
 		
		var oApp = new sap.m.App("appSubNavContainer").addStyleClass("navContaner") ;
		
		oApp.attachAfterNavigate(onAfterNavigate);
		
			var Z_DMA_Dashboard = sap.ui.view({id:"Dashboard", viewName:"com.vikalp.dealermgmt.view.Dashboard", viewData:{"Role":data.Role,"Image":data.Image,"userName":data.userName,"Name":data.Name}, type:sap.ui.core.mvc.ViewType.JS});
////			
			oApp.addPage(Z_DMA_Dashboard);
		
		var oShell = new sap.ui.unified.Shell("shell",{
			content:new sap.m.Shell("mainWrapper",{
				app:oApp
				})
		});
			
 		return oShell;
	}

});