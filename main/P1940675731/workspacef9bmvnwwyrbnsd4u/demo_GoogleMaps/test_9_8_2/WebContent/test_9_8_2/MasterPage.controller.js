sap.ui.controller("test_9_8_2.MasterPage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf test_9_8_2.MasterPage
*/
	onInit: function() {
		var model1 = new sap.ui.model.json.JSONModel();
		model1.loadData("model/expense.json");
	     sap.ui.getCore().setModel(model1);
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf test_9_8_2.MasterPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf test_9_8_2.MasterPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf test_9_8_2.MasterPage
*/
//	onExit: function() {
//
//	}
	////////////////
	onSearch1: function(oEvent) {
		debugger;
		jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameter("query"));
//        var tpmla = oEvent.getParameter("Product Name");
		var searchString = oEvent.getParameters("query").query;
		var filters = new Array();
        var oFilter = [new sap.ui.model.Filter("Product Name", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.Contains, searchString),
        new sap.ui.model.Filter("Product ID", sap.ui.model.FilterOperator.Contains, searchString),
        new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchString),
        new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, searchString)];

      filters.push(oFilter);
        var oBind = sap.ui.getCore().byId("list").getBinding("items");
        
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
	},
	
	onSearch: function(oEvent) {
		debugger;
		jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameter("query"));
//        var tpmla = oEvent.getParameter("Product Name");
		var searchString = oEvent.getParameters("query").newValue;
		var filters = new Array();
        var oFilter = [new sap.ui.model.Filter("Product Name", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.Contains, searchString),
        new sap.ui.model.Filter("Product ID", sap.ui.model.FilterOperator.Contains, searchString),
        new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchString),
        new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, searchString)];

      filters.push(oFilter);
        var oBind = sap.ui.getCore().byId("list").getBinding("items");
        
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
        
        
        //        var filters1 = new Array();
//        var oFilter1 = new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.Contains, searchString);
//        filters.push(oFilter);
//	        filters1.push(oFilter1);
        
//      var oFilter = new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.Contains, searchString);
//      var oFilter = new sap.ui.model.Filter("Product ID", sap.ui.model.FilterOperator.Contains, searchString);
//      var oFilter = new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, searchString);
//      var oFilter = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, searchString);
        
        
        //get list created in view
//        this.oList = sap.ui.getCore().byId("list");
//        this.oList.getBinding("items").filter(filters);
    },
////////////////////
	
//	onSearch: function(event) {
//		debugger;
//        // alert(event.getParameter("query"));
//		jQuery.sap.log.debug("searchField: search for: " + event.getParameter("query"));
//		if(event.getParameter("refreshButtonPressed")){
//   
//      list.bindAggregation("items", { 
//      path: "/Product",
//      template : new sap.m.objectListItem({
//        title: "{Product Name}",
//        number:"{Price}",
//      })
//    });
//			
//		}
//		var filters = [];
//	    var searchString = event.getParameter("query");
//	    if (searchString && searchString.length > 0) {
//	      var filter = new sap.ui.model.Filter("Product Name", sap.ui.model.FilterOperator.Contains, searchString);
//	      filters.push(filter);
//	      this.oList = sap.ui.getCore().byId("list");
//	      this.oList.getBinding("items").filter(filters);
//	       var binding = list.getBinding("items");
//	    binding.filter(filters);
	       
	   
//	    }
//	  
//	   
//		}
//	   
	
	
	
	
	
});