sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("ShopCart.controller.Categories", {
	// onInit: function(){
	// 	var basicList = this.getView().byId("CategoriesNumber");
 //            	var path="JSON>";
 //            	basicList.bindItems({
 //            		path:path+"/Categories",
 //            		template: new sap.m.ObjectListItem({
 //            			title:"{JSON>CategoryName}",
 //            			number:"{JSON>NumberOfProducts}",
 //            			type:"Active",
 //            			press: function(){
 //           var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
	// 		oRouter.navTo("SubCategories");
 //            			}
 //            	})
	// });
	// }
		onClick: function(oEvt){
			var oIndex = oEvt.getSource().oBindingContexts.JSON.sPath.split("/")[2];
			var oCategory = oEvt.getSource().oBindingContexts.JSON.oModel.oData.Categories[oIndex].Category;
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("SubCategories",{val:oIndex, Category:oCategory});
		},
		onFilter: function(oEvent){
						// build filter array
			var aFilter = [], sQuery = oEvent.getParameter("query"),
				// retrieve list control
				oList = this.getView().byId("productsList"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("CategoryName", FilterOperator.Contains, sQuery));
			}
			// apply filter. an empty filter array simply removes the filter
			// which will make all entries visible again
			oBinding.filter(aFilter);
		}
	}
	);
	});