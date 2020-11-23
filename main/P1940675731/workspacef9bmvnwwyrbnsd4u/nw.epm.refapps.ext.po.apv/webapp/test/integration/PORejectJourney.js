sap.ui.define(
	[],
	function() {
		"use strict";

		QUnit.module("Purchase Order Rejection Confirm");

		// Show the master view with a purchase order list
		opaTest("Show the purchase order list", function(Given, When, Then) {
			// Assertions
			Given.iStartTheApp();
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

		// Reject the purchase order
		opaTest("Reject the purchase order", function(Given, When, Then) {
			// Actions
			When.onS2.iCountPO();
			When.onS3.iRejectPO();
			// Assertions
			Then.onS3.iSeeApprovalDialog();
		});

		// Write a rejection note and confirm the PO rejection
		opaTest("Write a rejection note and confirm the PO rejection", function(Given, When, Then) {
			// Actions
			When.onS3.iWriteApprovalRejectionNote();
			// Assertions
			Then.onS3.iCheckPORejection();
			Then.onS3.iCheckAfterApprovalValidations();
			Then.onS2.iCheckIfPORemoved();
			Then.onS3.iCheckIfDifferentPOSelected();
		});

		opaTest("Reject the purchase order - Open the dialog", function(Given, When, Then) {
			// Actions
			When.onS2.iChooseSecondPO();
			When.onS3.iRejectPO();
			// Assertions
			Then.onS3.iSeeApprovalDialog();
		});

		opaTest("I click Cancel button from dialog", function(Given, When, Then) {
			// Actions
			When.onS3.iClickCancelFromDialog();
			// Assertions
			Then.onS3.iSeeItemSelected();

		});

		QUnit.module("Multi Select combo box Validations");

		// Show the master view with a purchase order list
		opaTest("I see Check box after clicking MultiSelect Icon", function(Given, When, Then) {
			// Arrangements
			When.onS2.iClickMultiSelectIcon();
			// Assertions
			Then.onS2.iSeePOMasterView();
			Then.onS3.iSeePOSummaryTable();
			Then.onS2.iCheckIfMultiSelectIsOn();
		});
		// I Choose PO from Master list (Multi-Select Mode)
		opaTest("Choose the first PO and show the PO detail - MultiSelect Mode", function(Given, When, Then) {
			// Actions
			When.onS2.iChooseFirstPOMulti();
			// Assertions
			Then.onS3.iCheckIfItemDisplayedInPOTable();
			Then.onS3.iSeeTotalOnDetailsPage();
			Then.onS3.iSeeBalanceOnDetailsPage();
		});
		// I Choose Second PO from Master list (Multi-Select Mode)
		opaTest("Select several entries - MultiSelect Mode", function(Given, When, Then) {
			// Actions
			When.onS2.iChooseSecondPOMulti();
			// Assertions
			//Need to do verificaiton in this function-
			Then.onS3.iCheckIfTotalUpdated();
			Then.onS3.iCheckIfBalanceUpdated();
		});
		//Approve (reject) mutlipe entries
		opaTest("Reject mutlipe entries - MultiSelect Mode", function(Given, When, Then) {
			// Actions
			When.onS3.iClickRejectAll();
			Then.onS3.iSeeApprovalDialogMulti();
		});

		opaTest("Reject mutlipe entries checks - MultiSelect Mode", function(Given, When, Then) {
			When.onS3.iWriteApprovalRejectionNoteMulti();
			When.onS2.iCountPO();
			// Assertions
			//check if PO removed from master list
			Then.onS2.iCheckIfListReduced();
			//Check if no PO is displayed on details page		
			Then.onS3.iCheckIfDetailsSectionIsEmpty();
			//Check if multi select is still available
			Then.onS2.iCheckIfMultiSelectIsOn();
			Then.onS3.iSeeBalanceOnDetailsPage();
		});
		// I Choose PO from Master list (Multi-Select Mode)
		opaTest("Choose the first PO and show the PO detail - MultiSelect Mode", function(Given, When, Then) {
			// Actions
			When.onS2.iChooseFirstPOMulti();
			// Assertions
			Then.onS3.iCheckIfItemDisplayedInPOTable();
			Then.onS3.iCheckIfBalanceUpdated();
		});
		opaTest("Search a PO - MultiSelect Mode", function(Given, When, Then) {
			// Actions
			When.onS2.iGetSixthPOName();
			When.onS2.iSearchSixthPO();
			// Assertions
			Then.onS2.iSeePOMasterView();
			Then.onS2.iCheckIfListReduced();
		});
		opaTest("Choose the second PO and show the PO detail - MultiSelect Mode", function(Given, When, Then) {
			// Actions
			When.onS2.iCountPO();
			When.onS2.iChooseFirstPOMulti();
			// Assertions
			//In this case, we need to validate the second item because there is already one selected in the list
			Then.onS3.iCheckIfSecondItemDisplayedInPOTable();
		});
		opaTest("Remove PO(the searched string) - MultiSelect Mode", function(Given, When, Then) {
			// Actions
			When.onS2.iRemoveSearchedPO();
			// Assertions
			Then.onS2.iSeePOMasterView();
			// The masterlist shows again all entries
			Then.onS2.iCheckIfListShowsCompletePOMulti();
			// One way to check if items remain selected
			Then.onS3.iCheckIfSecondItemDisplayedInPOTable();
		});
		opaTest("I do not see Check box after clicking MultiSelect Icon", function(Given, When, Then) {
			// Arrangements
			When.onS2.iClickMultiSelectIcon();
			// Assertions
			Then.onS2.iSeePOMasterView();
			Then.onS3.iSeePOSummaryTable();
			Then.onS2.iCheckIfMultiSelectIsOff();
		});
		opaTest("I see Check box after clicking MultiSelect Icon", function(Given, When, Then) {
			// Arrangements
			When.onS2.iClickMultiSelectIcon();
			// Assertions
			Then.onS2.iSeePOMasterView();
			Then.onS3.iSeePOSummaryTable();
			Then.onS2.iCheckIfMultiSelectIsOn().
			and.iTeardownMyAppFrame();
		});
	}
);