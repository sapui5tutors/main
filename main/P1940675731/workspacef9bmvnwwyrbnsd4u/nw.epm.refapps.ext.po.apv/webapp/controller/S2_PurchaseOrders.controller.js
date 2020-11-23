sap.ui.define([
        "sap/ui/Device",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/FilterType",
		"nw/epm/refapps/purchaseorders/approve/controller/BaseController"
	], function(Device, JSONModel, Filter, FilterOperator, FilterType, BaseController) {
	"use strict";

	function fnGetIdForItem(oListItem) {
		return oListItem.getBindingContext().getProperty("POId");
	}

	return BaseController.extend("nw.epm.refapps.purchaseorders.approve.controller.S2_PurchaseOrders", {
		// Attributes of this controller:
		// _oApplication: controller of the app
		// _oList: the master list
		// _oPullToRefresh: the pull-to-refresh control of the master list
		// _oListFilterState: keeps the current search criterium
		// _oViewModel: a json model attached to this view (with name 'viewProperties') holding control state
		//              containing the following attributes:
		//              - itemCount: the number of items in the master list (or -1 if the number has not yet been determined)
		//              - originalBusyDelayList: default busy delay of the master list

		/* =========================================================== */
		/* Initialization                                              */
		/* =========================================================== */

		/**
		 * Called when the master list controller is instantiated.
		 * @public
		 */
		onInit: function() {
			this._oApplication = this.getApplication();
			this._oList = this.byId("list");
			this._oPullToRefresh = this.byId("pullToRefresh");
			this._oListFilterState = {
				aSearch: []
			};
			this._iRunningListUpdates = 0;
			this._initializeViewModel();
			this._oApplication.oListSelector.setBoundMasterList(this._oList); // Register with the central instance
			var sInitialProductId = this._getInitialFilterFromStartupParameters();
			if (sInitialProductId) {
				this.byId("searchField").setValue(sInitialProductId);
				// Update binding according to the predefined filter. Note that this must not happen here directly, since the list
				// binding has not been initialized at this point in time.
				// When performing the update in the onMetadataLoaded-event it works, but onUpdateFinished is called twice resulting in
				// an unwanted flickering of the UI. Therefore, routePatternMatched is exactly the correct point in time.
				this.getRouter().attachEventOnce("routePatternMatched", this._setSearch.bind(this, sInitialProductId));
			}
		},

		_initializeViewModel: function() {
			this._oViewModel = new JSONModel({
				itemCount: -1,
				originalBusyDelayList: this._oList.getBusyIndicatorDelay()
			});
			this.setModel(this._oViewModel, "viewProperties");
		},

		_getInitialFilterFromStartupParameters: function() {
			// Handle the situation that the app was accessed using cross-app navigation
			var oComponentData = this.getOwnerComponent().getComponentData();
			if (oComponentData && oComponentData.startupParameters && jQuery.isArray(oComponentData.startupParameters.Product) &&
				oComponentData.startupParameters.Product.length > 0) {
				return oComponentData.startupParameters.Product[0];
			}
			return "";
		},

		/* =========================================================== */
		/* event handlers for list update (attached declaratively)     */
		/* =========================================================== */

		onUpdateFinished: function() {
			// update the count information
			this._updateListItemCount();
			// Hide pull-to-refresh if necessary
			this._oPullToRefresh.hide();
			var oGlobalModel = this.getGlobalModel();
			// Set busy delays back to default
			oGlobalModel.setProperty("/masterImmediateBusy", false);
			if (Device.system.phone) {
				oGlobalModel.setProperty("/detailImmediateBusy", false);
			}
			// Now it may be necessary to identify one item from the list which should be displayed in the detail area.
			// The following reasons would prevent this:
			// - phone mode (no detail area visible)
			// - multi-select mode (summary page shown in the detail area)
			// - the PO to be displayed is already specified (the detail area is populated independently)
			// In these cases, we only have to reset a possible busy approving state (that actually cannot be there in the third case).
			// If none of these conditions is fulfilled, the item to be displayed has to be determined and a potential busy approving state
			// remains active until this item is loaded (or an empty page is displayed).
			if (Device.system.phone || this._isMultiSelect() || oGlobalModel.getProperty("/currentPOId")) {
				oGlobalModel.setProperty("/isBusyApproving", false);
			} else {
				this._findItemToDisplay();
			}
		},

		// Update itemCount in viewProperties model and (if necessary) the no data text
		_updateListItemCount: function() {
			var iTotalItems = this._getListBinding().getLength(); // only possible since our OData service provides correct count 

			this._oViewModel.setProperty("/itemCount", iTotalItems);
			if (iTotalItems === 0) {
				var sNoDataTextKey = this._oListFilterState.aSearch.length ? "masterListNoDataWithFilterOrSearchText" : "masterListNoDataText",
					oResourceBundle = this.getResourceBundle();
				this.getGlobalModel().setProperty("/listNoDataText", oResourceBundle.getText(sNoDataTextKey));
			}
		},

		// This method is called to determine the PO to be displayed in the detail area, if no other mechanism has already done this.
		// It checks for the preferredIds attribute in the globalProperties model. If it finds any of those IDs in the list, it
		// navigates to the first of them. Otherwise, the first list item is selected.
		// If the list does not contain any items, the EmptyPage is displayed.
		_findItemToDisplay: function() {
			var oGlobalProperties = this.getGlobalModel();
			var aPreferredIds = oGlobalProperties.getProperty("/preferredIds");
			oGlobalProperties.setProperty("/preferredIds", []);
			var oNextItem = null;
			for (var i = 0; i < aPreferredIds.length && !oNextItem; i++) {
				oNextItem = this._getItemForId(aPreferredIds[i]);
			}
			oNextItem = oNextItem || this._oList.getItems()[0];
			if (oNextItem) {
				this._showDetail(oNextItem);
			} else {
				this._oApplication.showEmptyView("noObjects");
			}
		},

		/**
		 * Event handler for the master search field.
		 * Note that this event may also be called when the loading of the metadata of the service was unsuccessful. In this case a new
		 * attempt to load the metadata of the service is triggered.
		 * @param {sap.ui.base.Event} oEvent the search event
		 * @public
		 */
		onSearch: function(oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case, a new search is not triggered, we only
				// refresh the list binding.
				this.onRefresh();
				return;
			}

			var sQuery = oEvent.getParameter("query");
			this._setSearch(sQuery);
			this._oApplication.whenMetadataIsFinished();
		},

		_setSearch: function(sQuery) {
			if (sQuery) {
				this._oListFilterState.aSearch = [new Filter({
					filters: [new Filter("SupplierName", FilterOperator.Contains, sQuery), new Filter("ProductId", FilterOperator.EQ, sQuery)],
					and: false
				})];
			} else {
				this._oListFilterState.aSearch = [];
			}
			this._getListBinding().filter(this._oListFilterState.aSearch, FilterType.Application);
		},

		/**
		 * Event handler for refresh event.
		 * Note that this event may also be called when the loading of the metadata of the service was unsuccessful. In this case a new
		 * attempt to load the metadata of the service is triggered.
		 * @public
		 */
		onRefresh: function() {
			this._oApplication.whenMetadataIsFinished(function(bSuccess) {
				if (bSuccess) {
					this._getListBinding().refresh();
				} else {
					// Hide pull-to-refresh if necessary anyway
					this._oPullToRefresh.hide();
				}
			}.bind(this));
		},

		/**
		 * Event handler for the list selection event
		 * @param {sap.ui.base.Event} oEvent the list selectionChange event
		 * @public
		 */
		onSelect: function(oEvent) {

			// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
			var oListItem = oEvent.getParameter("listItem") || oEvent.getSource();
			if (this._isMultiSelect()) {
				if (this.getGlobalModel().getProperty("/isBusyApproving")) {
					return; // suppress selecting new items while still processing the old ones to avoid confusion
				}
				this._itemCheckedChanged(oListItem);
			} else {
				this._showDetail(oListItem);
			}
		},

		// Event handler for the multi-select action
		onMultiSelectPressed: function() {
			var oGlobalProperties = this.getGlobalModel(),
				bMultiSelect = this._isMultiSelect(); // note that this property already represents the new state
			if (bMultiSelect) {
				if (!Device.system.phone) {
					// Preferably we want to return to the current PO when switching back to single-select mode.
					// However, the PO might have been removed in the meantime -> This should not lead to an empty page.
					oGlobalProperties.setProperty("/preferredIds", [oGlobalProperties.getProperty("/currentPOId")]);
					oGlobalProperties.setProperty("/currentPOId", null);
				}
				this._oList.removeSelections(true);
				if (!Device.system.phone) {
					this._showSummaryPage();
				}
			} else if (!Device.system.phone) {
				this._oList.removeSelections(true);
				this._findItemToDisplay();
			}
		},

		// Event handler for the process button of the page footer. It is attached declaratively.
		onProcessPressed: function() {
			this._showSummaryPage();
		},

		onNavButtonPress: function() {
			this._oApplication.navBack(true, false);
		},

		// --- Methods dealing with swipe

		// Event handler for swipe in the list. It is attached declaratively.
		// Its purpose is to deactivate swipe in the following scenarios:
		// - multi-select mode
		// - App is in busy approving state
		// - the item to be approved has already been swiped
		onSwipe: function(oEvent) {
			if (this._isMultiSelect() || this.getGlobalModel().getProperty("/isBusyApproving") || this._oApplication.oApprover.isSwipeApproving(
				fnGetIdForItem(oEvent.getParameter("listItem")))) {
				oEvent.preventDefault();
			}
		},

		// Event handler for the swipe action of a list item. It is attached declaratively.
		onSwipeApprove: function() {
			var aPOIds = [fnGetIdForItem(this._oList.getSwipedItem())];
			this._oApplication.oApprover.approve(true, true, this.getView(), aPOIds, "");
			this._oList.swipeOut();
		},

		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		/**
		 * Shows the selected item on the detail page
		 * On phones an additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showDetail: function(oItem) {
			var bReplace = !Device.system.phone,
				aTarget = ["object", "master"];
			oItem.setSelected(true);
			this.getRouter().getTargets().display(aTarget);
			this.getRouter().navTo("PurchaseOrderDetails", {
				POId: encodeURIComponent(fnGetIdForItem(oItem))
			}, bReplace);
		},

		_isMultiSelect: function() {
			return this.getGlobalModel().getProperty("/isMultiSelect");
		},

		// This method displays the summary screen
		// The summary screen does not need to be accessible via URL, therefore there is no route for it.
		// Therefore, we use router's low-level API for navigating to the view.
		_showSummaryPage: function() {
			var aTarget = ["master", "summary"];
			this.getRouter().getTargets().display(aTarget);
		},

		_itemCheckedChanged: function(oListItem) {
			var bIsSelected = oListItem.getSelected(),
				oGlobalProperties = this.getGlobalModel(),
				aPurchaseOrders = oGlobalProperties.getProperty("/selectedPurchaseOrders").slice(0); // create a copy
			if (bIsSelected) {
				var oPurchaseOrder = this.getModel().getObject(oListItem.getBindingContextPath());
				aPurchaseOrders.push(oPurchaseOrder);
			} else {
				var sCurrentPOId = fnGetIdForItem(oListItem);
				for (var i = 0; i < aPurchaseOrders.length; i++) {
					if (aPurchaseOrders[i].POId === sCurrentPOId) {
						aPurchaseOrders.splice(i, 1);
						break;
					}
				}
			}
			oGlobalProperties.setProperty("/selectedPurchaseOrders", aPurchaseOrders);
		},

		_getListBinding: function() {
			return this._oList.getBinding("items");
		},

		_getItemForId: function(sPOId) {
			var aItems = this._oList.getItems();
			for (var i = 0; i < aItems.length; i++) {
				if (sPOId === fnGetIdForItem(aItems[i])) {
					return aItems[i];
				}
			}
		}
	});
});