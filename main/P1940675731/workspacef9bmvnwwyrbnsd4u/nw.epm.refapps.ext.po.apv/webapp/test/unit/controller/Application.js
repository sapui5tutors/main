sap.ui.require([
		"sap/ui/Device",
		"nw/epm/refapps/purchaseorders/approve/controller/Application",
		"nw/epm/refapps/purchaseorders/approve/controller/errorHandling",
		"nw/epm/refapps/purchaseorders/approve/controller/ListSelector",
		"nw/epm/refapps/purchaseorders/approve/model/Approver",
		"sap/ui/model/resource/ResourceModel"
	],
	// Unit tests for class nw.epm.refapps.purchaseorders.approve.controller.Application
	function(Device, Application, errorHandling, ListSelector, Approver, ResourceModel) {
		"use strict";

		function fnNoOp() {} // dummy function for temporary use (do not replace by jQuery.noop, since it is used as indicator that the use is temporary)

		function fnGetContextPath(sPOId) {
			return "Foo[" + sPOId + "]";
		}

		var oDeviceSytemStore, // temp storage for Device.sytem. In the test we use our own stub, so that phone and non-phone environment can both be tested
			iRootBusyIndicatorDelay = 7776, // stub for the default delay of the busy indicator of the root view (nw.epm.refapps.purchaseorders.approve.view.App)
			oRootController = {}, // stub for the controller of the root view
			oRootView = { // stub for the root view
				getController: function() {
					return oRootController;
				},
				getBusyIndicatorDelay: function() {
					return iRootBusyIndicatorDelay;
				}
			},
			oDetailController = { // stub for the controller of nw.epm.refapps.purchaseorders.approve.view.S3_PurchaseOrderDetails
				setContextPath: jQuery.noop
			},
			mModels, // map of the models available for the component
			oResourceModel = new ResourceModel({ // the ResourceModel for this App
				bundleUrl: [$.sap.getModulePath("nw.epm.refapps.purchaseorders.approve"), "i18n/i18n.properties"].join("/")
			}),
			oODataModel = { // stub for the ODataModel of this App
				createKey: function(sCollection, oKeyProperties) {
					strictEqual(sCollection, "/PurchaseOrders", "Only key for collection PurchaseOrders must be requested");
					return fnGetContextPath(oKeyProperties.POId);
				}
			},
			oTargetHandler = {}, // stub for the target handler of the router
			oPOMatchedRoute = {}, // stub for a route with name 'PurchaseOrderDetails'
			oRouter = { // stub for the router of the component
				getTargetHandler: function() {
					return oTargetHandler;
				},
				getRoute: function(sName) {
					strictEqual(sName, "PurchaseOrderDetails", "Only detail route must be used here");
					return oPOMatchedRoute;
				}
			},
			oComponent = { // stub for the component
				getAggregation: function(sId) {
					strictEqual(sId, "rootControl", "'rootControl' is the only valid aggregation of the component");
					return oRootView;
				},
				getModel: function(sName) {
					var oModel = mModels[sName];
					ok(oModel, "Model " + sName + " was requested, it must be defined");
					return oModel;
				},
				setModel: function(oModel, sName) {
					ok(sName, "Default model is defined declaratively");
					ok(!mModels.hasOwnProperty(sName), "No model should be defined twice");
					mModels[sName] = oModel;
				},
				getRouter: function() {
					return oRouter;
				},
				getComponentData: jQuery.noop
			},
			fnMetadataLoaded, // the function that was registered at the metadata loaded event of the ODataModel
			fnMetadataFailed, // the function that was registered at the metadata failed event of the ODataModel
			// There is a number of external methods which should be called exactly once during a test run (some of them only during initialization).
			// These methods are 'registered' in the array aCalledOnceStubs via function fnStubForOnce (see below).
			// aCalledOnceStub is an array containing one entry for each of these methods. This entry is an object with the following properties:
			// - object: The object possessing the method to be controlled
			// - functionName: The name of the function of the object which should be controlled
			// - stub: a sinon-stub created for the specified method
			// - calledCount: information how often the specified method has been called
			// The array is initialized in beforeEach.
			// In afterEach the fololowing things are done generically:
			// - Check whether each specified method has indeed been called exactly once
			// - restore the stubs
			// Note: In order to check whether the stub has been called with the correct arguments it can be accessed via function fnGetStubForOnce (see below)
			aCalledOnceStubs,
			// The globalProperties-model is used for communication with other artifacts. Therefore, its correct state needs to be checked after
			// each test. This is done generically in the afterEach-method (see below). mExpectedGlobals contains the expected values in
			// the model. They are initialized with common values in the beforeEach-method. Individual tests may adapt specific values
			// according to their requirements.
			mExpectedGlobals;

		// sFunctionName is the name of a method of oObject which should be called exactly once during the current test.
		// If oObject does not yet have the specified method a dummy method is added. The specified method is stubbed. If optional parameter
		// fStub is truthy it must be a function which is called inside this stub.
		// The stub is registered at global array aCalledOnceStubs.
		function fnStubForOnce(oObject, sFunctionName, fStub) {
			var i = aCalledOnceStubs.length;
			oObject[sFunctionName] = oObject[sFunctionName] || fnNoOp; // create dummy function if necessary. Note that this dummy function will be removed in afterEach.
			var oStub = sinon.stub(oObject, sFunctionName, function() {
				aCalledOnceStubs[i].calledCount++;
				if (fStub) {
					return fStub.apply(null, arguments);
				}
			});
			aCalledOnceStubs.push({
				object: oObject,
				functionName: sFunctionName,
				stub: oStub,
				calledCount: 0
			});
			return oStub;
		}

		// Gets a stub that was created using fnStubForOnce 
		function fnGetStubForOnce(oObject, sFunctionName) {
			for (var i = 0; i < aCalledOnceStubs.length; i++) {
				var oStubObject = aCalledOnceStubs[i];
				if (oStubObject.object === oObject && oStubObject.functionName === sFunctionName) {
					return oStubObject.stub;
				}
			}
		}

		// Returns an instance of the class to be tested. This instance has been initialized in the following sense:
		// - method init() has been called on the instance
		// - if bWithOutMetaData is not truthy, it is simulated that the App has been started successfully, which means:
		// -- metadata of the ODataModel have been loaded successfully
		// -- master list was loaded successfully
		// -- detail screen was loaded successfully
		function fnGetObjectUnderTest(bWithOutMetaData) {
			var oApplication = new Application(oComponent);
			oApplication.init();
			if (!bWithOutMetaData) {
				fnMetadataLoaded();
				var oGlobalProperties = mModels.globalProperties;
				oGlobalProperties.setProperty("/masterImmediateBusy", false); // this is normally done by the S2 controller
				oGlobalProperties.setProperty("/detailImmediateBusy", false); // this is normally done by the S3 controller
			}
			return oApplication;
		}

		// standard test settings to be used for most tests
		var oTestSettings = {
			beforeEach: function() {
				oDeviceSytemStore = Device.system;
				Device.system = {
					phone: false
				};
				aCalledOnceStubs = [];
				// setup the ODataModel
				fnStubForOnce(oODataModel, "setDeferredBatchGroups");
				fnStubForOnce(oODataModel, "attachMetadataLoaded", function(fnHandler) {
					fnMetadataLoaded = fnHandler;
				});
				fnStubForOnce(oODataModel, "attachMetadataFailed", function(fnHandler) {
					fnMetadataFailed = fnHandler;
				});
				// setup for the router
				fnStubForOnce(oRouter, "attachBypassed");
				fnStubForOnce(oRouter, "initialize", function() {
					var oApplication = mModels.globalProperties.getProperty("/application");
					oApplication.registerDetailController(oDetailController);
				});
				fnStubForOnce(oTargetHandler, "setCloseDialogs");
				fnStubForOnce(oPOMatchedRoute, "attachPatternMatched");
				fnStubForOnce(errorHandling, "register", function() {
					oComponent.getModel("globalProperties"); // Check whether global properties model has been defined before registering at the error handler
				});
				// simulate instantiation of ResourceModel- and ODataModel based on manifest.json 
				mModels = {
					i18n: oResourceModel,
					undefined: oODataModel
				};
				// Set default values for the expected properties in the global model. Specific values may be overridden by single tests.
				mExpectedGlobals = {
					listNoDataText: "",
					isMultiSelect: false,
					selectedPurchaseOrders: [],
					preferredIds: [],
					currentPOId: undefined,
					isMetaDataLoading: false,
					isBusyApproving: false,
					metaDataLoaded: true,
					isSwipeRunning: false,
					originalBusyDelay: iRootBusyIndicatorDelay,
					masterImmediateBusy: false,
					detailImmediateBusy: false
				};
			},
			afterEach: function() {
				// Check whether all specified methods have indeed been called exactly once and cleanup afterwards.
				for (var i = 0; i < aCalledOnceStubs.length; i++) {
					var oStubObject = aCalledOnceStubs[i];
					strictEqual(oStubObject.calledCount, 1, "Function " + oStubObject.functionName + " must be called exactly once");
					oStubObject.stub.restore();
					if (oStubObject.object[oStubObject.functionName] === fnNoOp) {
						delete oStubObject.object[oStubObject.functionName];
					}
				}
				// Check whether globalProperties-model contains the expected values
				var oGlobalProperties = mModels.globalProperties;
				for (var prop in mExpectedGlobals) {
					//needed for eslint
					if ({}.hasOwnProperty.call(mExpectedGlobals, prop)) {
						deepEqual(oGlobalProperties.getProperty("/" + prop), mExpectedGlobals[prop], "Value for global property " + prop +
							" must be as expected");
					}
				}
				// Cleanup.
				Device.system = oDeviceSytemStore;
				oDeviceSytemStore = null;
				aCalledOnceStubs = null;
				mModels = null;
				mExpectedGlobals = null;
				fnMetadataLoaded = null;
				fnMetadataFailed = null;
			}
		};

		QUnit.module("Application: initialization", oTestSettings);

		QUnit.test("Get an instance of application and initialize it", function() {
			var oContextPathSpy = sinon.spy(oDetailController, "setContextPath");
			var oApproverSpy = test.unit.stubForConstructor.spy("nw.epm.refapps.purchaseorders.approve.model.Approver");
			var oApplication = fnGetObjectUnderTest(true);
			ok(fnGetStubForOnce(oODataModel, "setDeferredBatchGroups").calledWithExactly(["POMassApproval"]),
				"setDeferredBatchGroups must be called with deferred batch group 'POMassApproval'");
			ok(fnGetStubForOnce(oRouter, "attachBypassed").calledWithExactly(oApplication.onBypassed, oApplication),
				"Bypassed handler must be registered correctly");
			ok(fnGetStubForOnce(oTargetHandler, "setCloseDialogs").calledWithExactly(false),
				"Register for error handling must be performed correctly");
			ok(fnGetStubForOnce(oPOMatchedRoute, "attachPatternMatched").calledWithExactly(oApplication.onPOMatched, oApplication),
				"Method onPOMatched must be registered at route 'PurchaseOrderDetails' correctly");
			ok(fnGetStubForOnce(errorHandling, "register").calledWithExactly(oApplication, oComponent),
				"Register for error handling must be performed correctly");
			ok(oApplication.oListSelector instanceof ListSelector, "attribute oListSelector must have been created correctly");
			ok(oApplication.oApprover instanceof Approver, "attribute oApprover must have been created correctly");
			ok(oApproverSpy.alwaysCalledWithExactly(oApplication), "Approver must have been created with correct parameters");
			mExpectedGlobals.isMetaDataLoading = true;
			mExpectedGlobals.metaDataLoaded = false;
			mExpectedGlobals.masterImmediateBusy = true;
			mExpectedGlobals.detailImmediateBusy = true;
			var oDeviceModel = oComponent.getModel("device");
			strictEqual(oDeviceModel.getData(), Device, "Device model must be instantiated correctly");
			ok(oContextPathSpy.alwaysCalledWithExactly(undefined), "no context path must be set on detail controller in onInit");
			oContextPathSpy.restore();
			oApproverSpy.restore();
		});

		QUnit.test("Get an instance of application, initialize it and finish metadata loading", function() {
			fnGetObjectUnderTest();
		});

		QUnit.test("Get an instance of application, initialize it and assume metadata loading fails", function() {
			fnGetObjectUnderTest(true);
			fnMetadataFailed();
			mExpectedGlobals.metaDataLoaded = false;
			mExpectedGlobals.masterImmediateBusy = true;
			mExpectedGlobals.detailImmediateBusy = true;
		});

		QUnit.module("Application: onPOMatched", oTestSettings);

		// Simulates that a detail route is matched and checks whether the App is transferred to the correct state.
		function fnPOMatchedAndCheck(oApplication, bPhone) {
			var sPOId = "/&%123<>'",
				oEvent = { // event coming with the detail route
					getParameter: function(sParameter) {
						strictEqual(sParameter, "arguments", "Only parameter 'arguments' should be requested from the event");
						return {
							POId: encodeURIComponent(sPOId)
						};
					}
				};
			if (!bPhone) {
				fnStubForOnce(oRootController, "hideMaster");
			}
			var oSelectAListItemStub = !bPhone && fnStubForOnce(oApplication.oListSelector, "selectAListItem"),
				oSetContextPathStub = fnStubForOnce(oDetailController, "setContextPath");
			oApplication.onPOMatched(oEvent); // detail route is matched
			mExpectedGlobals.currentPOId = sPOId;
			var sExpectedContextPath = fnGetContextPath(sPOId);
			ok(bPhone || oSelectAListItemStub.calledWithExactly(sExpectedContextPath),
				"Method selectAListItem must be called with the correct context path");
			ok(oSetContextPathStub.calledWithExactly(sExpectedContextPath), "Method setContextPath must be called with the correct context path");
		}

		QUnit.test("Start application and catch detail route", function() {
			var oApplication = fnGetObjectUnderTest();
			fnPOMatchedAndCheck(oApplication);
		});

		QUnit.test("Start application, set masterImmediateBusy to true, and catch detail route", function() {
			var oApplication = fnGetObjectUnderTest();
			var oGlobalProperties = mModels.globalProperties;
			oGlobalProperties.setProperty("/masterImmediateBusy", true);
			fnPOMatchedAndCheck(oApplication);
			mExpectedGlobals.masterImmediateBusy = true; // on non-phone this property is unchanged
		});

		QUnit.test("Start application, set masterImmediateBusy to true, and catch detail route on phone", function() {
			Device.system.phone = true;
			var oApplication = fnGetObjectUnderTest();
			var oGlobalProperties = mModels.globalProperties;
			oGlobalProperties.setProperty("/masterImmediateBusy", true); // on phone this will be set back to the default (false)
			fnPOMatchedAndCheck(oApplication, true);
		});

		QUnit.test("Start application, set it to multi-selct mode, and catch detail route", function() {
			var oApplication = fnGetObjectUnderTest();
			var oGlobalProperties = mModels.globalProperties;
			oGlobalProperties.setProperty("/isMultiSelect", true);
			oGlobalProperties.setProperty("/selectedPurchaseOrders", ["bla", "foo"]);
			fnPOMatchedAndCheck(oApplication);
		});

		QUnit.module("Application: onBypassed", oTestSettings);

		// Simulates that an incorrect route is matched and checks whether the App is transferred to the corrcet state.
		function fnCheckBypassed(oApplication) {
			var oSelectAListItemStub = fnStubForOnce(oApplication.oListSelector, "selectAListItem");
			var oEmptyViewStub = fnStubForOnce(oApplication, "showEmptyView");
			oApplication.onBypassed(); // incorrect route is matched
			ok(oSelectAListItemStub.calledWithExactly(), "Method selectAListItem must be called without parameters");
			ok(oEmptyViewStub.calledWithExactly("bypassed"), "Empty view must be called 'bypassed'");
		}

		QUnit.test("Start application and catch a bypassed route", function() {
			var oApplication = fnGetObjectUnderTest();
			fnCheckBypassed(oApplication);
		});

		QUnit.test("Start application, set it to multi-selct mode, and catch a bypassed route", function() {
			var oApplication = fnGetObjectUnderTest();
			var oGlobalProperties = mModels.globalProperties;
			oGlobalProperties.setProperty("/isMultiSelect", true);
			oGlobalProperties.setProperty("/selectedPurchaseOrders", ["bla", "foo"]);
			fnCheckBypassed(oApplication);
		});

		var oShellStore; // temp storage for the sap.ushell-reference which is stubbed during this test

		QUnit.module("Application: navBack", {
			beforeEach: function() {
				oShellStore = sap.ushell;
				sap.ushell = {
					Container: {
						getService: function() {
							ok(false, "Ushell must not be accessed in this scenario");
						}
					}
				};
				oTestSettings.beforeEach();
			},
			afterEach: function() {
				oTestSettings.afterEach();
				sap.ushell = oShellStore;
				oShellStore = null;
			}
		});

		QUnit.test("Start application and back in history", function() {
			var oApplication = fnGetObjectUnderTest(),
				oHistory = {
					getPreviousHash: function() {
						return "aPreviousHash";
					}
				},
				oHistoryInstanceStub = sinon.stub(sap.ui.core.routing.History, "getInstance", function() {
					return oHistory;
				}),
				oGoStub = fnStubForOnce(history, "go");
			oApplication.navBack(true, false);
			ok(oGoStub.calledWithExactly(-1), "Windows back must be called correctly");
			mExpectedGlobals.currentPOId = null;
			oHistoryInstanceStub.restore();
		});

		QUnit.test("Start application, nav to detail screen and back in history", function() {
			var oApplication = fnGetObjectUnderTest(),
				oGlobalProperties = mModels.globalProperties;
			oGlobalProperties.setProperty("/currentPOId", "foo");
			var oHistory = {
					getPreviousHash: function() {
						return "aPreviousHash";
					}
				},
				oHistoryInstanceStub = sinon.stub(sap.ui.core.routing.History, "getInstance", function() {
					return oHistory;
				}),
				oGoStub = fnStubForOnce(history, "go");
			oApplication.navBack(true, true);
			ok(oGoStub.calledWithExactly(-1), "Windows back must be called correctly");
			mExpectedGlobals.currentPOId = null;
			oHistoryInstanceStub.restore();
		});

		QUnit.test("Start application and back in FLP", function() {
			var oApplication = fnGetObjectUnderTest(),
				oHistory = {
					getPreviousHash: jQuery.noop
				},
				oHistoryInstanceStub = sinon.stub(sap.ui.core.routing.History, "getInstance", function() {
					return oHistory;
				}),
				oGoStub = sinon.stub(history, "go"),
				oCrossAppNavigator = {},
				oBackToPreviousAppStub = fnStubForOnce(oCrossAppNavigator, "backToPreviousApp"),
				oUshellStub = fnStubForOnce(sap.ushell.Container, "getService", function() {
					return oCrossAppNavigator;
				});
			oApplication.navBack(true, false);
			ok(!oGoStub.called, "Windows back must not be called in this scenario");
			ok(oUshellStub.calledWithExactly("CrossApplicationNavigation"), "Only CrossApplicationNavigation-Service must be used");
			ok(oBackToPreviousAppStub.calledOnce, "backToPreviousApp must have been called");
			mExpectedGlobals.currentPOId = null;
			oHistoryInstanceStub.restore();
			oGoStub.restore();
		});

		QUnit.test("Start application with detail screen and (not available) back", function() {
			var oApplication = fnGetObjectUnderTest(),
				oGlobalProperties = mModels.globalProperties;
			oGlobalProperties.setProperty("/currentPOId", "foo");
			var oHistory = {
					getPreviousHash: jQuery.noop
				},
				oHistoryInstanceStub = sinon.stub(sap.ui.core.routing.History, "getInstance", function() {
					return oHistory;
				}),
				oGoStub = sinon.stub(history, "go"),
				oNavToStub = fnStubForOnce(oRouter, "navTo");
			fnStubForOnce(oRootController, "backMaster");
			oApplication.navBack(true, true);
			ok(!oGoStub.called, "Windows back must not be called in this scenario");
			ok(oNavToStub.calledWithExactly("main", {}, true), "navTo must be called correctly");
			mExpectedGlobals.currentPOId = null;
			oHistoryInstanceStub.restore();
			oGoStub.restore();
		});

		QUnit.test("Start application, nav to multi select and back", function() {
			var oApplication = fnGetObjectUnderTest(),
				oGlobalProperties = mModels.globalProperties;
			oGlobalProperties.setProperty("/isMultiSelect", true);
			oGlobalProperties.setProperty("/selectedPurchaseOrders", ["bla", "foo"]);
			var oHistoryInstanceSpy = sinon.spy(sap.ui.core.routing.History, "getInstance"),
				oGoStub = sinon.stub(history, "go"),
				oNavToStub = fnStubForOnce(oRouter, "navTo");
			fnStubForOnce(oRootController, "backMaster");
			oApplication.navBack(false, true);
			ok(!oHistoryInstanceSpy.called, "History must not be accessed in this scenario");
			ok(!oGoStub.called, "Windows back must not be called, if not available");
			ok(oNavToStub.calledWithExactly("main", {}, true), "navTo must be called correctly");
			mExpectedGlobals.currentPOId = null;
			mExpectedGlobals.isMultiSelect = true;
			mExpectedGlobals.selectedPurchaseOrders = ["bla", "foo"];
			oHistoryInstanceSpy.restore();
			oGoStub.restore();
		});

		var oExpectedEmptyView; // expected settings for the empty view

		QUnit.module("Application: showEmptyView", {
			beforeEach: function() {
				oTestSettings.beforeEach();
				var oTargets = {};
				fnStubForOnce(oTargets, "display", function(sTarget) {
					strictEqual(sTarget, "empty", "only target 'empty' should be displayed here");
				});
				fnStubForOnce(oRouter, "getTargets", function() {
					return oTargets;
				});
			},
			afterEach: function() {
				mExpectedGlobals.emptyPage = oExpectedEmptyView;
				oTestSettings.afterEach();
				oExpectedEmptyView = null;
			}
		});

		QUnit.test("Start application and show bypassed view", function() {
			var oApplication = fnGetObjectUnderTest(),
				oResourceBundle = oResourceModel.getResourceBundle();
			oApplication.showEmptyView("bypassed");
			oExpectedEmptyView = {
				title: oResourceBundle.getText("notFoundTitle"),
				text: oResourceBundle.getText("notFoundText"),
				icon: "sap-icon://document",
				description: ""
			};
		});

		QUnit.test("Start application and show no objects view", function() {
			var oApplication = fnGetObjectUnderTest(),
				oResourceBundle = oResourceModel.getResourceBundle(),
				oGlobalProperties = mModels.globalProperties;
			oGlobalProperties.setProperty("/listNoDataText", "myNotFoundText");
			oApplication.showEmptyView("noObjects");
			mExpectedGlobals.listNoDataText = "myNotFoundText";
			oExpectedEmptyView = {
				title: oResourceBundle.getText("masterTitle"),
				text: "myNotFoundText",
				icon: null,
				description: ""
			};
		});

		QUnit.test("Start application and show object not found view", function() {
			var oApplication = fnGetObjectUnderTest(),
				oResourceBundle = oResourceModel.getResourceBundle();
			oApplication.showEmptyView("objectNotFound");
			oExpectedEmptyView = {
				title: oResourceBundle.getText("detailTitle"),
				text: oResourceBundle.getText("noObjectFoundText"),
				icon: null,
				description: ""
			};
		});

		QUnit.module("Application: whenMetadataIsFinished", oTestSettings);

		QUnit.test("Metadata loading was successfull. Call whenMetadataIsFinished without parameter", function() {
			var oApplication = fnGetObjectUnderTest();
			oApplication.whenMetadataIsFinished();
		});

		QUnit.test("Metadata loading was successfull. Call whenMetadataIsFinished with callback", function() {
			var oApplication = fnGetObjectUnderTest(),
				oCalledWith = null,
				iCount = 0,
				fnFinished = function() {
					iCount++;
					oCalledWith = arguments;
				};
			oApplication.whenMetadataIsFinished(fnFinished);
			strictEqual(iCount, 1, "callback must be called exactly once");
			deepEqual(oCalledWith, {
				0: true
			}, "callback must be called with parameter true");
		});

		QUnit.test("Metadata loading still running. Call whenMetadataIsFinished with callback. Then finish metadata loading.", function() {
			var oApplication = fnGetObjectUnderTest(true),
				oCalledWith = null,
				iCount = 0,
				fnFinished = function() {
					iCount++;
					oCalledWith = arguments;
				};
			oApplication.whenMetadataIsFinished(fnFinished);
			strictEqual(iCount, 0, "callback must not be called before metadata have beenn loaded");
			fnMetadataLoaded();
			strictEqual(iCount, 1, "callback must be called exactly once");
			deepEqual(oCalledWith, {
				0: true
			}, "callback must be called with parameter true");
			mExpectedGlobals.masterImmediateBusy = true;
			mExpectedGlobals.detailImmediateBusy = true;
		});

		QUnit.test("Metadata loading failed. Call whenMetadataIsFinished with callback. Then metadata loading succeeds.", function() {
			var oApplication = fnGetObjectUnderTest(true),
				oCalledWith = null,
				iCount = 0,
				fnFinished = function() {
					iCount++;
					oCalledWith = arguments;
				};
			fnMetadataFailed();
			fnStubForOnce(oODataModel, "refreshMetadata");
			oApplication.whenMetadataIsFinished(fnFinished);
			strictEqual(iCount, 0, "callback must not be called before metadata have beenn loaded");
			fnMetadataLoaded();
			strictEqual(iCount, 1, "callback must be called exactly once");
			deepEqual(oCalledWith, {
				0: true
			}, "callback must be called with parameter true");
			mExpectedGlobals.masterImmediateBusy = true;
			mExpectedGlobals.detailImmediateBusy = true;
		});

		QUnit.test("Metadata loading failed. Call whenMetadataIsFinished with callback. Then metadata loading fails again.", function() {
			var oApplication = fnGetObjectUnderTest(true),
				oCalledWith = null,
				iCount = 0,
				fnFinished = function() {
					iCount++;
					oCalledWith = arguments;
				};
			fnMetadataFailed();
			fnStubForOnce(oODataModel, "refreshMetadata");
			oApplication.whenMetadataIsFinished(fnFinished);
			strictEqual(iCount, 0, "callback must not be called before metadata have been loaded");
			fnMetadataFailed();
			strictEqual(iCount, 1, "callback must be called exactly once");
			deepEqual(oCalledWith, {
				0: false
			}, "callback must be called with parameter false");
			mExpectedGlobals.masterImmediateBusy = true;
			mExpectedGlobals.detailImmediateBusy = true;
			mExpectedGlobals.metaDataLoaded = false;
		});
	}
);