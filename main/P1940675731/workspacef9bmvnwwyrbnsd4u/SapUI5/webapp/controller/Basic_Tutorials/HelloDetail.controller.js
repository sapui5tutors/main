sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sapui5.controller.Basic_Tutorials.HelloDetail", {
             onNavBack: function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("TutorialsMaster");
             }
	});

});