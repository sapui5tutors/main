sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Test_OperationsOnList.controller.View1", {
		onDelete: function(oEvent) {
			this.getView().byId("list");
			// calculating the index of the selected list item
			var sPath = oEvent.mParameters.listItem.oBindingContexts.Model.sPath;
			var iLength = sPath.length;
			var iIndex = sPath.slice(iLength - 1);
			// Removing the selected list item from the model based on the index
			// calculated
			var oModel = this.getView().getModel("Model");
			var oData = oModel.oData;
			var removed = oData.items.splice(iIndex, 1);
			oModel.setData(oData);
		},

		OnAddClick: function() {

			var oModel = this.getView().getModel("Model");
			var oData = oModel.getData();
			oData.items.unshift({
				"Title": "Gionee",
				"price": "6000"
			});
			oModel.setData(oData);
		}
	});
});