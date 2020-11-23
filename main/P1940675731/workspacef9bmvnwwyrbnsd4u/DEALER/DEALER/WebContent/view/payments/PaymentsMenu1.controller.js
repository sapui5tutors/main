
sap.ui.controller("com.vikalp.dealermgmt.view.payments.PaymentsMenu1", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.main
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.main
*/
	onBeforeRendering: function() {
		debugger;
		 billingNumber = loginResult.results[0].BillingDoc;
	      oDataModel.read("/PaymentsDetailsSet?$filter=ImUsername eq '"+data.userName+"'and BillingDoc eq '"+billingNumber+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
			var headerlistJson = new sap.ui.model.json.JSONModel();
		    headerlistJson.setData({dataHeader:loginResult.results});
		    sap.ui.getCore().byId("oPaymentHeader").setModel(headerlistJson);
		    sap.ui.getCore().byId("informationForm").setModel(headerlistJson);
	},

	onPaymentMenuClick : function(oEvent){
		debugger;
		oEvent.getSource().setSelected(true);
		 var item = oEvent.oSource.getBindingContext().sPath;
		  var selected = parseInt(item.split('/')[2]);
//		  var selected= list.getSelectedItems();
		  var selectedData = oEvent.oSource.getModel().oData.data[selected];
	      var selectedInvoiceNumber = selectedData.BillingDoc;
	      
	      oDataModel.read("/PaymentsDetailsSet?$filter=ImUsername eq '"+data.userName+"'and BillingDoc eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
			var headerlistJson = new sap.ui.model.json.JSONModel();
		    headerlistJson.setData({dataHeader:loginResult.results});
		    sap.ui.getCore().byId("oPaymentHeader").setModel(headerlistJson);
		    sap.ui.getCore().byId("informationForm").setModel(headerlistJson);

	},
	
	onSearch: function(oEvent) {
//		debugger;
		jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").query);
//        var tpmla = oEvent.getParameter("Product Name");
		var searchString = oEvent.getParameters("query").query;
		var filters = new Array();
        var oFilter = [new sap.ui.model.Filter("BillingDoc", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Amount", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Customers", sap.ui.model.FilterOperator.Contains, searchString),
//                       new sap.ui.model.Filter("Po", sap.ui.model.FilterOperator.Contains, searchString),
//                       new sap.ui.model.Filter("Salesorder", sap.ui.model.FilterOperator.Contains, searchString),
//                       new sap.ui.model.Filter("Duedate", sap.ui.model.FilterOperator.Contains, searchString)

        
                       ];
        filters.push(oFilter);
        
        var oBind = sap.ui.getCore().byId("oPaymentInvoice").getBinding("items");
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
        
//        this.customerList = sap.ui.getCore().byId("dealerListDialog");
//         this.customerList.getBinding("items").filter(filters);
    },
    
    onLiveChange: function(oEvent) {
//		debugger;
		jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").newValue);
//        var tpmla = oEvent.getParameter("Product Name");
		var searchString = oEvent.getParameters("query").newValue;
		var filters = new Array();
        var oFilter = [new sap.ui.model.Filter("BillingDoc", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Amount", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Customers", sap.ui.model.FilterOperator.Contains, searchString),
//                       new sap.ui.model.Filter("Po", sap.ui.model.FilterOperator.Contains, searchString),
//                       new sap.ui.model.Filter("Salesorder", sap.ui.model.FilterOperator.Contains, searchString),
//        new sap.ui.model.Filter("DocStatus", sap.ui.model.FilterOperator.Contains, searchString)

        
                       ];
        filters.push(oFilter);
        
        var oBind = sap.ui.getCore().byId("oPaymentInvoice").getBinding("items");
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
        
//        this.customerList = sap.ui.getCore().byId("dealerListDialog");
//         this.customerList.getBinding("items").filter(filters);
    },
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.main
*/
//	onExit: function() {
//
//	}

});