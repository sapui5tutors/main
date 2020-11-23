// In mock mode, the mock server intercepts HTTP calls and provides fake output to the
// client without involving a backend system. But special backend logic, such as that 
// performed by function imports, is not automatically known to the mock server. To handle
// such cases, the app needs to define specific mock requests that simulate the backend 
// logic using standard HTTP requests (that are again interpreted by the mock server) as 
// shown below. 

// Please note:
// The usage of synchronous calls is only allowed in this context because the requests are
// handled by a latency-free client-side mock server. In production coding, asynchronous
// calls are mandatory.

sap.ui.define(["sap/ui/base/Object"], function(Object) {
	"use strict";

	return Object.extend("nw.epm.refapps.purchaseorder.approve.localService.MockRequests", {

		constructor: function(oMockServer) {
			this._srvUrl = "/sap/opu/odata/sap/SEPMRA_PO_APV/"; //service url
			this._bError = false; //true if a this._sjax request failed
			this._sErrorTxt = ""; //error text for the oXhr error respons
			this._oMockServer = oMockServer;
		},
		getRequests: function() {
			// given the Overall Budget is the sum of all POs' gross amounts, for simplicity, ignores the currency types
			var aPOs = this._oMockServer.getEntitySetData("PurchaseOrders");
			this.iOverallBudget = 0;
			// add up the selected POs values
			for (var i = 0; i < aPOs.length; i++) {
				this.iOverallBudget = this.iOverallBudget + parseFloat(aPOs[i].GrossAmount);
			}

			return [
				this.mockApprovePo(),
				this.mockRejectPo(),
				this.mockSimulateBudgetReduction()
			];
		},

		mockSimulateBudgetReduction: function() {
			return {
				// This mock request simulates the function import "SimulateBudgetReduction",
				// which is triggered when the user switches the master list to multi select mode.
				// It calculated teh total value of the selected POs' values  and retunrs an object with the 
				// correspondung budget information
				method: "POST",
				path: new RegExp("SimulateBudgetReduction\\?POIds=(.*)"),
				response: this.simulateBudgetReduction.bind(this)
			};

		},

		mockApprovePo: function() {
			return {
				// This mock request simulates the function import "ApprovePurchaseOrder",
				// which is triggered when the user chooses the "Approve" button.
				// It removes the approved purchase order from the mock data.
				method: "POST",
				path: new RegExp("ApprovePurchaseOrder\\?POId='(.*)'&Note='(.*)'"),
				response: this.deletePo.bind(this)
			};

		},
		mockRejectPo: function() {
			return {
				// This mock request simulates the function import "RejectPurchaseOrder",
				// which is triggered when the user chooses the "Reject" button.
				// It removes the rejected purchase order from the mock data.
				method: "POST",
				path: new RegExp("RejectPurchaseOrder\\?POId='(.*)'&Note='(.*)'"),
				response: this.deletePo.bind(this)
			};
		},

		deletePo: function(oXhr, sPOId) {
			var aPurchaseOrders = this._oMockServer.getEntitySetData("PurchaseOrders"),
				aPurchaseOrderItems = this._oMockServer.getEntitySetData("PurchaseOrderItems"),
				filterPurchaseOrder = function(oPurchaseOrderOrPOItem) {
					//if the PurchaseOrder is approved/rejected, the overall budget needs to be adapted
					if (oPurchaseOrderOrPOItem.POId === sPOId && !oPurchaseOrderOrPOItem.POItemPos) {
						this.iOverallBudget = this.iOverallBudget - parseFloat(oPurchaseOrderOrPOItem.GrossAmount);
					}
					return oPurchaseOrderOrPOItem.POId !== sPOId;
				};

			//removes the approved/rejected PurchaseOrders and PurchaseOrderItems from the entity set data
			aPurchaseOrders = aPurchaseOrders.filter(filterPurchaseOrder.bind(this));
			this._oMockServer.setEntitySetData("PurchaseOrders", aPurchaseOrders);
			aPurchaseOrderItems = aPurchaseOrderItems.filter(filterPurchaseOrder.bind(this));
			this._oMockServer.setEntitySetData("PurchaseOrderItems", aPurchaseOrderItems);

			oXhr.respondJSON(200, {}, JSON.stringify({
				d: {
					results: []
				}
			}));
		},

		simulateBudgetReduction: function(oXhr, sUrlParams) {
			//intialize budget data
			var oBudgetIno = {
					OverallBudget: this.iOverallBudget,
					RemainingBudget: this.iOverallBudget,
					TotalApprovedAmount: 0,
					Currency: "USD"
				},
				fSelectedPoAmount = 0;
			//get po ids from url pareamter
			var sPoIds = decodeURIComponent(sUrlParams);

			//check if there is already a PO selected 
			if (sPoIds.length > 2) {
				var aPOs = this._oMockServer.getEntitySetData("PurchaseOrders");
				// add up the selected POs values
				for (var i = 0; i < aPOs.length; i++) {
					if (sPoIds.indexOf(aPOs[i].POId) > -1) {
						//usually the po values would now be converted to itello's local currency but the mock data
						//should already be set up corerctly so no conversin is needed
						fSelectedPoAmount += parseFloat(aPOs[i].GrossAmount);
					}
				}
				// update the mock Budget information with the total values of the selected POs
				oBudgetIno.TotalApprovedAmount = fSelectedPoAmount;
				oBudgetIno.OverallBudget = this.iOverallBudget;
				oBudgetIno.RemainingBudget = oBudgetIno.OverallBudget - oBudgetIno.TotalApprovedAmount;
			}

			// send mock response
			oXhr.respondJSON(200, {}, JSON.stringify({
				d: {
					SimulateBudgetReduction: {
						__metadata: {
							type: "SEPMRA_PO_APV.BudgetReductionResult"
						},
						OverallBudget: oBudgetIno.OverallBudget,
						RemainingBudget: oBudgetIno.RemainingBudget,
						TotalApprovedAmount: oBudgetIno.TotalApprovedAmount,
						Currency: oBudgetIno.Currency
					}
				}
			}));
		}
	});
});