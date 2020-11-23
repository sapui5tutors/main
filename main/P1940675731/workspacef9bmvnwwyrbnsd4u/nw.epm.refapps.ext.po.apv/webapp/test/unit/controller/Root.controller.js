sap.ui.require([
		"nw/epm/refapps/purchaseorders/approve/controller/Root.controller",
		"sap/ui/core/mvc/Controller",
		"nw/epm/refapps/purchaseorders/approve/model/utilities"
	],
	function(RootController, Controller, utilities) {
		"use strict";

		var sExpectedStyleClass = "TheStyleClass",  // stub for the content density class used here
			oAppControl = { // stub for the Split App defined declaratively
				hideMaster: function() {
                    ok(false, "hideMaster must not be called in this context");
				},

				backMaster: function() {
                    ok(false, "backMaster must not be called in this context");
				}
			},
			oView = { // stub for the view the class under test is the controller for
				addStyleClass: jQuery.noop
			},
			oUtilitiesStub; // stub for nw.epm.refapps.purchaseorders.approve.model.utilities, initialized in test setup

		// Return an instance of the class under test with methods inherited from the superclass stubbed
		function getStubbedInstance() {
			var oRootController = new RootController();
			// stub the function getView() and byId() inherited from sap.ui.core.mvc.Controller
			sinon.stub(oRootController, "getView", function() {
				return oView;
			});
			sinon.stub(oRootController, "byId", function(sId) {
					strictEqual(sId, "approvalApp", "'approvalApp' is the only id used in this view");
					return oAppControl;
			});
			return oRootController;
		}

		QUnit.module("App.controller: all functions", {
			beforeEach: function() {
				oUtilitiesStub = sinon.stub(utilities, "getContentDensityClass", function() {
					return sExpectedStyleClass;
				});
			},
			afterEach: function() {
				oUtilitiesStub.restore();
				oUtilitiesStub = null;
			}
		});

		QUnit.test("Get an instance of app controller", function() {
			var oRootController = new RootController();
			ok(oRootController, "Root controller should be initialized");
			ok(oRootController instanceof Controller, "Root controller should be a subclass of sap.ui.core.mvc.Controller");
			strictEqual(typeof oRootController.onInit, "function", "Root controller onInit method should be initialized");
			strictEqual(typeof oRootController.hideMaster, "function", "Root controller hideMaster method should be initialized");
			strictEqual(typeof oRootController.backMaster, "function", "Root controller backMaster method should be initialized");
		});

		QUnit.test("Get an instance of app controller and initialize it", function() {
			var oAppController = getStubbedInstance();
			var oAddStyleClassSpy = sinon.spy(oView, "addStyleClass");
			oAppController.onInit();
			ok(oAddStyleClassSpy.calledOnce, "add style class must be called once");
			ok(oAddStyleClassSpy.calledWith(sExpectedStyleClass),
				"The style class should be retrieved from nw.epm.refapps.purchaseorders.approve.model.utilities.getContentDensityClass");
			oAddStyleClassSpy.restore();
		});
		
		QUnit.test("Get an instance of app controller, initialize it and call back master", function() {
			var oRootController = getStubbedInstance();
			oRootController.onInit();
			var oBackMasterStub = sinon.stub(oAppControl, "backMaster", function(){});
            oRootController.backMaster();
            ok(oBackMasterStub.calledOnce, "back master must be called once on the SplitApp");
            oBackMasterStub.restore();
		});
		
		QUnit.test("Get an instance of app controller, initialize it and call hide master", function() {
			var oRootController = getStubbedInstance();
			oRootController.onInit();
			var oHideMasterStub = sinon.stub(oAppControl, "hideMaster", function(){});
            oRootController.hideMaster();
            ok(oHideMasterStub.calledOnce, "hide master must be called once on the SplitApp");
            oHideMasterStub.restore();
		});		
	}
);