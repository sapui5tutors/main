sap.ui.define(["sap/ui/base/Object"], function(Object) {
	"use strict";

	return Object.extend("nw.epm.refapps.purchaseorders.approve.controller.ListSelector", {
		// Properties of this class:
		// _oList: the instance of sap.m.List handled by this instance
		// _fnListUpdated: when we are waiting for the list to be updated (that is, if either the list was not updated yet or an update process is running)
		// this is a function that should be called as soon as the update process has finished. _oList is passed to this function as parameter.
		// Otherwise this attribute is null.
		// _oWhenListLoadingIsDone: a Promise that is fulfilled when the last list update we currently know about is finished.
 
		/**
		 * Helper class for the controller of the application, exposing methods to interact with the master list.
		 * Note that this class is a singleton that is created by the application and can be accessed as property oListSelector.
		 *
		 * @class
		 * @public
		 */
		constructor: function() {
			this._oWhenListLoadingIsDone = new Promise(function(fnResolve) {
				this._fnListUpdated = fnResolve;
			}.bind(this));
		},

		/**
		 * A bound list should be passed here. Should be done before the list has received its initial data from the server.
		 * May only be invoked once per ListSelector instance.
		 *
		 * @param {sap.m.List} oList The list that all the select functions are invoked on.
		 * @public
		 */
		setBoundMasterList: function(oList) {
			this._oList = oList;
			// In order to fulfill the contract of _whenListIsLoaded, we ensure that a Promise is created each time the system starts to update the list. This
			// Promise is resolved when the update finishes.
			// Note however that there is a gap because method _whenListIsLoaded might have been called before this initialization step was performed.
			// In order to fill this gap, a Promise has already been created in the constructor. Hence, when starting the first list update, we should not
			// create a new Promise but just stay with the one created in the constructor.
			oList.attachUpdateStarted(function() {
				if (!this._fnListUpdated) { // check whether we really need to create a new Promise
					this._oWhenListLoadingIsDone = new Promise(function(fnResolve) {
						this._fnListUpdated = fnResolve;
					}.bind(this));
				}
			}, this);
			oList.attachUpdateFinished(function() {
				this._fnListUpdated(oList);
				this._fnListUpdated = null;
			}, this);
		},

		// The function fnFulfilled is called when the last list update we know about has ended.
		// More precisely this means: When we are waiting for a list update (be it because the list has not been updated yet at all, be it because an update is currently running)
		// fnFulfilled is called when this update is done. Otherwise fnFulfilled is called immediately.
		// In any case this._oList will be passed to fnFulfilled as parameter.
		_whenListIsLoaded: function(fnFulfilled) {
			this._oWhenListLoadingIsDone.then(fnFulfilled);
		},

		/**
		 * Tries to select an item in the this._oList with a matching binding context.
		 * Note that this method does nothing if the list is not in single select mode (which is the case in multi-select mode and on phones).
		 * If there are no items matching the binding context, all selections are removed from the list.
		 * If the method is called before the list has been updated or while the list is in the process of updating, the selection
		 * is postponed until the list has been updated. Otherwise, it immediately searches for the specified item.
		 * @param {string} sBindingPath the binding path matching the binding path of a list item
		 * @public
		 */
		selectAListItem: function(sBindingPath) {

			this._whenListIsLoaded(function(oList) {
				var oSelectedItem;

				if (oList.getMode() !== "SingleSelectMaster") {
					return;
				}

				oSelectedItem = oList.getSelectedItem();

				// Skip update if the current selection already matches the object path
				if (oSelectedItem && oSelectedItem.getBindingContext().getPath() === sBindingPath) {
					return;
				}

				var bFound = sBindingPath && oList.getItems().some(function(oItem) {
					if (oItem.getBindingContext().getPath() === sBindingPath) {
						oList.setSelectedItem(oItem);
						return true;
					}
				});
				if (!bFound) {
					oList.removeSelections(true);
				}
			});
		},

		/**
		 * Trigger a refresh of the master list without changing the scroll position
		 */
		refreshList: function() {
			this._oList.attachEventOnce("updateFinished", this._oList.focus, this._oList);
			this._oList.getBinding("items").refresh();
		},

		// Prepare for the removal of some items from the list (due to approvals/rejections).
		// This is done by setting the IDs currently in the list to preferredIds. Thereby we
		// start with the item currently displayed. Then the IDs following this element are added
		// in their current order. Finally, we add those items listed in front of the current item in reverse
		// order.
		prepareResetOfList: function(oGlobalModel) {
			var aListItems = this._oList.getItems(),
				bFound = false,
				aTail = [],
				aPreferredIds = [],
				sCurrentPOId = oGlobalModel.getProperty("/currentPOId");
			for (var i = 0; i < aListItems.length; i++) {
				var oItem = aListItems[i],
					oCtx = oItem.getBindingContext(),
					sPOId = oCtx.getProperty("POId");
				bFound = bFound || sPOId === sCurrentPOId;
				(bFound ? aPreferredIds : aTail).push(sPOId);
			}
			aTail.reverse();
			aPreferredIds = aPreferredIds.concat(aTail);
			oGlobalModel.setProperty("/preferredIds", aPreferredIds);
			oGlobalModel.setProperty("/currentPOId", null); // Reset the current ID (we only have preferences now)
		}
	});
});