sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ShopCart.controller.Details", {
		onInit : function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
			},
			
		_handleRouteMatched : function(oEvent) {
			var _self = this;
			var oDetails = this.getView().byId("idDetailsList");

		}
	});
});