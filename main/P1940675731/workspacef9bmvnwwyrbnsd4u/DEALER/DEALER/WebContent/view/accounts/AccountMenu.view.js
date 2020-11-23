sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountMenu", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountMenu
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountMenu";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountMenu
	*/ 
	createContent : function(oController) {
		
		var oModel = new sap.ui.model.json.JSONModel("config/configData.json");
		var oMenuList = new sap.m.List("menulist",{
		headerToolbar:new sap.m.Toolbar("customerToolbar",{
			content:[new sap.m.Label("customerButton",{design: sap.m.LabelDesign.Bold,textAlign: sap.ui.core.TextAlign.Center,  width:"100%"}),
//			.addStyleClass("dealerButton"),
			         new sap.m.ToolbarSpacer({}),
			         new sap.m.Button({icon:"sap-icon://customer", iconFirst:false,press:onToolbarClick})]
			}),		
			inset:false,
			updateFinished : function(oEvent){   
				debugger;          
		          oEvent.getSource().getItems()[0].setSelected(true);
	            
		          } 
		});
		
		var oMenuListItem = new sap.m.ObjectListItem({
			
			title:"{name}",
			icon:"{icon}",
			selected:true,
//			iconInset:true,
			type:"Active",
			press:oController.onAccountMenuClick
		});
		
		oMenuList.setModel(oModel);
		oMenuList.bindAggregation("items","/accountMenuItem",oMenuListItem);
		
		return oMenuList;
	}

});