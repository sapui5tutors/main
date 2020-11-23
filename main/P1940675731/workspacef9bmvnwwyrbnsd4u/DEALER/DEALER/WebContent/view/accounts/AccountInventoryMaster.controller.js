var flag;
sap.ui.controller("com.vikalp.dealermgmt.view.accounts.AccountInventoryMaster", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.accounts.AccountInventoryMaster
*/
//	onInit: function() {
//		oDataModel.read("/ProductListInfoSet?$filter=ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
// 		var InventoryListJson = new sap.ui.model.json.JSONModel();
// 		InventoryListJson.setData({datanew:loginResult.results});
// 		sap.ui.getCore().byId("inventoryLists").setModel(InventoryListJson);
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.accounts.AccountInventoryMaster
*/
//	onBeforeRendering: function() {
//		oDataModel.read("/ProductListInfoSet?$filter=ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
// 		var InventoryListJson = new sap.ui.model.json.JSONModel();
// 		InventoryListJson.setData({datanew:loginResult.results});
// 		sap.ui.getCore().byId("inventoryLists").setModel(InventoryListJson);
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.accounts.AccountInventoryMaster
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.accounts.AccountInventoryMaster
*/
//	onExit: function() {
//
//	}
	onInventoryMenuClick:function(oEvent){
		debugger;
		sap.ui.getCore().byId("Quant").setValue("")
		sap.ui.getCore().byId("ReqDate").setValue("")
		if(flag==1){
		sap.ui.getCore().byId("checkItemTables").destroy();
		flag=0;
		}
		else if(flag==2)
			{
			sap.ui.getCore().byId("headertext").destroy();
			sap.ui.getCore().byId("contenttext").destroy();
			flag = 0;
			}
		oEvent.getSource().setSelected(true);
		
		 var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
		 router.navTo("AccountInventoryDetail");
		 var path = oEvent.oSource.getBindingContext().sPath;
			var selly = parseInt(path.split('/')[2]);
			
		 var vb = oEvent.oSource.getModel().oData.inventorydata[selly];
		 material = vb.Material;
		    oDataModel.read("/ProductDetailsSet?$filter=Material eq '"+material+"' and ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
	 		var InventoryListJson = new sap.ui.model.json.JSONModel();
	 		InventoryListJson.setData({inventoryheaderdata:loginResult.results});
	 		console.log("supw",InventoryListJson);
	 		sap.ui.getCore().byId("inventoryheaderlist").setModel(InventoryListJson);
	 		sap.ui.getCore().byId("infoForm").setModel(InventoryListJson);
	 		BaseUomDesc = loginResult.results[0].BaseUomDesc;
		 
		 
	},

onSearch: function(oEvent) {
//	debugger;
	jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").query);
//    var tpmla = oEvent.getParameter("Product Name");
	var searchString = oEvent.getParameters("query").query;
	var filters = new Array();
    var oFilter = [new sap.ui.model.Filter("MatlDesc", sap.ui.model.FilterOperator.Contains, searchString),
                   new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, searchString),
                   new sap.ui.model.Filter("NetPrice", sap.ui.model.FilterOperator.Contains, searchString),
//                   new sap.ui.model.Filter("Po", sap.ui.model.FilterOperator.Contains, searchString),
//                   new sap.ui.model.Filter("Salesorder", sap.ui.model.FilterOperator.Contains, searchString),
//                   new sap.ui.model.Filter("Duedate", sap.ui.model.FilterOperator.Contains, searchString)

    
                   ];
    filters.push(oFilter);
    
    var oBind = sap.ui.getCore().byId("inventoryLists").getBinding("items");
    oBind.filter(new sap.ui.model.Filter(oFilter, false));
    
//    this.customerList = sap.ui.getCore().byId("dealerListDialog");
//     this.customerList.getBinding("items").filter(filters);
},

onLiveChange: function(oEvent) {
//	debugger;
	jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").newValue);
//    var tpmla = oEvent.getParameter("Product Name");
	var searchString = oEvent.getParameters("query").newValue;
	var filters = new Array();
    var oFilter = [new sap.ui.model.Filter("MatlDesc", sap.ui.model.FilterOperator.Contains, searchString),
                   new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, searchString),
                   new sap.ui.model.Filter("NetPrice", sap.ui.model.FilterOperator.Contains, searchString),
//                   new sap.ui.model.Filter("Po", sap.ui.model.FilterOperator.Contains, searchString),
//                   new sap.ui.model.Filter("Salesorder", sap.ui.model.FilterOperator.Contains, searchString),
//    new sap.ui.model.Filter("DocStatus", sap.ui.model.FilterOperator.Contains, searchString)

    
                   ];
    filters.push(oFilter);
    
    var oBind = sap.ui.getCore().byId("inventoryLists").getBinding("items");
    oBind.filter(new sap.ui.model.Filter(oFilter, false));
    
//    this.customerList = sap.ui.getCore().byId("dealerListDialog");
//     this.customerList.getBinding("items").filter(filters);
},
});