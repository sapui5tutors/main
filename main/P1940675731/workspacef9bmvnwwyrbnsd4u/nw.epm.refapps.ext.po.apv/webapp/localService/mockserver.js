sap.ui.define([
		"sap/ui/core/util/MockServer",
		"./MockRequests",
		"./runArguments"
	], function(MockServer, MockRequests, runArguments) {
	"use strict";

	return {

		_sMetadataAddress: "nw.epm.refapps.purchaseorders.approve.localService",
		_sDefaultMockdataPath: "nw.epm.refapps.purchaseorders.approve.localService.mockData",
		_srvUrl: "/sap/opu/odata/sap/SEPMRA_PO_APV/", //service url

		/**
		 * Initializes the mock server. You can configure the delay with the URL parameter "serverDelay"
		 * The local mock data in this folder is returned instead of the real data for testing.
		 *
		 * @public
		 */

		init: function() {
			var oUriParameters = jQuery.sap.getUriParameters(),
				oMockServer = new MockServer({
					rootUri: this._srvUrl
				}),
				oRequests = new MockRequests(oMockServer),
				sMetadataPath = jQuery.sap.getModulePath(this._sMetadataAddress),
				sMockdataPath = jQuery.sap.getModulePath(runArguments.mockPath ? runArguments.mockPath : this._sDefaultMockdataPath),
				aRequests;

			MockServer.config({
				autoRespond: true,
				autoRespondAfter: (oUriParameters.get("serverDelay") || 0)
			});

			// load local mock data
			oMockServer.simulate(sMetadataPath + "/metadata.xml", sMockdataPath);
			aRequests = oMockServer.getRequests();
			oMockServer.setRequests(aRequests.concat(oRequests.getRequests()));
			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		}

	};

});