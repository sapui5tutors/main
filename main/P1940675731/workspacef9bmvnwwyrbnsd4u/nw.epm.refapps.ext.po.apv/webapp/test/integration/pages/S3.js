sap.ui.define([
		"sap/ui/test/Opa5",
		"nw/epm/refapps/purchaseorders/approve/test/integration/pages/Common",
		"sap/ui/test/matchers/AggregationLengthEquals",
		"sap/ui/test/matchers/AggregationFilled",
		"sap/ui/test/matchers/PropertyStrictEquals"
	],
	function(Opa5, Common) {
		"use strict";

		var totalBefore;
		var afterTotal;

		Opa5.createPageObjects({
			onS3: {
				baseClass: Common,
				actions: {

					iClickRejectAll: function() {
						return this.waitFor({
							id: "rejectButton",
							viewName: "S3_PurchaseOrderSummary",
							success: function(oRejectAllButton) {
								oRejectAllButton.$().trigger("tap");
							},
							errorMessage: "Reject all button is not available"
						});
					},
					iWriteApprovalRejectionNoteMulti: function() {
						// set approval note and click ok button	   
						return this.waitFor({
							id: ["noteTextArea", "confirmButton"],
							viewName: "S3_PurchaseOrderSummary",
							success: function(aControls) {
								// Text area
								var oTextArea = aControls[0];
								// OK button
								var oOkBtn = aControls[1];
								// set TextArea
								oTextArea.setValue("PO Approval Rejection");
								oOkBtn.firePress();
							}
						});
					},

					iApprovePO: function() {
						return this.waitFor({
							id: "approveButton",
							viewName: "S3_PurchaseOrderDetails",
							success: function(oApproveBtn) {
								oApproveBtn.firePress();
							}
						});
					},
					iRejectPO: function() {
						return this.waitFor({
							id: "rejectButton",
							viewName: "S3_PurchaseOrderDetails",
							success: function(oRejectBtn) {
								oRejectBtn.firePress();
							}
						});
					},
					iWriteApprovalConfirmationNote: function() {
						// set approval note and click ok button	   
						return this.waitFor({
							id: ["noteTextArea", "confirmButton"],
							viewName: "S3_PurchaseOrderDetails",
							success: function(aControls) {
								// Text area
								var oTextArea = aControls[0];
								// OK button
								var oOkBtn = aControls[1];
								// set TextArea
								oTextArea.setValue("PO Approval Confirmation");
								oOkBtn.firePress();
							}
						});
					},
					iWriteApprovalRejectionNote: function() {
						// set approval note and click ok button	   
						return this.waitFor({
							id: ["noteTextArea", "confirmButton"],
							viewName: "S3_PurchaseOrderDetails",
							success: function(aControls) {
								// Text area
								var oTextArea = aControls[0];
								// OK button
								var oOkBtn = aControls[1];
								// set TextArea
								oTextArea.setValue("PO Approval Rejection");
								oOkBtn.firePress();
							}
						});
					},
					iClickCancelFromDialog: function() {
						// set approval note and click ok button	   
						return this.waitFor({
							id: ["noteTextArea", "confirmButton", "cancelButton"],
							viewName: "S3_PurchaseOrderDetails",
							success: function(aControls) {
								// Cancel button
								var oCancelBtn = aControls[2];
								// set TextArea
								oCancelBtn.firePress();
							}
						});
					}
				},

				assertions: {

					iSeeTotalOnDetailsPage: function() {
						return this.waitFor({
							viewName: "S3_PurchaseOrderSummary",
							id: "header",
							check: function(oHeader) {
								this.getContext().beforeTotal = oHeader.getNumber();
								totalBefore = oHeader.getNumber().replace(/,/g, "");
								if (this.getContext().beforeTotal !== "") {
									return true;
								} else {
									return false;
								}
							},
							success: function(oHeader) {
								Opa5.assert.ok(oHeader, "Current Total: " + this.getContext().beforeTotal);
							},
							errorMessage: "Total not displayed"
						});
					},

					iSeeBalanceOnDetailsPage: function() {
						return this.waitFor({
							viewName: "S3_PurchaseOrderSummary",
							id: "balance",
							check: function(oHeader) {
								this.getContext().beforeBalance = oHeader.getNumber();
								if (this.getContext().beforeBalance !== "") {
									return true;
								} else {
									return false;
								}
							},
							success: function(oHeader) {
								Opa5.assert.ok(oHeader, "Current Balance: " + this.getContext().beforeBalance);
							},
							errorMessage: "Did not find balance amount"
						});
					},

					iCheckIfTotalUpdated: function() {
						return this.waitFor({
							viewName: "S3_PurchaseOrderSummary",
							id: "purchaseOrderTable",
							matchers: new sap.ui.test.matchers.AggregationFilled({
								name: "items"
							}),
							success: function(oPOTable) {
								return this.waitFor({
									viewName: "S3_PurchaseOrderSummary",
									id: "header",
									check: function(oHeader) {
										afterTotal = oHeader.getNumber().replace(/,/g, "");
										afterTotal = parseFloat(afterTotal);
										totalBefore = parseFloat(totalBefore);
										if (totalBefore < afterTotal) {
											return true;
										} else {
											return false;
										}
									},
									success: function(oHeader) {
										Opa5.assert.ok(oHeader, "Total is updated");
									},
									errorMessage: "Total is not updated"
								});
							},
							errorMessage: "Did not find the PO table"
						});

					},

					iCheckIfBalanceUpdated: function() {
						return this.waitFor({
							viewName: "S3_PurchaseOrderSummary",
							id: "purchaseOrderTable",
							matchers: new sap.ui.test.matchers.AggregationFilled({
								name: "items"
							}),
							success: function(oPOTable) {
								return this.waitFor({
									viewName: "S3_PurchaseOrderSummary",
									id: "balance",
									check: function(oBalance) {
										var afterBalance = oBalance.getNumber();
										if (afterBalance !== this.getContext().beforeBalance) {
											return true;
										} else {
											return false;
										}
									},
									success: function(oBalance) {
										Opa5.assert.ok(oBalance, "Balance is updated");
									},
									errorMessage: "Balance is not updated"

								});
							},
							errorMessage: "Did not find the PO table"
						});

					},

					iSeePOSummaryTable: function() {
						return this.waitFor({
							id: "purchaseOrderTable",
							viewName: "S3_PurchaseOrderSummary",
							success: function(oPOTable) {
								this.getContext().oPOTable = oPOTable;
								Opa5.assert.ok(oPOTable, "Found the purchase order summary");
							}
						});
					},
					iCheckIfDetailsSectionIsEmpty: function() {

						return this.waitFor({
							id: "DetailPage",
							viewName: "S3_PurchaseOrderSummary",
							check: function(oPage) {
								var oDetailsTitle = oPage.getTitle();
								var objPOCount = oDetailsTitle.split("(");
								var oPOCount = objPOCount[1].split(")");
								if ((oPOCount[0].toString()) === "0") {
									return true;
								} else {
									return false;
								}
							},
							success: function(oPage) {
								Opa5.assert.ok(oPage, "No purchase order is displayed on details page");
							},
							errorMessage: "purchase order is displayed on details page"
						});

					},
					iCheckIfSecondItemDisplayedInPOTable: function() {

						return this.waitFor({
							id: "purchaseOrderTable",
							viewName: "S3_PurchaseOrderSummary",
							matchers: new sap.ui.test.matchers.AggregationFilled({
								name: "items"
							}),
							check: function(oPOSummaryTable) {
								this.getContext().oPOSTable = oPOSummaryTable;
								var oFirstItem = this.getContext().oPOSTable.getItems()[1];
								var oSName = oFirstItem.getCells()[0].getTitle();
								//verifying title
								if (oSName === this.getContext().oPONameSel) {
									return true;
								} else {
									return false;
								}
							},
							success: function(oPOSummaryTable) {
								Opa5.assert.ok(oPOSummaryTable, "The selected entry is added to the list on the details page");
							},
							errorMessage: "The selected entry is not added to the list on the details page."
						});

					},

					iCheckIfItemDisplayedInPOTable: function() {

						return this.waitFor({
							id: "purchaseOrderTable",
							viewName: "S3_PurchaseOrderSummary",
							matchers: new sap.ui.test.matchers.AggregationFilled({
								name: "items"
							}),
							check: function(oPOSummaryTable) {
								this.getContext().oPOSTable = oPOSummaryTable;
								var oFirstItem = this.getContext().oPOSTable.getItems()[0];
								var oSName = oFirstItem.getCells()[0].getTitle();
								//verifying title
								if (oSName === this.getContext().oPONameSel) {
									return true;
								} else {
									return false;
								}
							},
							success: function(oPOSummaryTable) {
								Opa5.assert.ok(oPOSummaryTable, "The selected entry is added to the list on the details page");
							},
							errorMessage: "The selected entry is not added to the list on the details page."
						});

					},

					iCheckAfterApprovalValidations: function() {

						return this.waitFor({
							//increase opa's polling because the message toast is only shown for a brief moment
							pollingInterval: 100,
							viewName: "S3_PurchaseOrderDetails",
							check: function(oView) {
								return !!sap.ui.test.Opa5.getJQuery()(".sapMMessageToast").length;
							},
							success: function(oView) {
								Opa5.assert.ok(oView, "The message toast is displayed");
							},
							errorMessage: "The message toast did not get displayed"
						});
					},
					iSeeApprovalDialogMulti: function() {
						return this.waitFor({
							id: "approvalDialog",
							viewName: "S3_PurchaseOrderSummary",
							success: function(oDialog) {
								Opa5.assert.ok(oDialog.isOpen(), "Found the Approve/Reject Dialog");
							},
							errorMessage: "The Approve/Reject Dialog is not open"
						});
					},
					iCheckIfDifferentPOSelected: function() {
						return this.waitFor({
							id: "header",
							viewName: "S3_PurchaseOrderDetails",
							check: function(oPH) {
								// afte an PO approval, the PO header should another one 
								if (oPH.getTitle() !== this.getContext().oPOName_sel) {
									return true;
								}
								return false;
							},
							success: function(oPH) {
								Opa5.assert.ok(oPH.getTitle(), "Next purchase order has been selected");
							},
							errorMessage: "Next purchase order has not been selected"
						});
					},

					iSeeItemSelected: function() {
						return this.waitFor({
							id: "header",
							viewName: "S3_PurchaseOrderDetails",
							check: function(oPH) {
								// afte an PO approval, the PO header should another one 
								if (oPH.getTitle() === this.getContext().oPOName_sel) {
									return true;
								}
								return false;
							},
							success: function(oPH) {
								Opa5.assert.ok(oPH.getTitle(), "The item remians selected after clicking Cancel");
							},
							errorMessage: ". The item has not been selected"
						});
					},

					iSeeDefaultPODetail: function() {
						this.waitFor({
							id: "header",
							viewName: "S3_PurchaseOrderDetails",
							check: function(oPH) {
								if (oPH.getTitle() !== "") {
									return true;
								}
								return false;
							},
							success: function(oPH) {
								Opa5.assert.ok(oPH.getTitle(), "Found the default purchase order detail");
							}
						});
						return this;
					},
					iCheckPODetail: function() {
						return this.waitFor({
							id: "header",
							viewName: "S3_PurchaseOrderDetails",
							matchers: new sap.ui.test.matchers.PropertyStrictEquals({
								name: "title",
								value: this.getContext().oPOName_sel
							}),
							success: function(oPH) {
								var oPOName = oPH.getTitle();
								strictEqual(oPOName, this.getContext().oPOName_sel, "Found the detail view of the selected purchase order");
							}
						});
					},
					iSeeApprovalDialog: function() {
						return this.waitFor({
							id: "approvalDialog",
							viewName: "S3_PurchaseOrderDetails",
							success: function(oDialog) {
								Opa5.assert.ok(oDialog.isOpen(), "Found the Approve/Reject Dialog");
							},
							errorMessage: "The Approve/Reject Dialog is not open"
						});
					},
					iCheckPOApproval: function() {
						return this.waitFor({
							id: "header",
							viewName: "S3_PurchaseOrderDetails",
							check: function(oPH) {
								// afte an PO approval, the PO header should another one 
								if (oPH.getTitle() !== this.getContext().oPOName_sel) {
									return true;
								}
								return false;
							},
							success: function(oPH) {
								Opa5.assert.ok(oPH.getTitle(), "The purchase order has been approved");
							}
						});
					},
					iCheckPORejection: function() {
						return this.waitFor({
							id: "header",
							viewName: "S3_PurchaseOrderDetails",
							check: function(oPH) {
								// afte an PO approval, the PO header should another one 
								if (oPH.getTitle() !== this.getContext().oPOName_sel) {
									return true;
								}
								return false;
							},
							success: function(oPH) {
								Opa5.assert.ok(oPH.getTitle(), "The purchase order has been rejected");
							}
						});
					}
				}
			}
		});
	}
);