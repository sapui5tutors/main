sap.ui.require([
        "sap/ui/model/resource/ResourceModel",
        "sap/m/MessageBox",
        "nw/epm/refapps/purchaseorders/approve/model/utilities",
		"nw/epm/refapps/purchaseorders/approve/controller/errorHandling"
	],
	// Unit tests for class nw.epm.refapps.purchaseorders.approve.controller.errorHandling
	function(ResourceModel, MessageBox, utilities, errorHandling) {
		"use strict";

		var fnMetadataFailed, // the method attached to the OData model for metadata failed
			fnRequestFailed,  // the method attached to the OData model for request failed
			mGlobalProperties, // backbone for the stub for the globalProperties model
			oApplication = { // stub for an instance of nw.epm.refapps.purchaseorders.approve.controller.Application 
				showEmptyView: function() {
					ok(false, "showEmptyView must not be called in this scenario");
				},
				whenMetadataIsFinished: function() {
					ok(false, "whenMetadataIsFinished must not be called in this scenario");
				}
			},
			oResourceModel = new ResourceModel({ // the ResourceModel for this App
				bundleUrl: [$.sap.getModulePath("nw.epm.refapps.purchaseorders.approve"), "i18n/i18n.properties"].join("/")
			}),
			sExpectedStyleClass = {}, // stub for the content density class used here
			oUtilitiesStub; // stub for nw.epm.refapps.purchaseorders.approve.model.utilities, initialized in test setup

		// Executes the register-method (the method to be tested). Before this is done additional stubs are created
		// (more precisely: those stubs are created which need not to be visible globally).
		function fnRegister() {
			var oODataModel = { // stub for the OData model
					attachEvent: function(sEvent, fnListener) {
						if (sEvent === "metadataFailed") {
							ok(!fnMetadataFailed, "Only attach for metadata failed once");
							fnMetadataFailed = fnListener;
						} else {
							strictEqual(sEvent, "requestFailed", "only attach to the failed events");
							ok(!fnRequestFailed, "Only attach for request failed once");
							fnRequestFailed = fnListener;
						}
					}
				},
				oGlobalModel = { // stub for the globalProperties model
					setProperty: function(sProperty, sValue) {
						strictEqual(sProperty, "/listNoDataText", "only listNoDataText must be modified by failed handler");
						mGlobalProperties[sProperty] = sValue;
					}
				},
				mModels = { // the models defined in the component
					i18n: oResourceModel,
					undefined: oODataModel,
					"globalProperties": oGlobalModel
				},
				oComponent = { // stub for the component
					getModel: function(sName) {
						var oRet = mModels[sName];
						ok(!!oRet, "Only 'i18n', 'globalProperties' and default model must be requested");
						return oRet;
					}
				};
			errorHandling.register(oApplication, oComponent);
		}

		QUnit.module("error handling", {
			beforeEach: function() {
				oUtilitiesStub = sinon.stub(utilities, "getContentDensityClass", function() {
					return sExpectedStyleClass;
				});
				mGlobalProperties = {};
			},
			afterEach: function() {
				oUtilitiesStub.restore();
				oUtilitiesStub = null;
				fnMetadataFailed = null;
				fnRequestFailed = null;
				mGlobalProperties = null;
			}
		});

		QUnit.test("Register", function() {
			fnRegister();
			strictEqual(typeof fnMetadataFailed, "function", "Should have registered for metadata failed");
			strictEqual(typeof fnRequestFailed, "function", "Should have registered for request failed");
		});

		function fnGetErrorEvent() {
			var oResponse = {},
				oEvent = {
					getParameters: function() {
						return {
							response: oResponse
						};
					}
				};
			return {
				event: oEvent,
				response: oResponse
			};
		}

		function fnGetMessageBoxErrorStub(oResponse, bWithRetry) {
			var oResourceBundle = oResourceModel.getResourceBundle();
			return sinon.stub(MessageBox, "error", function(sErrorText, oSettings) {
				strictEqual(sErrorText, oResourceBundle.getText("errorText"), "error text must be correct");
				strictEqual(oSettings.title, oResourceBundle.getText("errorTitle"), "error title must be correct");
				strictEqual(oSettings.details, oResponse, "details must be correct");
				deepEqual(oSettings.actions, bWithRetry ? [MessageBox.Action.RETRY, MessageBox.Action.CLOSE] : [MessageBox.Action.CLOSE],
					"actions must be correct");
				strictEqual(typeof oSettings.onClose, "function", "onClose must be a function");
				strictEqual(oSettings.styleClass, sExpectedStyleClass, "style class must be correct");
			});
		}

		QUnit.test("Register and let metadata fail", function() {
			fnRegister();
			var oErrorEvent = fnGetErrorEvent(),
				oResponse = oErrorEvent.response,
				oEvent = oErrorEvent.event,
				oShowEmptyViewStub = sinon.stub(oApplication, "showEmptyView"),
				oMessageBoxErrorStub = fnGetMessageBoxErrorStub(oResponse, true);
			fnMetadataFailed(oEvent);
			ok(oShowEmptyViewStub.calledOnce, "showEmptyView must have been called");
			ok(oShowEmptyViewStub.alwaysCalledWithExactly("noObjects"), "showEmptyView must be called with correct parameters");
			oShowEmptyViewStub.restore();
			ok(oMessageBoxErrorStub.calledOnce, "MessageBox.error must have been called");
			oMessageBoxErrorStub.restore();
		});

		QUnit.test("Register and let request fail", function() {
			fnRegister();
			var oErrorEvent = fnGetErrorEvent(),
				oResponse = oErrorEvent.response,
				oEvent = oErrorEvent.event,
				oMessageBoxErrorStub = fnGetMessageBoxErrorStub(oResponse, false);
			fnRequestFailed(oEvent);
			ok(oMessageBoxErrorStub.calledOnce, "MessageBox.error must have been called");
			oMessageBoxErrorStub.restore();
		});

		QUnit.test("Register and let metadata fail, retry, fail once more", function() {
			fnRegister();
			var oErrorEvent = fnGetErrorEvent(),
				oEvent = oErrorEvent.event,
				fnClose,
				oShowEmptyViewStub = sinon.stub(oApplication, "showEmptyView"),
				oWhenMetadataIsFinishedStub = sinon.stub(oApplication, "whenMetadataIsFinished"),
				oMessageBoxErrorStub = sinon.stub(MessageBox, "error", function(sErrorText, oSettings) {
					fnClose = oSettings.onClose;
				});
			fnMetadataFailed(oEvent);
			oShowEmptyViewStub.restore();
			oMessageBoxErrorStub.restore();
			fnClose(MessageBox.Action.RETRY);
			ok(oWhenMetadataIsFinishedStub.calledOnce, "whenMetadataIsFinished must have been called");
			ok(oWhenMetadataIsFinishedStub.calledWithExactly, "whenMetadataIsFinished must have been called without parameters");
			oWhenMetadataIsFinishedStub.restore();
			oErrorEvent = fnGetErrorEvent();
			oEvent = oErrorEvent.event;
			var oResponse = oErrorEvent.response;
			oMessageBoxErrorStub = fnGetMessageBoxErrorStub(oResponse, true);
			oShowEmptyViewStub = sinon.stub(oApplication, "showEmptyView");
			fnMetadataFailed(oEvent);
			oShowEmptyViewStub.restore();
			ok(oMessageBoxErrorStub.calledOnce, "MessageBox.error must have been called once more");
			oMessageBoxErrorStub.restore();
		});

		QUnit.test("Register, let request fail, close popup, let another request fail", function() {
			fnRegister();
			var oErrorEvent = fnGetErrorEvent(),
				oEvent = oErrorEvent.event,
				fnClose,
				oMessageBoxErrorStub = sinon.stub(MessageBox, "error", function(sErrorText, oSettings) {
					fnClose = oSettings.onClose;
				});
			fnRequestFailed(oEvent);
			oMessageBoxErrorStub.restore();
			fnClose();
			oErrorEvent = fnGetErrorEvent();
			oEvent = oErrorEvent.event;
			var oResponse = oErrorEvent.response;
			oMessageBoxErrorStub = fnGetMessageBoxErrorStub(oResponse, false);
			fnRequestFailed(oEvent);
			ok(oMessageBoxErrorStub.calledOnce, "MessageBox.error must have been called exactly once");
			oMessageBoxErrorStub.restore();
		});

		QUnit.test("Register, let two request fail without closing the popup in between", function() {
			fnRegister();
			var oErrorEvent = fnGetErrorEvent(),
				oEvent = oErrorEvent.event,
				oMessageBoxErrorStub = sinon.stub(MessageBox, "error");
			fnRequestFailed(oEvent);
			oErrorEvent = fnGetErrorEvent();
			oEvent = oErrorEvent.event;
			fnRequestFailed(oEvent);
			// A previous test has already ensured that the first call of fnRequestFailed results in a call of MessageBox.error.
			// Now we check that the second call of fnRequestFailed did not result in another call of MessageBox.error (since the MessagebOx has not been closed).
			ok(oMessageBoxErrorStub.calledOnce, "MessageBox.error must have been called exactly once");
			oMessageBoxErrorStub.restore();
		});
	}
);