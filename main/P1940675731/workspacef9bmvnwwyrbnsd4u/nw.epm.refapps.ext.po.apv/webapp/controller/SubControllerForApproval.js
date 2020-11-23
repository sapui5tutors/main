sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/json/JSONModel",
    "nw/epm/refapps/purchaseorders/approve/model/utilities"
    ], function(Object, JSONModel, utilities) {
	"use strict";
	// This class is a helper class that is instantiated by each S3 controller. It is used to handle the approval/rejection dialog.
	return Object.extend("nw.epm.refapps.purchaseorders.approve.controller.SubControllerForApproval", {
		// The following properties of this class are initialized in onInit or at first use and not changed afterwards
		// _oApprovalDialog: the dialog used for approval
		// _oParentView: the view hosting the dialog. Note that the controller of this view must inherit from BaseController.
		// _oResourceBundle: i18n texts
		// _oApprovalProperties: JSON modell used for declarative binding on the dialog

		// The following properties are used to keep state while the dialog is open
		// _aPurchaseOrders: purchase Orders to be processed
		// _bApprove: indicates whether the POs to be processed are to be approved or rejected
		// _fnApproveActionFinished, _fnApproveFailed: functions to resolve/reject the process

		constructor: function(oParentView, oResourceBundle) {
			this._oParentView = oParentView;
			this._oResourceBundle = oResourceBundle;
			this._oGlobalModel = this._oParentView.getController().getGlobalModel();
		},

		// This method is called when the user approves or rejects one or more purchase orders using one of the S3 views.
		// Parameter oEvent is used to determine whether user chose operation 'Approve' or 'Reject'.
		// aPurchaseOrders is an array containing the purchase orders to be approved.
		// The method returns a Promise with the following contract:
		// - If an approval process is still running, the Promise is resolved with parameter value false
		// - If no approval process is running, a confirmation popup is displayed to the user. If the user cancels the operation
		//   the Promise is resolved with parameter value false.
		// - If the user confirms the action the Promise is resolved with parameter value true as soon as the approvals have been successfully
		//   processed in the backend. If processing the approvals in the backend is unsuccessful, the Promise fails (note that displaying the error to
		//   the user is done by the generic errorHandling-class anyway).
		openDialog: function(bApprove, aPurchaseOrders) {
			var fnPromiseFunction = function(fnResolve, fnFailed) {
				if (this._oGlobalModel.getProperty("/isBusyApproving")) {
					fnResolve(false);
					return;
				}
				this._fnApproveActionFinished = fnResolve;
				this._fnApproveFailed = fnFailed;
				if (!this._oApprovalDialog) {
					this._initializeApprovalDialog();
				}
				this._bApprove = bApprove;
				this._aPurchaseOrders = aPurchaseOrders;
				var sApprovalText, sTitle;
				if (aPurchaseOrders.length === 1) {
					sApprovalText = this._oResourceBundle.getText(this._bApprove ? "xfld.approvalTextWithSupplier" : "xfld.rejectionTextWithSupplier", [
						aPurchaseOrders[0].SupplierName]);
					sTitle = this._oResourceBundle.getText(this._bApprove ? "xtit.approvalTitleForDialog" : "xtit.rejectionTitleForDialog");
				} else {
					sApprovalText = this._oResourceBundle.getText(this._bApprove ? "xfld.massApprovalText" : "xfld.massRejectionText");
					sTitle = this._oResourceBundle.getText(this._bApprove ? "xtit.massApprovalTitleForDialog" : "xtit.massRejectionTitleForDialog", [
						aPurchaseOrders.length]);
				}
				this._oApprovalProperties.setProperty("/approvalText", sApprovalText);
				this._oApprovalProperties.setProperty("/approvalTitle", sTitle);
				this._oApprovalProperties.setProperty("/approvalNote", "");
				this._oApprovalDialog.open();
			}.bind(this);
			return new Promise(fnPromiseFunction);
		},

		// Initialization of the approval dialog. This method will is called only once.
		_initializeApprovalDialog: function() {
			this._oApprovalDialog = sap.ui.xmlfragment(this._oParentView.getId(),
				"nw.epm.refapps.purchaseorders.approve.view.fragment.ApprovalDialog", this);
			utilities.attachControlToView(this._oParentView, this._oApprovalDialog);
			this._oApprovalProperties = new JSONModel();
			this._oApprovalDialog.setModel(this._oApprovalProperties, "approvalProperties");
		},

		// Event handler for the confirm action of the approval dialog. Note that this event handler is attached declaratively
		// in the definition of fragment nw.epm.refapps.ext.po.apv.view.fragment.ApprovalDialog.
		onConfirmAction: function() {
			this._oApprovalDialog.close();
			var i, aPOIds = [],
				sApprovalNote = this._oApprovalProperties.getProperty("/approvalNote");
			for (i = 0; i < this._aPurchaseOrders.length; i++) {
				aPOIds.push(this._aPurchaseOrders[i].POId);
			}
			var oApprover = this._oParentView.getController().getApplication().oApprover,
				oWhenAppovalIsDone = oApprover.approve(this._bApprove, false, this._oParentView, aPOIds, sApprovalNote);
			oWhenAppovalIsDone.then(this._fnApproveActionFinished.bind(null, true), this._fnApproveFailed);
			this._fnApproveActionFinished = null;
			this._fnApproveFailed = null;
			this._aPurchaseOrders = null;
		},

		// Event handler for the cancel action of the approval dialog. Note that this event handler is attached declaratively
		// in the definition of fragment nw.epm.refapps.ext.po.apv.view.fragment.ApprovalDialog.
		onCancelAction: function() {
			this._fnApproveActionFinished(false);
			this._oApprovalDialog.close();
			this._fnApproveActionFinished = null;
			this._fnApproveFailed = null;
			this._aPurchaseOrders = null;
		}
	});
});