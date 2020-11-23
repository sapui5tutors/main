sap.ui.define([
		"sap/ui/test/Opa5",
		"nw/epm/refapps/purchaseorders/approve/test/integration/pages/Common",
		"sap/ui/test/matchers/AggregationLengthEquals",
		"sap/ui/test/matchers/AggregationFilled",
		"sap/ui/test/matchers/PropertyStrictEquals"
	],
	function(Opa5, Common) {
		"use strict";

		var oPOCountBefore;
		var oPOCountAfter;
		var oFirstPO;
		var oSixthPO;

		Opa5.createPageObjects({
			onS2: {
				baseClass: Common,
				actions: {
					iChooseSecondPO: function() {
						var oSecondItem = this.getContext().oPL.getItems()[1];
						this.getContext().oPOName_sel = oSecondItem.getTitle();
						oSecondItem.firePress();
						return this;
					},

					// To get the first PO data used to search for an item
					iGetFirstPOName: function() {
						var oFirstPOItem = this.getContext().oPL.getItems()[0];
						oFirstPO = oFirstPOItem.getTitle();
					},
					// To get the fifth PO data used to search for an item
					iGetSixthPOName: function() {
						var oSixthPOItem = this.getContext().oPL.getItems()[5];
						oSixthPO = oSixthPOItem.getTitle();
					},

					iChooseFirstPOMulti: function() {
						var oFirstItem = this.getContext().oPL.getItems()[0];
						this.getContext().oPONameSel = oFirstItem.getTitle();
						oFirstItem.$().trigger("tap");
						return this;
					},

					iChooseSecondPOMulti: function() {
						var oSecondItem = this.getContext().oPL.getItems()[1];
						this.getContext().oPONameSel = oSecondItem.getTitle();
						oSecondItem.$().trigger("tap");
						return this;
					},

					iRemoveSearchedPO: function() {
						return this.waitFor({
							viewName: "S2_PurchaseOrders",
							id: "searchField",
							success: function(oSearch) {
								var POName = "";
								oSearch.setValue(POName);
								$(oSearch).trigger("onSearch");
							},
							errorMessage: "Did not find the search field"
						});
					},

					iSearchFirstPO: function() {
						return this.waitFor({
							viewName: "S2_PurchaseOrders",
							id: "searchField",
							success: function(oSearch) {
								oSearch.setValue(oFirstPO);
								$(oSearch).trigger("onSearch");
								Opa5.assert.ok(oSearch, "Search field found");
							},
							errorMessage: "Did not find the search field"
						});
					},
					iSearchSixthPO: function() {
						return this.waitFor({
							viewName: "S2_PurchaseOrders",
							id: "searchField",
							success: function(oSearch) {
								oSearch.setValue(oSixthPO);
								$(oSearch).trigger("onSearch");
								Opa5.assert.ok(oSearch, "Search field found");
							},
							errorMessage: "Did not find the search field"
						});
					},
					iClickMultiSelectIcon: function() {
						return this.waitFor({
							id: "multiSelectButton",
							viewName: "S2_PurchaseOrders",
							success: function(oMButton) {
								oMButton.$().trigger("tap");
							},
							errorMessage: "multi-Select Icon is not found"
						});
					},

					iCountPO: function() {
						return this.waitFor({
							id: "page",
							viewName: "S2_PurchaseOrders",
							success: function(oPage) {
								var lCount = oPage.getTitle();
								var objPOCount = lCount.split("(");
								oPOCountBefore = objPOCount[1].split(")");
							},
							errorMessage: "Purchase order title is not present"
						});
					}
				},

				assertions: {
					iSeePOMasterView: function() {
						return this.waitFor({
							id: "list",
							viewName: "S2_PurchaseOrders",
							matchers: new sap.ui.test.matchers.AggregationFilled({
								name: "items"
							}),
							success: function(oPL) {
								this.getContext().oPL = oPL;
								Opa5.assert.ok(oPL, "Found the purchase order list");
							}
						});
					},

					iCheckIfListShowsCompletePOMulti: function() {
						return this.waitFor({
							id: "page",
							viewName: "S2_PurchaseOrders",
							check: function(oPage) {
								var lCount = oPage.getTitle();
								var objPOCount = lCount.split("(");
								oPOCountAfter = objPOCount[1].split(")");
								var oCountAfter = parseInt(oPOCountAfter[0], 10);
								var oCountBefore = parseInt(oPOCountBefore[0], 10);
								if (oCountAfter > oCountBefore) {
									return true;
								} else {
									return false;
								}
							},
							success: function(oPage) {
								Opa5.assert.ok(oPOCountAfter[0], "List shows the complete list of PO's");
							},
							errorMessage: "The counter in the master list is not correct"
						});
					},

					iCheckIfListShowsCompletePO: function() {
						return this.waitFor({
							id: "page",
							viewName: "S2_PurchaseOrders",
							check: function(oPage) {
								var lCount = oPage.getTitle();
								var objPOCount = lCount.split("(");
								oPOCountAfter = objPOCount[1].split(")");
								var oCountBefore = parseInt(oPOCountBefore[0], 10);
								var POCounter = oCountBefore - 1;
								var oCountAfter = parseInt(oPOCountAfter[0], 10);
								if (oCountAfter === POCounter) {
									return true;
								} else {
									return false;
								}
							},
							success: function(oPage) {
								Opa5.assert.ok(oPOCountAfter[0], "List shows the complete list of PO's to be approved");
							},
							errorMessage: "The counter in the master list is not correct"
						});
					},

					iCheckIfListReduced: function() {
						return this.waitFor({
							id: "page",
							viewName: "S2_PurchaseOrders",
							check: function(oPage) {
								var lCount = oPage.getTitle();
								var objPOCount = lCount.split("(");
								oPOCountAfter = objPOCount[1].split(")");
								var oCountAfter = parseInt(oPOCountAfter[0], 10);

								var oCountBefore = parseInt(oPOCountBefore[0], 10);

								if (oCountAfter < oCountBefore) {
									return true;
								} else {
									return false;
								}
							},
							success: function(oPage) {
								Opa5.assert.ok(oPOCountAfter[0], "The PO list is reduced");
							},
							errorMessage: "The counter in the master list is not reduced"
						});
					},

					iCheckIfMultiSelectIsOn: function() {
						return this.waitFor({
							id: "list",
							viewName: "S2_PurchaseOrders",
							check: function(oList) {
								var mStatus = oList.getMode();
								if (mStatus === "MultiSelect") {
									return true;
								} else {
									return false;
								}
							},
							success: function(oList) {
								Opa5.assert.ok(oList, "Multi Select option is enabled-checkboxes available");
							},
							errorMessage: "Multi select option is not enabled"
						});

					},

					iCheckIfMultiSelectIsOff: function() {
						return this.waitFor({
							id: "list",
							viewName: "S2_PurchaseOrders",
							check: function(oList) {
								var mStatus = oList.getMode();
								if (mStatus === "SingleSelectMaster") {
									return true;
								} else {
									return false;
								}
							},
							success: function(oList) {
								Opa5.assert.ok(oList, "Multi Select option is disabled-checkboxes not available");
							},
							errorMessage: "Multi select option is enabled"
						});

					},

					iCheckIfPORemoved: function() {
						return this.waitFor({
							id: "page",
							viewName: "S2_PurchaseOrders",
							check: function(oPage) {
								var lCount = oPage.getTitle();
								var objPOCount = lCount.split("(");
								oPOCountAfter = objPOCount[1].split(")");
								var oCountBefore = parseInt(oPOCountBefore[0], 10);
								var POCounter = oCountBefore - 1;
								var oCountAfter = parseInt(oPOCountAfter[0], 10);
								if (oCountAfter === POCounter) {
									return true;
								} else {
									return false;
								}
							},
							success: function(oPage) {
								Opa5.assert.ok(oPOCountAfter[0], "The counter in the master list is reduced by one-PO removed");
							},
							errorMessage: "The counter in the master list is not reduced by one"
						});

					}

				}

			}
		});
	}
);