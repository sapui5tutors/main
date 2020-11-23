sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function(Controller,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("ShopCart.controller.SubCategories", {
		onInit : function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
			},
			
		_handleRouteMatched : function(oEvent) {
			var _self = this;
			var loObject = oEvent.getParameters().arguments.Category;
			
			var oList = this.getView().byId("subproductsList");
			// if (_self._isObjectEmpty(loObject)) {}
			
			var basicList = this.getView().byId("subproductsList");
             	var path="SUB>";
             	basicList.bindItems({
             		path:path+"/SubCategories",
             		template: new sap.m.ObjectListItem({
             			title:"{SUB>CategoryName}",
             			number:"{SUB>NumberOfProducts}",
             			type:"Active",
             			press: this.onClick
             	})
	});
			var oBinding = basicList.getBinding("items");
			var oFilter = new Filter("Category", FilterOperator.EQ, loObject);
			oBinding.filter([ oFilter ]);
		},
		onFilter: function(oEvent){
						// build filter array
			var aFilter = [], sQuery = oEvent.getParameter("query"),
				// retrieve list control
				oList = this.getView().byId("subproductsList"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("CategoryName", FilterOperator.Contains, sQuery));
			}
			// apply filter. an empty filter array simply removes the filter
			// which will make all entries visible again
			oBinding.filter(aFilter);
		},
	onClick: function(oEvt){
			var oIndex = oEvt.getSource().oBindingContexts.SUB.sPath.split("/")[2];
			var oCategory = oEvt.getSource().oBindingContexts.SUB.oModel.oData.SubCategories[oIndex].Category;
			var oProduct = oEvt.getSource().mProperties.title;
			// var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("Item",{val:oIndex,Category:oCategory,Product:oProduct});
		}
	});
});