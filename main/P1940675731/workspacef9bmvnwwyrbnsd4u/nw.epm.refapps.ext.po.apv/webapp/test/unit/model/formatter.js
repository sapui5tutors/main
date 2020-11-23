sap.ui.require(
	[
		"nw/epm/refapps/purchaseorders/approve/model/formatter",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/thirdparty/sinon"
	],
	function(formatter, ResourceModel, sinon) {
		"use strict";

		QUnit.module("formatter: listTitle", {
			setup: function() {
				this._oResourceModel = new ResourceModel({
					bundleUrl: [$.sap.getModulePath("nw.epm.refapps.purchaseorders.approve"), "i18n/i18n.properties"].join("/")
				});
				this._oResouceBundle = this._oResourceModel.getResourceBundle();
			},
			teardown: function() {
				this._oResourceModel.destroy();
			}
		});

		QUnit.test("format master page title", function(assert) {
			// Arrange 
			var oBundleStub = sinon.stub(),
				oContextStub = {
					getResourceBundle: oBundleStub
				};
			oBundleStub.returns(this._oResouceBundle);

			// Method under test
			var fListTitle = jQuery.proxy(formatter.listTitle, oContextStub);

			// Assert
			assert.strictEqual(fListTitle(-12), this._oResouceBundle.getText("masterTitle"),
				"'Purchase Orders' is expected as title if the input value is negative");
			assert.strictEqual(fListTitle(0), this._oResouceBundle.getText("masterTitleCount", [0]),
				"'Purchase Orders (0)' is expected as title if there is emptly list in the master page");
			assert.strictEqual(fListTitle(20), this._oResouceBundle.getText("masterTitleCount", 20),
				"'Purchase Orders (20)' is expected as title if there are 20 itmes available in the master page");
		});
	}
);