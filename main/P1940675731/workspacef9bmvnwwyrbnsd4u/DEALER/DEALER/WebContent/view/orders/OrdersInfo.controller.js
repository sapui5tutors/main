sap.ui.controller("com.vikalp.dealermgmt.view.orders.OrdersInfo", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.orders.OrdersInfo
*/
//	onInit: function() {
//		
//	},
    
       onTableItemClick : function(evt){
       	debugger;
    	 var selectedRowContext = evt.getSource().getBindingContext().sPath;
//    	    alert(selectedRowContext);
//    	 
    	 var selected = parseInt(selectedRowContext.split('/')[2]);
    	 selectedRow = evt.getSource().getBindingContext().getModel().oData.data2[selected];
    	 selectedItems = selectedRow.ItemNo;
    	 
         var x  = loginResult.results[0].ImSalesorder ;
         var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
		 router.navTo("OrderItemDetail");
      
    	 oDataModel.read("/SOItemDetailsInfoSet?$filter=ImItem eq '"+selectedItems+"' and ImSalesorder eq '"+x+"' "
    			 ,null,null,false,onSuccessLogin,function(oError){
			  console.log("error",oError);});
      var itemHeaderListJson = new sap.ui.model.json.JSONModel();
	  itemHeaderListJson.setData({data3:loginResult.results});
	  sap.ui.getCore().byId("m1Form").setModel(itemHeaderListJson);
	  
	  
	  
	  sap.ui.getCore().byId("orderItemDetailList").setModel(itemHeaderListJson);
	  
	  sap.ui.getCore().byId("m2Form").setModel(itemHeaderListJson);
	  sap.ui.getCore().byId("orderItemTable").setModel(itemHeaderListJson);
//	  sap.ui.getCore().byId("vis").setModel(itemHeaderListJson);
	  var tab = sap.ui.getCore().byId("orderItemTable");
	  var count = tab.getItems().length;
	  sap.ui.getCore().byId("con1").setHeaderText("Delivery Schedules("+count+")");
	  
    	 
//	   var app = sap.ui.getCore().byId("appId");
//	   app.toDetail('orderItemDetail','slide');
	   
	
},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.orders.OrdersInfo
*/
//	onBeforeRendering: function() {
//		
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.orders.OrdersInfo
*/
//	onAfterRendering: function() {
//		
//	
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.orders.OrdersInfo
*/
//	onExit: function() {
//
//	}

});