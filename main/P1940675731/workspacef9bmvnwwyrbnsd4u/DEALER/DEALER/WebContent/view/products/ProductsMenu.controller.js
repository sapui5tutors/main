var flagProduct;
sap.ui.controller("com.vikalp.dealermgmt.view.products.ProductsMenu", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.orders.Orders
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.orders.Orders
*/
	onBeforeRendering: function() {

		material = loginResult.results[0].Material;
		customerId = loginResult.results[0].ImCustomerid;
		SalesOrg = loginResult.results[0].ImSalesOrg;
		oDataModel.read("/ProductDetailsSet?$filter=Material eq '"+material+"' and ImCustomerid eq '"+customerId+"' and ImSalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
 		var ProductsListJson = new sap.ui.model.json.JSONModel();
 		ProductsListJson.setData({productsheaderdata:loginResult.results});
 		console.log("ProductsListJson",ProductsListJson);
 		sap.ui.getCore().byId("ProductsHeader").setModel(ProductsListJson);
 		sap.ui.getCore().byId("ProductForm").setModel(ProductsListJson);
 		BaseUomDesc = loginResult.results[0].BaseUomDesc;
	},
	
	onProductsMenuClick : function(oEvent){
		debugger;
		if(flagProduct==1){
			sap.ui.getCore().byId("checkProductsTables").destroy();
			var inputValue = sap.ui.getCore().byId("Quantity");
			    inputValue.setValue("");
			var dateValue = sap.ui.getCore().byId("Date");
			    dateValue.setValue("");
			  flagProduct=0;
			}
		
		if(flagProduct==2){
			 var productsheadertext = sap.ui.getCore().byId("productsheadertext").destroy();
//		       productsheadertext.setValue("");
		   var productscontenttext = sap.ui.getCore().byId("productscontenttext").destroy();
//		       productscontenttext.setValue("");
		   sap.ui.getCore().byId("VBox").destroy();
		   var inputValue = sap.ui.getCore().byId("Quantity");
		    inputValue.setValue("");
		var dateValue = sap.ui.getCore().byId("Date");
		    dateValue.setValue("");
		   flagProduct = 0;
		}
		
		oEvent.getSource().setSelected(true);
//		   var app = sap.ui.getCore().byId("appId");
//			  var list = sap.ui.getCore().byId("salesOrderList")
			  var item = oEvent.oSource.getBindingContext().sPath;
			  var selected = parseInt(item.split('/')[2]);
//			  var selected= list.getSelectedItems();
			  var selectedData = oEvent.oSource.getModel().oData.dataProducts[selected];

		       material = selectedData.Material;
		       customerId = selectedData.ImCustomerid;
		       SalesOrg = selectedData.ImSalesOrg;
		oDataModel.read("/ProductDetailsSet?$filter=Material eq '"+material+"' and ImCustomerid eq '"+customerId+"' and ImSalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
 		var ProductsListJson1 = new sap.ui.model.json.JSONModel();
 		ProductsListJson1.setData({productsheaderdata:loginResult.results});
 		console.log("ProductsListJson1",ProductsListJson1);
 		sap.ui.getCore().byId("ProductsHeader").setModel(ProductsListJson1);
 		sap.ui.getCore().byId("ProductForm").setModel(ProductsListJson1);
 		BaseUomDesc = loginResult.results[0].BaseUomDesc;
		
		
		},
		
		
		onSearch: function(oEvent) {
//			debugger;
			jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").query);
//	        var tpmla = oEvent.getParameter("Product Name");
			var searchString = oEvent.getParameters("query").query;
			var filters = new Array();
	        var oFilter = [new sap.ui.model.Filter("MatlDesc", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("NetPrice", sap.ui.model.FilterOperator.Contains, searchString),
//	                       new sap.ui.model.Filter("Po", sap.ui.model.FilterOperator.Contains, searchString),
//	                       new sap.ui.model.Filter("Salesorder", sap.ui.model.FilterOperator.Contains, searchString),
//	                       new sap.ui.model.Filter("Duedate", sap.ui.model.FilterOperator.Contains, searchString)

	        
	                       ];
	        filters.push(oFilter);
	        
	        var oBind = sap.ui.getCore().byId("oProductsMenu").getBinding("items");
	        oBind.filter(new sap.ui.model.Filter(oFilter, false));
	        
//	        this.customerList = sap.ui.getCore().byId("dealerListDialog");
//	         this.customerList.getBinding("items").filter(filters);
	    },
	    
	    onLiveChange: function(oEvent) {
//			debugger;
			jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").newValue);
//	        var tpmla = oEvent.getParameter("Product Name");
			var searchString = oEvent.getParameters("query").newValue;
			var filters = new Array();
	        var oFilter = [new sap.ui.model.Filter("MatlDesc", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("NetPrice", sap.ui.model.FilterOperator.Contains, searchString),
//	                       new sap.ui.model.Filter("Po", sap.ui.model.FilterOperator.Contains, searchString),
//	                       new sap.ui.model.Filter("Salesorder", sap.ui.model.FilterOperator.Contains, searchString),
//	        new sap.ui.model.Filter("DocStatus", sap.ui.model.FilterOperator.Contains, searchString)

	        
	                       ];
	        filters.push(oFilter);
	        
	        var oBind = sap.ui.getCore().byId("oProductsMenu").getBinding("items");
	        oBind.filter(new sap.ui.model.Filter(oFilter, false));
	        
//	        this.customerList = sap.ui.getCore().byId("dealerListDialog");
//	         this.customerList.getBinding("items").filter(filters);
	    },
	

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.orders.Orders
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.orders.Orders
*/
//	onExit: function() {
//
//	}

});