sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sapui5tutors.controller.Advanced_Tutorials.VizChartsDetail", {
		onInit: function(){
					if(sap.ui.Device.system.tablet)
					{
						var menubutton1 = this.getView().byId("menuAdvButton6");
						menubutton1.setVisible(false);
					}
				},
           onNavBack: function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("AdvancedMaster");
             }
	});

});