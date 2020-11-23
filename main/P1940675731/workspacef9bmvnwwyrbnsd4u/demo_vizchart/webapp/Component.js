sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/vizchart/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.vizchart.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			
			var model1 = new sap.ui.model.json.JSONModel();
			model1.loadData("model/chartdetail.json");
			this.setModel(model1);
			sap.ui.getCore().setModel(model1);

		}
	});

});