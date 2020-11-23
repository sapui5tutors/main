sap.ui.define(
	[],
	function() {
		"use strict";

		QUnit.module("Purchase Order Approval Confirm");

		// Show the master view with a purchase order list
		opaTest("Show the purchase order list", function(Given, When, Then) {
			// Arrangements
			Given.iStartTheApp();
			// Assertions
			Then.onS2.iSeePOMasterView();
			Then.onS3.iSeeDefaultPODetail();
		});

		// Choose the second PO and show the PO detail view
		opaTest("Choose the second PO and show the PO detail", function(Given, When, Then) {
			// Actions
			When.onS2.iChooseSecondPO();
			// Assertions
			Then.onS3.iCheckPODetail();
		});

		// Approve the purchase order
		opaTest("Approve the purchase order", function(Given, When, Then) {
			// Actions
			When.onS2.iCountPO();
			When.onS3.iApprovePO();
			// Assertions
			Then.onS3.iSeeApprovalDialog();
		});

		// Write an approval note and confirm the PO
		opaTest("Write an approval note and confirm the PO/After Approval Validations", function(Given, When, Then) {
			// Actions
			When.onS3.iWriteApprovalConfirmationNote();
			// Assertions
			Then.onS3.iCheckPOApproval();
			Then.onS3.iCheckAfterApprovalValidations();
			Then.onS2.iCheckIfPORemoved();
			Then.onS3.iCheckIfDifferentPOSelected();
		});

		opaTest("Search a PO", function(Given, When, Then) {
			// Actions
			When.onS2.iGetFirstPOName();
			When.onS2.iGetSixthPOName();
			When.onS2.iSearchFirstPO();
			// Assertions
			Then.onS2.iSeePOMasterView();
			Then.onS2.iCheckIfListReduced();
		});

		opaTest("Remove a PO", function(Given, When, Then) {
			// Actions
			When.onS2.iRemoveSearchedPO();
			// Assertions
			Then.onS2.iSeePOMasterView();
			Then.onS2.iCheckIfListShowsCompletePO().
			and.iTeardownMyAppFrame();
		});

	}
);