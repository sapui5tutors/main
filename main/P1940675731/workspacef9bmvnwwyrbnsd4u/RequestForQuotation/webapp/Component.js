sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/RFQ/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.RFQ.Component", {

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

			// set the device model
			// this.setModel(models.createDeviceModel(), "device");
			var oModel3 = new sap.ui.model.json.JSONModel();
		    		oModel3.loadData("model/RFQ.json");
		    	    this.setModel(oModel3, "RFQ");
		    		sap.ui.getCore().setModel(oModel3, "RFQ");
			this.getRouter().initialize();
		}
	});

});