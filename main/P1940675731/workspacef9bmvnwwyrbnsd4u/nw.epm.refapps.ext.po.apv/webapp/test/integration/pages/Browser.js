sap.ui.define([
		"sap/ui/test/Opa5",
		"nw/epm/refapps/purchaseorders/approve/test/integration/pages/Common"
	],
	function(Opa5, Common) {
		"use strict";

		Opa5.createPageObjects({
			onTheBrowserPage: {
				baseClass: Common,
				actions: {
					iChangeTheHashToObjectN: function(iObjIndex) {
						return this.waitFor(this.createAWaitForAnEntitySet({
							entitySet: "Objects",
							success: function(aEntitySet) {
								Opa5.getHashChanger().setHash("/PurchaseOrders/" + aEntitySet[iObjIndex].POId);
							}
						}));
					},

					iChangeTheHashToTheRememberedItem: function() {
						return this.waitFor({
							success: function() {
								var sObjectId = this.getContext().currentListItem.getBindingContext().getProperty("POId");
								Opa5.getHashChanger().setHash("/PurchaseOrders/" + sObjectId);
							}
						});
					},

					iChangeTheHashToTheRememberedId: function() {
						return this.waitFor({
							success: function() {
								var sObjectId = this.getContext().currentId;
								Opa5.getHashChanger().setHash("/PurchaseOrders/" + sObjectId);
							}
						});
					},

					iChangeTheHashToSomethingInvalid: function() {
						return this.waitFor({
							success: function() {
								Opa5.getHashChanger().setHash("/somethingInvalid");
							}
						});
					}
				},
				assertions: {
					iShouldSeeTheHashForObjectN: function(iObjIndex) {
						return this.waitFor(this.createAWaitForAnEntitySet({
							entitySet: "Objects",
							success: function(aEntitySet) {
								var oHashChanger = Opa5.getHashChanger(),
									sHash = oHashChanger.getHash();
								QUnit.strictEqual(sHash, "PurchaseOrders/" + aEntitySet[iObjIndex].POId, "The Hash is not correct");
							}
						}));
					},

					iShouldSeeTheHashForTheRememberedObject: function() {
						return this.waitFor({
							success: function() {
								var sObjectId = this.getContext().currentListItem.getBindingContext().getProperty("POId"),
									oHashChanger = Opa5.getHashChanger(),
									sHash = oHashChanger.getHash();

								QUnit.strictEqual(sHash, "PurchaseOrders/" + sObjectId, "The Hash is not correct");
							}
						});
					},

					iShouldSeeAnEmptyHash: function() {
						return this.waitFor({
							success: function() {
								var oHashChanger = Opa5.getHashChanger(),
									sHash = oHashChanger.getHash();
								QUnit.strictEqual(sHash, "", "The Hash should be empty");
							},
							errorMessage: "The Hash is not Correct!"
						});
					}
				}
			}
		});
	});