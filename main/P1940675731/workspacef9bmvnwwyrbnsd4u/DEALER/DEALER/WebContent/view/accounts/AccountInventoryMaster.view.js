sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountInventoryMaster", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountInventoryMaster
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountInventoryMaster";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountInventoryMaster
	*/ 
	createContent : function(oController) {
		debugger;
		var oMenuInventory = new sap.m.List("inventoryLists",{
			inset:false,
//			UpdateFinished : function(oEvent){   	
//				
//		          oEvent.getSource().getItems()[0].setSelected(true);	            
//		          } 
		});
         var oMenuInventoryItem = new sap.m.ObjectListItem({
 			
        	 title:"{MatlDesc}",
	    	   number:"{NetPrice}",
	    	   numberUnit:"{Currency}",
	    	   selected:true,
//	    	   intro:"{DocStatus}",
	    	   type:"Active",
	    	   attributes: [
	    		            {
	    			text:"{Material}"
	    		            },],
	    		
//	    		selectionChange: function(oEvent) {
//	    		    console.debug(oEvent);
//	    		  },
	    	
 			press:oController.onInventoryMenuClick	
 		});
         debugger;
 		oDataModel.read("/ProductListInfoSet?$filter=ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
 		var InventoryListJson = new sap.ui.model.json.JSONModel();
 		InventoryListJson.setData({inventorydata:loginResult.results});
        console.log("InventoryListJson",InventoryListJson)
 		sap.ui.getCore().byId("inventoryLists").setModel(InventoryListJson);
         oMenuInventory.bindAggregation("items","/inventorydata",oMenuInventoryItem);
 		
 		return new sap.m.Page({
  			headerContent: new sap.m.Label("CustomerLabelnew",{design: sap.m.LabelDesign.Bold,textAlign: sap.ui.core.TextAlign.Center,  width:'100%'}),
  			subHeader: 
				new sap.m.Bar({
					contentMiddle: [
			new sap.m.SearchField(  {
				placeholder: "Search",
				showMagnifier: false,
//				showRefreshButton: true,
				search: oController.onSearch,
				liveChange: oController.onLiveChange,
				width: "100%",
//				tooltip: "Search for objects",
//				refreshButtonTooltip: "Refresh"
			})
		]
                              }), 
			content: [
oMenuInventory
			]
		});
	}

});