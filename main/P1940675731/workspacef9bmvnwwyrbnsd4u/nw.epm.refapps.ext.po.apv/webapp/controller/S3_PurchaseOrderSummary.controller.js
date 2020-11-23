sap.ui.define([
        "sap/ui/Device",
        "sap/ui/model/json/JSONModel",
		"nw/epm/refapps/purchaseorders/approve/controller/BaseController",
		"nw/epm/refapps/purchaseorders/approve/controller/SubControllerForApproval"
	], function(Device, JSONModel, BaseController, SubControllerForApproval) {
	"use strict";

	return BaseController.extend("nw.epm.refapps.purchaseorders.approve.controller.S3_PurchaseOrderSummary", {
		// _oSubControllerForApproval is used to send the dialog for confirming the approval.
		onInit: function() {
			this._oSubControllerForApproval = new SubControllerForApproval(this.getView(), this.getResourceBundle());
			this._initializeViewModel();
			var oGlobalModel = this.getGlobalModel(),
				oSelectedBinding = oGlobalModel.bindProperty("/selectedPurchaseOrders"),
				oMultiSelectBinding = oGlobalModel.bindProperty("/isMultiSelect");
			oSelectedBinding.attachChange(this.onSelectedPOsChanged, this);
			oMultiSelectBinding.attachChange(this.onSelectedPOsChanged, this);
			this._iSimulationCount = 0;
			this.onSelectedPOsChanged();
		},

		_initializeViewModel: function() {
			this._oViewModel = new JSONModel();
			this.setModel(this._oViewModel, "viewProperties");
		},

		onSelectedPOsChanged: function() {
			var oGlobalModel = this.getGlobalModel();
			if (oGlobalModel.getProperty("/isMultiSelect")) {
				var aSelectedPOs = oGlobalModel.getProperty("/selectedPurchaseOrders"),
					sConcatenatedIds = "";
				for (var i = 0, sDelimiter = ""; i < aSelectedPOs.length; i++) {
					sConcatenatedIds = sConcatenatedIds + sDelimiter + aSelectedPOs[i].POId;
					sDelimiter = ",";
				}
				var oModel = this.getModel();
				this._iSimulationCount++;
				this._oViewModel.setProperty("/SimulateBudgetReduction", {});
				oModel.callFunction("/SimulateBudgetReduction", {
					method: "POST",
					urlParameters: {
						POIds: sConcatenatedIds
					},
					success: this.onSimulationUpdated.bind(this, this._iSimulationCount)
				});
			}
		},

		onSimulationUpdated: function(iRequestSimulationCount, oResponse) {
			if (iRequestSimulationCount !== this._iSimulationCount) {
				return;
			}
			this._oViewModel.setProperty("/SimulateBudgetReduction", oResponse.SimulateBudgetReduction);
		},

		onApprove: function() {
			this._onOpenApprovalDialog(true);
		},

		onReject: function() {
			this._onOpenApprovalDialog(false);
		},

		// Used by event handlesr for buttons 'Approve' and 'Reject'
		_onOpenApprovalDialog: function(bApprove) {
			var oWhenIsApproved = this._oSubControllerForApproval.openDialog(bApprove, this.getModel("globalProperties").getProperty(
				"/selectedPurchaseOrders"));
			oWhenIsApproved.then(this.onApprovalEnded.bind(this));
		},

		// This event handler is called when an approve/reject action has ended.
		// Note that this may be either because the user decided to cancel the action or because the approval was successfully executed in the backend.
		// Parameter bProcessed is used to distinguish between these two situations.
		onApprovalEnded: function(bProcessed) {
			if (bProcessed) {
				this.getGlobalModel().setProperty("/selectedPurchaseOrders", []);
				if (Device.system.phone) { // When the app is being used on a phone leave the detail screen and go back to the master list.
					this._navToMaster();
				}
			}
		},

		// Handler for the navigation button (only available when the app is being used on a phone) that is attached declaratively.
		onNavButtonPress: function() {
			this._navToMaster();
		},
		
		// Event handler is called after the items are updated in the summary table
		onTableUpdateFinished: function(oEvent) {
			/**
			 * @ControllerHook Adaptation of summary table
			 * This method is called after the data of the summary table has been updated due to selection or deselection of
			 * one of the purchase orders in the master list.
			 * @callback nw.epm.refapps.ext.po.apv.controller.S3_PurchaseOrderSummary~extHookOnTableUpdateFinished
			 * @param {sap.ui.base.Event} the 'updateFinished' event triggered by sap.m.Table control
			 * @return {void}
			 */
			if (this.extHookOnTableUpdateFinished) {
				this.extHookOnTableUpdateFinished(oEvent);
			}
		},		

		// Navigate back to master list.
		_navToMaster: function() {
			this.getApplication().navBack(false, true);
		}
	});
});