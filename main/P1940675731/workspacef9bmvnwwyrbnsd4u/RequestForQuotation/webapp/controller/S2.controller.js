sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.RFQ.controller.S2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.RFQ.view.view.S2
		 */
		//	onInit: function() {
		//
		//	},
		onTableRowClick : function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("S3");
		},
		onSearch: function(oEvent) {
			   var laFilter = [];
			   var loValue = oEvent.getSource().getValue();
			   var loTable = oEvent.getSource().getParent().getParent();
			   loTable.setNoDataText(this.getView().getModel("i18n").getResourceBundle().getText("noSearchDataText"));
			   var laParam = ["RFQNumber"];
			   for(var i=0;i<laParam.length;i++){
			   
			    var filter = new sap.ui.model.Filter(laParam[i], sap.ui.model.FilterOperator.Contains, loValue);       
			    laFilter.push(filter);
			    }
			   
			    var loFilters = new sap.ui.model.Filter(laFilter, false);
				var loBinding = loTable.getBinding("items");
				loBinding.filter(loFilters, sap.ui.model.FilterType.Application);
		
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.RFQ.view.view.S2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.RFQ.view.view.S2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.RFQ.view.view.S2
		 */
		//	onExit: function() {
		//
		//	}

	});

});