sap.ui.controller("com.vikalp.dealermgmt.view.accounts.AccountOrderDetail", { 

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.accounts.AccountOrderDetail
*/
//	onInit: function() {
//
//	}, 
	onTableItemClicks : function(evt){

//		debugger;
		 var selectedRowContext = evt.getSource().getBindingContext().sPath;
// 	    alert(selectedRowContext);
// 	 
 	 var selected = parseInt(selectedRowContext.split('/')[2]);
 	 selectedRow = evt.getSource().getBindingContext().getModel().oData.data2[selected];
 	 selectedItems = selectedRow.ItemNo;
 	 x = selectedRow.ImSalesorder;
		
		

 	window.Saless = ("SalesOrder"+" " +"('"+ x+"')"+customerName[0]+"('"+customerId[0]+"')"+"ItemNumber"+"'"+selectedItems+"'");
//      var x  = loginResult.results[0].Salesorder ;
		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
		router.navTo("AccountOrderitemDetailPage",{customer:Saless});
 	 oDataModel.read("/SOItemDetailsInfoSet?$filter=ImSalesorder eq '"+x+"' and ImItem eq '"+selectedItems+"'" 
 			 ,null,null,false,onSuccessLogin,function(oError){
			  console.log("error",oError);});
   var itemHeaderListJson = new sap.ui.model.json.JSONModel();
	  itemHeaderListJson.setData({data3:loginResult.results});
	  
	  
	  
	  
	  sap.ui.getCore().byId("ItemsLists").setModel(itemHeaderListJson);
	  sap.ui.getCore().byId("MiddleLists").setModel(itemHeaderListJson);
	  sap.ui.getCore().byId("MiddleLists1").setModel(itemHeaderListJson);
	  sap.ui.getCore().byId("orderItemTables").setModel(itemHeaderListJson);
	  
	  var tab = sap.ui.getCore().byId("orderItemTables");
	  var count = tab.getItems().length;
	  sap.ui.getCore().byId("count2").setHeaderText("Delivery Schedules("+count+")");
  
//		   var app = sap.ui.getCore().byId("appId");
//		   app.toDetail('accountorderItemDetail','slide');
	  
			
		   
		   
		
	},
	onNavButtonTap:function(){
		debugger;
//		window.history.go(-1);
		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
		router.navTo("AccountProfile",{customer:customerName[0]});
		sap.ui.getCore().byId("menulist").getItems()[0].setSelected(true);
	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.accounts.AccountOrderDetail
*/
//	onBeforeRendering: function() {
//		
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.accounts.AccountOrderDetail
*/
//	onAfterRendering: function() {
//		  var x  = loginResult.results[0].SalesOrder ;
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.accounts.AccountOrderDetail
*/
//	onExit: function() {
//
//	}

});