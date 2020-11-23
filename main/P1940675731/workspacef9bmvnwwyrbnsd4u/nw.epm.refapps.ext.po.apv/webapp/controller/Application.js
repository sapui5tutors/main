sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/Device",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/BindingMode",
	"sap/ui/core/routing/History",
	"./ListSelector",
	"nw/epm/refapps/purchaseorders/approve/model/Approver",
	"./errorHandling"
], function(Object, Device, ResourceModel, ODataModel, JSONModel, BindingMode, History, ListSelector, Approver, errorHandling) {
	"use strict";

	return Object.extend("nw.epm.refapps.purchaseorders.approve.controller.Application", {
		// Attributes of this class:
		// _oComponent: the component representing this app
		// _oRootView: the main view hosting the app
		// _oResourceBundle: the resource bundle for this app
		// oListSelector: object providing utilities for list handling (public)
		// oApprover: object providing utilities for approving (public)
		// _oODataModel: the ODataModel used by this app
		// _oGlobalModel: model 'globalProperties' (see below)
		// _oRouter: the router for this app
		// _oDetailController: controller of the S3_PurchaseOrderDetails view
		// _fnWhenMetadataIsFinished: When metadata loading for the OData model finishes and this parameter is truthy,
		//                            it is assumed that this parameter is a function. In this case this function is called
		//                            passing the information whether the metadata loading finished successfully as parameter.                          

		/**
		 * This class serves as controller for the whole app. It is a singleton that is instantiated and initialized by
		 * the Component.
		 * Note that during initialization a json-model is created and attached to the component (name 'globalProperties').
		 * This json-model serves as storage for the global state of the app. In detail, it possesses the following attributes:
		 * - application: this instance
		 * - listNoDataText: the no data text currently used by the master list
		 * - isMultiSelect: boolean indicating whether the app is in multi-select mode
		 * - selectedPurchaseOrders: in multi select mode, this is an array containing purchase order objects representing the selected list items
		 * - currentPOId: if this attribute is truthy it specifies the ID of the purchase order that should be displayed on the detail screen
		 * - preferredIds: This attribute is only evaluated if currentPOId is faulty and the app is not running on a phone.
		 *                 In this case, the app must determine a PO that should be displayed in the detail area.
		 *                 Therefore the PO IDs in the array preferredIds are checked one after the other.
		 *                 The first one that can be found in the master list is taken. If this procedure does not lead to a match,
		 *                 the first entry in the master list is selected. This logic is implemented in method _findItemToDisplay of the S2 controller.
		 * - isMetaDataLoading: information about whether the app is currently loading metadata of the OData service
		 * - isBusyApproving: information about whether the app is currently busy with approving POs (note that quick approvals do not put the app into the 'busy' state).
		 *                    Note that the busy indication will not be set back when the approval process itself has ended. The app
		 *                    remains busy until the follow-up actions (refreshing the list, loading a new item in the detail area) are completed.
		 * - metaDataLoaded: information about whether the metadata of the OData service have already been loaded successfully
		 * - isSwipeRunning: information about whether a swipe approval is currently being processed. In order to avoid inconsistencies, the multi-select-button
		 *                is disabled meanwhile.
		 * - originalBusyDelay: the default delay for busy indication of the root view
		 * - masterImmediateBusy/detailImmediateBusy: Normally busy indication appears with a delay. However, if the master list or
		 *                                            controls on the detail page become busy directly after the whole app has been busy, this delay
		 *                                            should be suppressed in order to avoid a flickering of busy states.
		 * - emptyPage: only relevant when EmptyPage view is displayed. In this case, it contains the data that this view displays. For more information, see
		 *              the declarative definition of this view.
		 * Moreover, a json-model is created and attached to the component (name 'device') providing access to sap.ui.Device in declarative definitions.
		 * Note that the OData model used by this app is automatically created according to the app descriptor.
		 * For this ODataModel exactly one deferred batch group (namely "POMassApproval") is set.
		 * @class
		 * @public
		 * @param {object} oComponent the component representing this app
		 */
		constructor: function(oComponent) {
			this._oComponent = oComponent;
		},

		/* =========================================================== */
		/* Lifecycle methods                                              */
		/* =========================================================== */

		/**
		 * Called by component in order to launch the app.
		 * In this method, the json models are set and the router is initialized.
		 * @public
		 */
		init: function() {
			this._oRootView = this._oComponent.getAggregation("rootControl");
			this._oResourceBundle = this._oComponent.getModel("i18n").getResourceBundle();

			// public global helpers
			this.oListSelector = new ListSelector();
			this.oApprover = new Approver(this);

			// set the app data model
			this._oODataModel = this._oComponent.getModel();
			this._oODataModel.setDeferredBatchGroups(["POMassApproval"]);
			this._registerForMetaData();

			// set the device model
			this._oComponent.setModel(new JSONModel(Device), "device");

			// set the globalProperties model
			this._oGlobalModel = new JSONModel({
				application: this,
				listNoDataText: "",
				isMultiSelect: false,
				selectedPurchaseOrders: [],
				preferredIds: [],
				isMetaDataLoading: true,
				isBusyApproving: false,
				metaDataLoaded: false,
				isSwipeRunning: false,
				originalBusyDelay: this._oRootView.getBusyIndicatorDelay(),
				masterImmediateBusy: true,
				detailImmediateBusy: true
			});
			this._oGlobalModel.setDefaultBindingMode(BindingMode.TwoWay);
			this._oComponent.setModel(this._oGlobalModel, "globalProperties");

			var oBinding = this._oGlobalModel.bindProperty("/isMultiSelect");
			oBinding.attachChange(this.onMultiSelectChanged, this);

			// delegate error handling
			errorHandling.register(this, this._oComponent);

			// initialize the router
			this._initializeRouter();
		},

		_initializeRouter: function() {
			// initialize the router
			this._oRouter = this._oComponent.getRouter();
			this._oRouter.getTargetHandler().setCloseDialogs(false);
			this._oRouter.getRoute("PurchaseOrderDetails").attachPatternMatched(this.onPOMatched, this);
			this._oRouter.attachBypassed(this.onBypassed, this);
			var oComponentData = this._oComponent.getComponentData();
			if (oComponentData && oComponentData.startupParameters && jQuery.isArray(oComponentData.startupParameters.PurchaseOrder) &&
				oComponentData.startupParameters.PurchaseOrder.length > 0) {
				var sUrl = this._oRouter.getURL("PurchaseOrderDetails", {
					POId: oComponentData.startupParameters.PurchaseOrder[0]
				});
				if (sUrl) {
					sap.ui.require(["sap/ui/core/routing/HashChanger"], function(HashChanger) {
						var oHashChanger = HashChanger.getInstance();
						oHashChanger.replaceHash(sUrl);
						this._oRouter.initialize();
					}.bind(this));
					return;
				}
			}
			// Create the views based on the URL/hash
			this._oRouter.initialize();
		},

		/**
		 * Set the detail controller and bring it to correct initial status
		 * @param {object } oDetailController the controller of view S3_PurchaseOrderDetails
		 */
		registerDetailController: function(oDetailController) {
			this._oDetailController = oDetailController;
			this._setContextForDetailController(); // adapt the detail page to the current PO id
		},

		/* =========================================================== */
		/* Route handlers (attached during initialization)             */
		/* =========================================================== */

		// called when a PurchaseOrderDetails route is matched.
		onPOMatched: function(oEvent) {
			// Determine the ID of the PO to be displayed
			var sPOId = decodeURIComponent(oEvent.getParameter("arguments").POId);

			this._oGlobalModel.setProperty("/currentPOId", sPOId);
			// inform detail view which PO is to be displayed
			this._setContextForDetailController();
			if (Device.system.phone) {
				this._oGlobalModel.setProperty("/masterImmediateBusy", false); // as we are moving away from the master list, this property can be set back to the 'normal' state
			} else {
				// Set the corresponding item selected in master list
				this._adaptListToSelection();
				this._hideMasterInPortrait();
			}
			if (this._oGlobalModel.getProperty("/isMultiSelect")) {
				this._oGlobalModel.setProperty("/preferredIds", []);
				this._oGlobalModel.setProperty("/isMultiSelect", false);
			}
		},

		// Inform the detail controller (if already registered) about the PO currently displayed
		_setContextForDetailController: function() {
			if (this._oDetailController) {
				var sContextPath = this._getCurrentContextPath();
				this._oDetailController.setContextPath(sContextPath);
			}
		},

		// Set the current item selected in the master list
		_adaptListToSelection: function() {
			var sContextPath = this._getCurrentContextPath();
			this.oListSelector.selectAListItem(sContextPath);
		},

		// called for invalid URL hashes
		onBypassed: function() {
			// Note: Currently the multi-select icon will not be adapted. Wait for semantic page to update their programming model.
			this._oGlobalModel.setProperty("/isMultiSelect", false);
			this.oListSelector.selectAListItem(); // removes selection
			this.showEmptyView("bypassed");
		},

		// Get the context path for the current POId
		_getCurrentContextPath: function() {
			var sPOId = this._oGlobalModel.getProperty("/currentPOId");
			return sPOId && this._oGlobalModel.getProperty("/metaDataLoaded") && this._oODataModel.createKey("/PurchaseOrders", {
				POId: sPOId
			});
		},

		/* =========================================================== */
		/* Master handling                                             */
		/* =========================================================== */

		// Handling of back functionality.
		// bPreferHistory: Information whether back should be realized via browser-history if browser history is available.
		//                 This should be true with the exception of those views which do not have an own url (like the summary page in our example)
		// bFromDetailScreen: Information whether back is called from master or from detail screen. This is used to decide where to go when history
		// cannot be used. When coming from a detail screen (only possible on phone) go to master, when coming from master, go back to previous app/shell.
		navBack: function(bPreferHistory, bFromDetailScreen) {
			this._oGlobalModel.setProperty("/currentPOId", null);
			if (bPreferHistory) {
				var oHistory = History.getInstance(),
					sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					history.go(-1);
					return;
				}
			}
			if (bFromDetailScreen) {
				this._oRootView.getController().backMaster();
				this._oRouter.navTo("main", {}, true);
				return;
			}
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			oCrossAppNavigator.backToPreviousApp();
		},

		_hideMasterInPortrait: function() {
			this._oRootView.getController().hideMaster();
		},

		onMultiSelectChanged: function() {
			this._oGlobalModel.setProperty("/selectedPurchaseOrders", []);
		},

		/* =========================================================== */
		/* Empty view handling                                         */
		/* =========================================================== */

		/**
		 * Show view EmptyPage in the detail area
		 * @public
		 * @param {string} sReason the reason for showing the empty view. The following reasons can be used:
		 * - bypassed: invalid url hash
		 * - noObjects: master list is empty (and attribute currentPOId in the global model is faulty)
		 * - objectNotFound: attribute currentPOId in the global model is truthy but does not specify a valid PO
		 */
		showEmptyView: function(sReason) {
			var oEmptyPageSettings = {
				title: this._oResourceBundle.getText(this._getEmptyTitleKey(sReason)),
				text: this._getEmptyText(sReason),
				icon: sReason === "bypassed" ? "sap-icon://document" : null,
				description: ""
			};
			this._oGlobalModel.setProperty("/emptyPage", oEmptyPageSettings);
			this._oGlobalModel.setProperty("/isBusyApproving", false);
			this._oGlobalModel.setProperty("/detailImmediateBusy", false);
			this._oRouter.getTargets().display("empty");
		},

		_getEmptyTitleKey: function(sReason) {
			switch (sReason) {
				case "bypassed":
					return "notFoundTitle";
				case "noObjects":
					return "masterTitle";
				default:
					return "detailTitle";
			}
		},

		_getEmptyText: function(sReason) {
			if (sReason === "noObjects") {
				return this._oGlobalModel.getProperty("/listNoDataText");
			}
			return this._oResourceBundle.getText(sReason === "bypassed" ? "notFoundText" : "noObjectFoundText");
		},

		/* =========================================================== */
		/* OData metadata handling                                     */
		/* =========================================================== */

		/**
		 * This method can be called when a certain action can only be performed when the OData metadata have been successfully loaded.
		 * When this method is called and all previous attempts to read the OData metadata have failed a new attempt is triggered.
		 * @public
		 * @param {function} fnFinished is a function that is called when the loading of the metadata has finished. The infomration whether
		 * this was successful is passed as parameter to this method.
		 * Note: If this function would be called several times during the same process of metadata loading only the function
		 * passed with the last call would be executed. Actually, this never happens.
		 */
		whenMetadataIsFinished: function(fnFinished) {
			if (this._oGlobalModel.getProperty("/metaDataLoaded")) {
				if (fnFinished) {
					fnFinished(true);
				}
			} else {
				this._fnWhenMetadataIsFinished = fnFinished;
				if (!this._oGlobalModel.getProperty("/isMetaDataLoading")) {
					this._oGlobalModel.setProperty("/isMetaDataLoading", true);
					this._oGlobalModel.setProperty("/detailImmediateBusy", true);
					this._oGlobalModel.setProperty("/masterImmediateBusy", true);
					this._oODataModel.refreshMetadata();
				}
			}
		},

		// This method is called during startup. It registers for OData models events metadata loaded and metadata failed and
		// ensures consistent state handling. Note that error handling for the metadata is done by class errorHandling..
		_registerForMetaData: function() {
			var fnMetadataLoadFinished = function(bSuccess) {
				this._oGlobalModel.setProperty("/isMetaDataLoading", false);
				this._oGlobalModel.setProperty("/metaDataLoaded", bSuccess);
				if (bSuccess) {
					this._setContextForDetailController();
					if (!Device.system.phone) {
						this._adaptListToSelection();
					}
				}
				if (this._fnWhenMetadataIsFinished) {
					this._fnWhenMetadataIsFinished(bSuccess);
					this._fnWhenMetadataIsFinished = null;
				}
			};
			this._oODataModel.attachMetadataLoaded(fnMetadataLoadFinished.bind(this, true));
			this._oODataModel.attachMetadataFailed(fnMetadataLoadFinished.bind(this, false));
		}
	});
});