sap.ui.define([
		"sap/ui/core/UIComponent",
		"./controller/Application"
	], function(UIComponent, Application) {
	"use strict";
	
    /*
     *  This class represents the app. The lifecycle methods of this class are used by the
     *  Firoi Launchpad to start and stop the app.
     *  Note that this class delegates all programm logic to the ApplicationController.
     *  Hence, only the declarative configuration of the app can be found here.
     */

	return UIComponent.extend("nw.epm.refapps.purchaseorders.approve.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app.
		 * After having called the initialization routine of the super class the app specific
		 * initialization is delegated to the Application controller.
		 */
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			var oApplication = new Application(this);
			oApplication.init();
		}
	});
});