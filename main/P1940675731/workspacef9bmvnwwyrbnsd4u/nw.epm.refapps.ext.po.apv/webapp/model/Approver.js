sap.ui.define(["sap/ui/base/Object",
        "sap/ui/Device"
    ], function(Object, Device) {
	"use strict";

	return Object.extend("nw.epm.refapps.purchaseorders.approve.model.Approver", {
		// This class provides the service of sending approve/reject requests to the backend. Moreover, it deals with concurrency handling and success dialogs.
		// For this purpose, a singleton instance is created and attached to the application controller as public property oApprover.
		// This is used by the instances of SubControllerForApproval and by the S2-controller (for swipe approve).
		// Note that approvals that are caused by SubControllerForApproval make the app busy while approvals done by swiping do not.
		// This class has the following properties:
		// - _oListSelector: helper class to interact with the master list (fixed)
		// - iOpenCallsCount: number of running approve/reject calls. This attribute is needed because swipe approvals may cause parallel calls.
		// - _mRunningSwipes: maps the IDs of those POs for which a swipe approve is still in process onto true
		// - _bOneWaitingSuccess: true, if at least one approve/reject operation was successfully performed since the last refresh of the master list 
		constructor: function(oApplication) {
			this._oListSelector = oApplication.oListSelector;
			this._iOpenCallsCount = 0;
			this._mRunningSwipes = {};
			this._bOneWaitingSuccess = false;
		},

		// Triggers an approve/reject (depending on parameter bApprove) operation. Parameter aPOIds contains the list of
		// PO IDs to be processed. Parameter bFromSwipe contains the information about whether the process was started via swipe (which
		// means that the App should not be blocked).
		// Parameter oView serves a parent view for possible dialogs.
		// Parameter sApprovalNote contains a note that might have been attached to this process by the user.
		// The method returns a Promise that is resolved when the approval was sucessfully processed by the backend and rejected if
		// the request is unsuccessful in the backend.
		approve: function(bApprove, bFromSwipe, oView, aPOIds, sApprovalNote) {
			return new Promise(function(fnResolve, fnReject) {
				var sFunction = bApprove ? "/ApprovePurchaseOrder" : "/RejectPurchaseOrder",
					oModel = oView.getModel(),
					oGlobalModel = oView.getModel("globalProperties"),
					bIsMultiSelect = oGlobalModel.getProperty("/isMultiSelect");

				if (bFromSwipe) {
					this._mRunningSwipes[aPOIds[0]] = true; // Note: Swipe approval is always single approval
					oGlobalModel.setProperty("/isSwipeRunning", true);
				} else {
					oGlobalModel.setProperty("/isBusyApproving", true);
				}
				// When the PO ID that is currently displayed in the detail view is going to be approved/rejected, we need to be prepared
				// to select a new PO ID to display. However, this is not necessary on a phone because we will navigate to the master
				// list anyway. In multi-select mode, the summary page is displayed in the detail area.
				if (!bIsMultiSelect && !Device.system.phone) {
					var sCurrentPOId = oGlobalModel.getProperty("/currentPOId"),
						bIsCurrentApproved = (sCurrentPOId === aPOIds[0]); // Since we are not in multi-select case, aPOIds contains only one element
					if (bIsCurrentApproved) {
						this._oListSelector.prepareResetOfList(oGlobalModel);
					}
				}
				this._iOpenCallsCount++;
				var fnOnError = function() {
					this._callEnded(false, oGlobalModel);
					fnReject();
				}.bind(this);
				var fnOnSuccess = function() {
					this._callEnded(true, oGlobalModel);
					// A success message is only sent when the last request has returned. Thus, when the user sents several requests via swipe, only one
					// message toast is sent; this represents the request that came back as last.
					if (this._iOpenCallsCount === 0) {
						var oResourceBundle = oView.getModel("i18n").getResourceBundle(),
							sSuccessMessage = "";
						if (aPOIds.length === 1) {
							var sSupplier = oModel.getProperty("/PurchaseOrders('" + aPOIds[0] + "')").SupplierName;
							sSuccessMessage = oResourceBundle.getText(bApprove ? "ymsg.approvalMessageToast" : "ymsg.rejectionMessageToast", [sSupplier]);
						} else {
							sSuccessMessage = oResourceBundle.getText(bApprove ? "ymsg.massApprovalMessageToast" : "ymsg.massRejectionMessageToast");
						}
						sap.ui.require(["sap/m/MessageToast"], function(MessageToast) {
							MessageToast.show(sSuccessMessage);
						});
					}
					fnResolve();
				}.bind(this);
				if (aPOIds.length === 1) {
					oModel.callFunction(sFunction, {
						method: "POST",
						urlParameters: {
							POId: aPOIds[0],
							Note: sApprovalNote
						},
						success: fnOnSuccess,
						error: fnOnError
					});
				} else {
					for (var i = 0; i < aPOIds.length; i++) {
						oModel.callFunction(sFunction, {
							method: "POST",
							urlParameters: {
								POId: aPOIds[i],
								Note: sApprovalNote
							},
							batchGroupId: "POMassApproval",
							changeSetId: i
						});
					}
					oModel.submitChanges({
						batchGroupId: "POMassApproval",
						success: fnOnSuccess,
						error: fnOnError
					});
				}
			}.bind(this));
		},

		// Returns whether a swipe approval has been started for the specified PO since the last refresh
		isSwipeApproving: function(sPOId) {
			return !!this._mRunningSwipes[sPOId]; // Note: !! ensures that either true or false is returned (otherwise it would be true or undefined) 
		},

		// This method is called when a backend call for approve/reject has finished.
		// bSuccess states whether the call was successful
		// oGlobalModel is the global JSON model of the app
		_callEnded: function(bSuccess, oGlobalModel) {
			// Book-keeping:
			this._iOpenCallsCount--;
			this._bOneWaitingSuccess = bSuccess || this._bOneWaitingSuccess;
			if (this._iOpenCallsCount === 0) { // When we are not waiting for another call
				this._mRunningSwipes = {}; // start with a new round
				oGlobalModel.setProperty("/isSwipeRunning", false);
				if (this._bOneWaitingSuccess) { // At least one PO was approved/rejected successfully, therefore the list should be refreshed
					this._bOneWaitingSuccess = false;
					this._oListSelector.refreshList(); // Note that the busy approving state is reset when the refresh is finished
				} else {
					oGlobalModel.setProperty("/isBusyApproving", false); // As no refresh is triggered in this case, we reset the busy status immediately.
				}
			}
		}
	});
});