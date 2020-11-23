sap.ui.define([
		"nw/epm/refapps/purchaseorders/approve/controller/BaseController"
	], function(BaseController) {
	"use strict";

	/*
        Common base class for the controllers of this app containing some convenience methods
    */
	return BaseController.extend("nw.epm.refapps.purchaseorders.approve.controller.EmptyPage", {

		onNavButtonPress: function(){
			this.getApplication().navBack(true, true);
		}
	});
});