sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/myApp/model/formatter"
], function(Controller,Filter,FilterOperator,formatter) {
	"use strict";

	return Controller.extend("sap.myApp.controller.View1", {
		formatter:formatter,
				onInit: function(){
				  var data = {  
				"Collection" : [ {  
				"id" : "50"  
					} ]  
					 };	
		var oModel = new sap.ui.model.json.JSONModel();  
		 oModel.setData(data);
		 var PV = this.getView().byId("abc");
		 PV.bindElement("/Collection");
				},
				onFilterProducts : function (oEvent) {

			// build filter array
			var aFilter = [], sQuery = oEvent.getParameter("query"),
				// retrieve list control
				oList = this.getView().byId("productsList"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
			}
			// apply filter. an empty filter array simply removes the filter
			// which will make all entries visible again
			oBinding.filter(aFilter);
		}

	});

});