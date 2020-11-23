sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Demo_NaV.controller.View1", {
onClick: function(){
	var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("View2");
}
	});
});