sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"./../model/utilities"
	], function(Controller, utilities) {
	"use strict";
	/*
        Controller for the view hosting this app
    */
	return Controller.extend("nw.epm.refapps.purchaseorders.approve.controller.Root", {

		onInit: function() {
			this.getView().addStyleClass(utilities.getContentDensityClass());
			this._oAppControl = this.byId("approvalApp");
		},

		/* =========================================================== */
		/* Methods exposed to the application                          */
		/* =========================================================== */

		// hides master on tablet in portrait mode
		hideMaster: function() {
			this._oAppControl.hideMaster();
		},

		// Naviagte back from detail page to master page. Only used on phone.
		backMaster: function() {
			this._oAppControl.backMaster();
		}
	});
});