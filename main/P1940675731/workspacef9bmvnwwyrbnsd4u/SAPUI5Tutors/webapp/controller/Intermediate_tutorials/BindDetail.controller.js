sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sapui5tutors.controller.Intermediate_tutorials.BindDetail", {
		onInit: function(){
					if(sap.ui.Device.system.tablet)
					{
						var menubutton1 = this.getView().byId("menuIntButton1");
						menubutton1.setVisible(false);
					}
				},
             onNavBack: function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("IntermediateMaster");
             }
	});

});