sap.ui.define([
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"nw/epm/refapps/purchaseorders/approve/controller/BaseController",
	"nw/epm/refapps/purchaseorders/approve/controller/SubControllerForApproval",
	"nw/epm/refapps/purchaseorders/approve/model/utilities"
], function(Device, JSONModel, BaseController, SubControllerForApproval, utilities) {
	"use strict";

	// The detail screen displaying a purchase order
	return BaseController.extend("nw.epm.refapps.purchaseorders.approve.controller.S3_PurchaseOrderDetails", {
		// attributes set during initialization:
		// _oApplication: controller of the app
		// _oItemsTable: control displaying the PO items
		// _oItemTemplate: template for the column structure of the table
		// _oViewModel: JSON model containing properties used in declarative binding
		// _oSubControllerForApproval: Helper class dealing with approval
		// attribute set dynamically:
		// _sContextPath: the context path for the PO currently displayed

		/* =========================================================== */
		/* Initialization                                              */
		/* =========================================================== */

		onInit: function() {
			this._oApplication = this.getApplication();
			this._oApplication.registerDetailController(this);
			this._oItemsTable = this.byId("itemsTable");
			this._oItemTemplate = this.byId("columnListItem").clone();
			this._initializeViewModel();
			this._oSubControllerForApproval = new SubControllerForApproval(this.getView(), this.getResourceBundle());
		},

		_initializeViewModel: function() {
			this._oViewModel = new JSONModel({
				dataLoaded: false, // Contains the information whether the data for the header area have been loaded
				originalBusyDelayAttributesLayout: this.byId("attributesLayout").getBusyIndicatorDelay(),
				originalBusyDelayItemsTable: this._oItemsTable.getBusyIndicatorDelay(),
				itemCount: -1 // Negative item count is used to suppress the display of the number of items
			});
			this.setModel(this._oViewModel, "viewProperties");
		},

		/* =========================================================== */
		/* Navigation                                                  */
		/* =========================================================== */

		// This method is called by the controller of the app when the user navigates to or away from this page.
		// In the first case, parameter sContextPath contains the context path for the PO to be displayed. In the second case,
		// sContextPath is faulty.
		setContextPath: function(sContextPath) {
			if (this._sContextPath === sContextPath) {
				return;
			}
			this._sContextPath = sContextPath;
			this._oViewModel.setProperty("/itemCount", -1); // remove number of PO items from display until the number has been evaluated again
			if (sContextPath) {
				this._bindView(sContextPath);
			} else {
				this.getView().unbindElement();
				this._oItemsTable.unbindItems();
			}
		},

		// Bind the header and the items to the context path
		_bindView: function(sPOPath) {
			this._oViewModel.setProperty("/dataLoaded", false);
			var oView = this.getView();
			var fnOnElementBindingCompleted = function(oEvent) {
				var oPurchaseOrder = this.getModel().getObject(oEvent.getSource().getPath());
				if (oEvent.getSource().getBoundContext()) {
					var oGlobalModel = this.getGlobalModel();
					oGlobalModel.setProperty("/detailImmediateBusy", false); // this property is only true for one turnaround
					this._oViewModel.setProperty("/dataLoaded", true);
					if (this._oViewModel.getProperty("/itemCount") >= 0) { // When items and header have been read, reset the
						oGlobalModel.setProperty("/isBusyApproving", false); // busy status that was potentially set by an approval step
					}
				} else {
					this._oApplication.showEmptyView("objectNotFound");
				}
				/**
				 * @ControllerHook Adaptation of purchase order details view
				 * This method is called after the data of the requested purchase order has been loaded to be shown on the detail view
				 * @callback nw.epm.refapps.ext.po.apv.controller.S3_PurchaseOrderDetails~extHookOnDataReceived
				 * @param {object} requested purchase order
				 * @return {void}
				 */
				if (this.extHookOnDataReceived) {
					this.extHookOnDataReceived(oPurchaseOrder);
				}
			}.bind(this);
			oView.bindElement({
				path: sPOPath,
				events: {
					change: fnOnElementBindingCompleted
				},
				parameters: {
					select: "POId,OrderedByName,SupplierName,GrossAmount,CurrencyCode,ChangedAt,DeliveryDateEarliest,LaterDelivDateExist,DeliveryAddress,ItemCount",
					groupId: "Header" // Retrieve header and item information with parallel calls because the header information might be faster
				}
			});
			// Note that items are NOT bound relative to the header, otherwise the retrieval of the items would be deferred
			// until the header data has been read.
			this._oItemsTable.bindItems({
				path: sPOPath + "/PurchaseOrderItems",
				parameters: {
					select: "POId,POItemPos,Product,Price,PriceCurrency,GrossAmount,GrossAmountCurrency,Quantity,DeliveryDate",
					groupId: "Header"
				},
				template: this._oItemTemplate
			});
		},

		// Event handler for the table of PO items that is attached declaratively
		onItemsTableUpdateFinished: function(oEvent) {
			this._oViewModel.setProperty("/itemCount", oEvent.getParameter("total"));
			if (this._oViewModel.getProperty("/dataLoaded")) { // If header data are already loaded, reset the busy status
				this.getGlobalModel().setProperty("/isBusyApproving", false);
			}
		},

		onNavButtonPress: function() {
			this._oApplication.navBack(true, true);
			this.setContextPath(); // detach from backend
		},

		/* =========================================================== */
		/* Button handlers attached declaratively                      */
		/* =========================================================== */

		onApprove: function() {
			this._onOpenApprovalDialog(true);
		},

		onReject: function() {
			this._onOpenApprovalDialog(false);
		},

		// Used by event handlesr for buttons 'Approve' and 'Reject'
		_onOpenApprovalDialog: function(bApprove) {
			if (this._oApplication.oApprover.isSwipeApproving(this.getGlobalModel().getProperty("/currentPOId"))) {
				return; // If the current PO is being approved using swipe anyway, ignore this redundant operation
			}
			// Open approval dialog. oWhenApprove is a Promise for the end of the whole process.
			var oWhenApproved = this._oSubControllerForApproval.openDialog(bApprove, [this.getModel().getProperty(this._sContextPath)]);
			if (Device.system.phone) { // On a phone, when the approval is really completed: go to master list
				oWhenApproved.then(function(bProcessed) { // bProcessed indicates whether the approval was really completed
					if (bProcessed) {
						this._oApplication.navBack(false, true); // go to master list 
						this.setContextPath(); // detach from backend
					}
				}.bind(this));
			}
		},

		onEmailPressed: function() {
			var oBindingContext = this.getView().getBindingContext(),
				oPurchaseOrder = oBindingContext.getObject(),
				oResourceBundle = this.getResourceBundle(),
				sSubject = oResourceBundle.getText("xtit.emailSubject", [oPurchaseOrder.POId]),
				sContent = oResourceBundle.getText("xtit.emailContent", [oPurchaseOrder.POId, oPurchaseOrder.SupplierName]);
			sap.m.URLHelper.triggerEmail(null, sSubject, sContent);
		}
	});
});