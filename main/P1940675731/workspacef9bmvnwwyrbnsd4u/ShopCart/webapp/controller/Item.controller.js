sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function(Controller,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("ShopCart.controller.Item", {
		onInit : function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
			},
			
		_handleRouteMatched : function(oEvent) {
			var _self = this;
			// var loCategory = oEvent.getParameters().arguments.Category;
			var loProduct = oEvent.getParameters().arguments.Product;
			var basicList = this.getView().byId("itemsList");
             	var path="ITEMS>";
             	basicList.bindItems({
             		path:path+"/Items",
             		template: new sap.m.ObjectListItem({
             			icon:"{ITEMS>PictureUrl}",
             			title:"{ITEMS>Name}",
             			number:"{ITEMS>Price}",
             			numberUnit:"{ITEMS>Unit}",
             			type:"Active",
             			firstStatus:[{
             				text:"{ITEMS>Weight}"
             			}],
             			// secondStatus:[{
             			// 	text:"{ITEMS>SupplierName}"
             			// }],
             			attributes: [{
		    		   	text:"Supp: {ITEMS>SupplierName}"
		            }
		    		 //           {
		    			// text:""
		    		 //           }
		    		            
		    		],
             			press:_self.onClick
             	})
	});
			var oBinding = basicList.getBinding("items");
			// var oFilter = new Filter("Category", FilterOperator.EQ, loCategory);
			var oFilter2 = new Filter("Product", FilterOperator.EQ, loProduct);
			oBinding.filter([oFilter2]);
		},
	onClick: function(oEvt){
			
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("Details");
		},
		onFilter: function(oEvent){
			var aFilter = [], sQuery = oEvent.getParameter("query"),
				oList = this.getView().byId("itemsList"),
				oBinding = oList.getBinding("items");
			if (sQuery) {
				aFilter.push(new Filter("Product", FilterOperator.Contains, sQuery));
			}
			oBinding.filter(aFilter);
		}
	});
});