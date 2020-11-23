sap.ui.controller("com.vikalp.dealermgmt.view.accounts.AccountPerformance", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.accounts.AccountPerformance
*/
//	onInit: function() {
//		
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.accounts.AccountPerformance
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.accounts.AccountPerformance
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.accounts.AccountPerformance
*/
//	onExit: function() {
//
//	}
	onMonthSelect:function(oEvent){
		debugger;
//		var model = this.getModel();
//		  if (model) {
//		    var selectedKeys = model.getProperty('/selected');
//		    if (selectedKeys) {
//		      this.setSelectedKeys(selectedKeys);
//		    } else {
//		      this.setSelectedKeys([]);  
//		    }
//		  } else {
//		    this.setSelectedKeys([]);
//		  }
		
		var z = sap.ui.getCore().byId("select").mProperties.selectedKey;
		console.log("x equals",z);
		
		oDataModel.read("/PerBasedOnProductInfoSet?$filter=ImKunnr eq '"+customerId+"' and ImMonth eq '"+z+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
		var ProductJson = new sap.ui.model.json.JSONModel();
		ProductJson.setData({data9:loginResult.results});
		
		sap.ui.getCore().byId("dualSC").setModel(ProductJson);
		
		
		
	}
});