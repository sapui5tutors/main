sap.ui.require([
		"nw/epm/refapps/purchaseorders/approve/controller/S2_PurchaseOrders.controller",
		"sap/ui/Device",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/resource/ResourceModel",
		"nw/epm/refapps/purchaseorders/approve/controller/BaseController",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterType"
	],
	function(S2Controller, Device, JSONModel, ResourceModel, BaseController, Filter, FilterType) {
		"use strict";

		var oApplication = {
				oListSelector: {
					setBoundMasterList: jQuery.noop
				},
				showEmptyView: function() {
					ok(false, "'showEmptyView' should not be called in this context");
				},
				whenMetadataIsFinished: function() {
					ok(false, "'whenMetadataIsFinished' should not be called in this context");
				}
			},
			oViewPropertiesModel,
			oListBusyIndicatordelay = {},
			aListItems,
			oList = {
				getBusyIndicatorDelay: function() {
					return oListBusyIndicatordelay;
				},
				getItems: function() {
					return aListItems || [];
				}
			},
			oListBinding = {
				filter: function() {
					ok(false, "Filter function should not be called in this context");
				},
				getLength: function() {
					return oList.getItems().length;
				},
				refresh: function() {
					ok(false, "Refresh function of list binding should not be called in this context");
				}
			},
			oPullToRefresh = {
				hide: function() {
					ok(false, "hide on PullToRefresh should not be called in this context");
				}
			},
			oSearchField = {
				setValue: function() {
					ok(false, "setValue on search field should not be called in this context");
				}
			},
			mDeclarativeControls = {
				list: oList,
				pullToRefresh: oPullToRefresh,
				searchField: oSearchField
			},
			oComponentData,
			oTargets = {
				display: function(aTarget) {
					ok(false, "display should not be called in this context");
				}
			},
			oRouter = {
				attachEventOnce: function() {
					ok(false, "no events should be attached to the router in this context");
				},
				getTargets: function() {
					return oTargets;
				},
				navTo: function() {
					ok(false, "navTo should not be called on the router in this context");
				}
			},
			oGlobalModel,
			oODataModel,
			oResourceModel = new ResourceModel({ // the ResourceModel for this App
				bundleUrl: [$.sap.getModulePath("nw.epm.refapps.purchaseorders.approve"), "i18n/i18n.properties"].join("/")
			}),
			// The class to be tested is a subclass of BaseController. In order to decouple this unit test from
			// the base class the methods inherited from it which are used within the class to be tested are stubbed.
			// mStubsForBaseClass contains these stubs.
			// The stubs are set in fnGetObjectUnderTest.
			mStubsForBaseClass = {
				getApplication: function() {
					return oApplication;
				},
				byId: function(sCId) {
					var oControl = mDeclarativeControls[sCId];
					ok(oControl, "Lookup for control with id '" + sCId + "'");
					return oControl;
				},
				setModel: function(oModel, sName) {
					strictEqual(sName, "viewProperties", "Model name should be 'viewProperties'");
					ok(!oViewPropertiesModel, "Model 'viewProperties' must only be set once");
					oViewPropertiesModel = oModel;
					var oBinding = oModel.bindProperty("/originalBusyDelayList");
					oBinding.attachChange(function() {
						ok(false, "Property 'originalBusyDelayList' must not be changed anymore");
					});
				},
				getOwnerComponent: function() {
					return {
						getComponentData: function() {
							return oComponentData;
						}
					};
				},
				getRouter: function() {
					return oRouter;
				},
				getGlobalModel: function() {
					return oGlobalModel;
				},
				getResourceBundle: function() {
					return oResourceModel.getResourceBundle();
				},
				getModel: function(sName) {
					strictEqual(sName, undefined, "Only default model should be retrieved via getModel");
					return oODataModel;
				}
			};

		function fnGetFilterStub(iExpectedCount) {
			return sinon.stub(oListBinding, "filter", function(aFilters, sFilterType) {
				strictEqual(sFilterType, FilterType.Application, "Filter type must be set correctly");
				ok(Array.isArray(aFilters), "Filters must be provided as array");
				strictEqual(aFilters.length, iExpectedCount, "Array of length " + iExpectedCount + " must be used to filter ");
				for (var i = 0; i < aFilters.length; i++) {
					ok(aFilters[i] instanceof Filter, "A filter must be used to filter");
				}
				// Note: Currently no possibility to look into the filter. Therefore, we cannot test
				// whether the filter is really as expected.
			});
		}

		QUnit.module("S2_PurchaseOrder.controller: create ");

		QUnit.test("Get an instance of S2 controller and verify its inheritance ", function() {
			var oS2Controller = new S2Controller();
			ok(oS2Controller instanceof BaseController,
				"S2 controller should be a subclass of nw.epm.refapps.purchaseorders.approve.controller.BaseController");
			// In the following modules some methods of the base class will be stubbed. This is only justified when we are sure
			// that these methods have not been overridden in the class to be tested.
			// The following checks verify this assumption.
			for (var sFunction in mStubsForBaseClass) {
				//needed for slint
				if ({}.hasOwnProperty.call(mStubsForBaseClass, sFunction)) {
					strictEqual(oS2Controller[sFunction], BaseController.prototype[sFunction], "'" + sFunction + "' must not be overridden");
				}
			}
		});

		function fnCleanUp() {
			oViewPropertiesModel = null;
			oComponentData = null;
			oList.getBinding = null;
			oGlobalModel = null;
			oODataModel = null;
			aListItems = null;
		}

		// mStubsForBaseClass contains the stubs for all methods of the base class we expect to use. In order to be
		// sure that this test has completely decoupled from the base class all other methods of the base class will
		// be set to run onto errors. This function produces a suitable stub for this.
		function fnGetNotToBeCalledFunction(sFunction) {
			return function() {
				ok(false, "Method " + sFunction + " of BaseController must not be called");
			};
		}

		function fnGetObjectUnderTest() {
			var oController = new S2Controller();
			// stub the methods inherited from parent class (either by the stub defined in mStubsForBaseClass or by 
			// a function that must not be called)
			for (var sFunction in BaseController.prototype) {
				if (sFunction !== "constructor" && typeof oController[sFunction] === "function") {
					var fnStub = mStubsForBaseClass[sFunction] || fnGetNotToBeCalledFunction(sFunction);
					sinon.stub(oController, sFunction, fnStub);
				}
			}
			oController.onInit();
			// The list binding is not available during onInit. Therefore, the tests should ensure that onInit
			// does not access the list binding by accident. Thus, the getBinding-method is added to oList only after
			// onInit has been called.
			oList.getBinding = function(sName) {
				strictEqual(sName, "items", "Only items - Binding should be retrieved");
				return oListBinding;
			};
			return oController;
		}

		QUnit.module("S2_PurchaseOrder.controller: init", {
			afterEach: function() {
				// Check whether viewProperties-model has been initialized correctly 
				strictEqual(oViewPropertiesModel.getProperty("/originalBusyDelayList"), oListBusyIndicatordelay,
					"Property 'originalBusyDelayList' must be set correctly");
				strictEqual(oViewPropertiesModel.getProperty("/itemCount"), -1, "Property 'itemCount' must be set correctly");
				fnCleanUp();
			}
		});

		QUnit.test("Get an instance of S2 controller and initialize it", function() {
			fnGetObjectUnderTest();
			ok(oViewPropertiesModel instanceof JSONModel, "'viewProperties' model should be a JSON model");
		});

		QUnit.test("Get an instance of S2 controller and initialize it with given Component Data", function() {
			oComponentData = {
				startupParameters: {
					Product: ["foo"]
				}
			};
			var oSearchFieldStub = sinon.stub(oSearchField, "setValue"),
				fnRouterEvent = null,
				oRouterStub = sinon.stub(oRouter, "attachEventOnce", function(sEvent, fnHandler) {
					strictEqual(sEvent, "routePatternMatched", "Only 'routePatternMatched' event of router should be used");
					ok(!fnRouterEvent, "Router event should only be attached once");
					fnRouterEvent = fnHandler;
				});
			fnGetObjectUnderTest();
			ok(oSearchFieldStub.calledOnce, "Value for search field must have been set");
			ok(oSearchFieldStub.calledWithExactly("foo"), "Product id must be filled into the search field");
			oSearchFieldStub.restore();
			oRouterStub.restore();
			// Now check whether the method attached at routePatternMatched is as expected
			var oListBindingFilterStub = fnGetFilterStub(1);
			fnRouterEvent();
			ok(oListBindingFilterStub.calledOnce, "Filter for list binding must have been set once");
			oListBindingFilterStub.restore();
		});

		var oPullToRefreshHideStub;

		QUnit.module("S2_PurchaseOrder.controller: onUpdateFinished", {
			beforeEach: function() {
				oGlobalModel = new JSONModel({
					preferredIds: []
				});
				oPullToRefreshHideStub = sinon.stub(oPullToRefresh, "hide");
			},
			afterEach: function() {
				deepEqual(oGlobalModel.getProperty("/preferredIds"), [], "Preferred Ids must have been reset after list update");
				fnCleanUp();
				ok(oPullToRefreshHideStub.calledOnce, "Hide must have been called on PullToRefresh");
				oPullToRefreshHideStub.restore();
				oPullToRefreshHideStub = null;
			}
		});

		QUnit.test("Get an initialized instance of S2 controller and call onUpdateFinished for an empty list", function() {
			var oController = fnGetObjectUnderTest(),
				oShowEmptyViewStub = sinon.stub(oApplication, "showEmptyView");
			oController.onUpdateFinished();
			ok(oShowEmptyViewStub.calledOnce, "showEmptyView should be called after list update");
			ok(oShowEmptyViewStub.calledWithExactly("noObjects"), "empty view must be called with correct parameters ");
			oShowEmptyViewStub.restore();
		});

		function fnGetListItemStub(sPOId, bSelected) {
			return {
				getBindingContext: function() {
					return {
						getProperty: function(sName) {
							strictEqual(sName, "POId", "Only property 'POId' should be retrieved from the items binding context");
							return sPOId;
						}
					};
				},
				getBindingContextPath: function() {
					return "path:" + sPOId;
				},
				setSelected: function(bSelectedPar) {
					ok(!oGlobalModel.getProperty("/isMultiSelect"), "setSelected must not be called in multi select mode");
					strictEqual(bSelectedPar, bSelected, "Item was selected as expected");
				},
				getSelected: function() {
					ok(oGlobalModel.getProperty("/isMultiSelect"), "getSelected must only be called in multi select mode");
					return bSelected;
				}
			};
		}

		function fnGetTargetDisplayStub() {
			return sinon.stub(oTargets, "display", function(aTarget) {
				deepEqual(aTarget, ["object", "master"], "object view to be displayed");
			});
		}

		function fnGetNavToStub(sId) {
			return sinon.stub(oRouter, "navTo", function(sRoute, mParameters, bReplace) {
				strictEqual(sRoute, "PurchaseOrderDetails", "Only route 'PurchaseOrderDetails' allowed here ");
				deepEqual(mParameters, {
					POId: encodeURIComponent(sId)
				}, "Parameters must be set correctlyfor the navigation");
				strictEqual(bReplace, !Device.system.phone, "New history entry only on phone");
			});
		}

		QUnit.test("Get an initialized instance of S2 controller and call onUpdateFinished for a list with several items", function() {
			var oController = fnGetObjectUnderTest(),
				oDisplayStub = fnGetTargetDisplayStub(),
				sId1 = "foo/&/%:",
				oNavToStub = fnGetNavToStub(sId1);
			aListItems = [fnGetListItemStub(sId1, true), fnGetListItemStub("/" + sId1, false), fnGetListItemStub(sId1 + "/", false)];
			var oSelectedSpy = sinon.spy(aListItems[0], "setSelected");
			oController.onUpdateFinished();
			ok(oSelectedSpy.calledOnce, "first list item must have been selected");
			ok(oDisplayStub.calledOnce, "ensure that display of object view was triggered");
			oDisplayStub.restore();
			ok(oNavToStub.calledOnce, "ensure that navigation was triggered");
			oNavToStub.restore();
		});

		QUnit.test("Get an initialized instance of S2 controller and call onUpdateFinished for a list with several items one of them predefined",
			function() {
				// Note: In this case onUpdateFinshed is not expected to do anything, since the router will take over
				var oController = fnGetObjectUnderTest(),
					sId1 = "foo/&/%:",
					sId2 = "/" + sId1,
					sId3 = sId1 + "/";
				aListItems = [fnGetListItemStub(sId1, false), fnGetListItemStub(sId2, false), fnGetListItemStub(sId3, false)];
				oGlobalModel
					.setProperty("/currentPOId", sId1);
				oController.onUpdateFinished();
			});

		QUnit.test(
			"Get an initialized instance of S2 controller and call onUpdateFinished for a list with several items and given preferred ones",
			function() {
				var oController = fnGetObjectUnderTest(),
					oDisplayStub = sinon.stub(oTargets, "display", function(aTarget) {
						deepEqual(aTarget, ["object", "master"], "object view to be displayed");
					}),
					sId1 = "foo/&/%:",
					sId2 = "/" + sId1,
					sId3 = sId1 + "/",
					oNavToStub = fnGetNavToStub(sId2);
				aListItems = [fnGetListItemStub(sId1, false), fnGetListItemStub(sId2, true), fnGetListItemStub(sId3, false)];
				oGlobalModel.setProperty("/preferredIds", [sId2 + "$", sId2, sId1, sId3, sId2 + "!"]);
				var oSelectedSpy = sinon.spy(aListItems[1], "setSelected");
				oController.onUpdateFinished();
				ok(oSelectedSpy.calledOnce, "preferred list item must have been selected");
				ok(oDisplayStub.calledOnce, "ensure that display of object view was triggered");
				oDisplayStub.restore();
				ok(oNavToStub.calledOnce, "ensure that navigation was triggered");
				oNavToStub.restore();
			});

		QUnit.test(
			"Get an initialized instance of S2 controller and call onUpdateFinished for a list with several items and given preferred ones (not matching)",
			function() {
				var oController = fnGetObjectUnderTest(),
					oDisplayStub = sinon.stub(oTargets, "display", function(aTarget) {
						deepEqual(aTarget, ["object", "master"], "object view to be displayed");
					}),
					sId1 = "foo/&/%:",
					sId2 = "/" + sId1,
					sId3 = sId1 + "/",
					oNavToStub = fnGetNavToStub(sId1);
				aListItems = [fnGetListItemStub(sId1, true), fnGetListItemStub(sId2, false), fnGetListItemStub(sId3, false)];
				oGlobalModel.setProperty("/preferredIds", [sId1 + "$", sId2 + "$", "$" + sId3]);
				var oSelectedSpy = sinon.spy(aListItems[0], "setSelected");
				oController.onUpdateFinished();
				ok(oSelectedSpy.calledOnce, "first list item must have been selected");
				ok(oDisplayStub.calledOnce, "ensure that display of object view was triggered");
				oDisplayStub.restore();
				ok(oNavToStub.calledOnce, "ensure that navigation was triggered");
				oNavToStub.restore();
			});

		QUnit.module("S2_PurchaseOrder.controller: onSearch", {
			afterEach: fnCleanUp
		});

		var bRefreshButtonPressed,
			sQuery,
			oEvent = {
				getParameters: function() {
					return {
						refreshButtonPressed: bRefreshButtonPressed
					};
				},
				getParameter: function(sParam) {
					strictEqual(sParam, "query", "Only parameter 'query' might be retrieved");
					return sQuery;
				}
			};

		QUnit.test(
			"Get an initialized instance of S2 controller and call onSearch as refresh",
			function() {
				bRefreshButtonPressed = true;
				var oController = fnGetObjectUnderTest(),
					oRefreshStub = sinon.stub(oController, "onRefresh");
				oController.onSearch(oEvent);
				ok(oRefreshStub.calledOnce, "onRefresh must have been called");
			});

		QUnit.test(
			"Get an initialized instance of S2 controller and call onSearch as search",
			function() {
				bRefreshButtonPressed = false;
				sQuery = "abc";
				var oController = fnGetObjectUnderTest(),
					oFilterStub = fnGetFilterStub(1),
					oWhenMetadataFinishedStub = sinon.stub(oApplication, "whenMetadataIsFinished");
				oController.onSearch(oEvent);
				ok(oWhenMetadataFinishedStub.calledAfter(oFilterStub), "Potential refresh of metadata must be called after binding has been reset");
				oFilterStub.restore();
				oWhenMetadataFinishedStub.restore();
			});

		QUnit.test(
			"Get an initialized instance of S2 controller and call onSearch as search with empty search string",
			function() {
				bRefreshButtonPressed = false;
				sQuery = "";
				var oController = fnGetObjectUnderTest(),
					oFilterStub = fnGetFilterStub(0),
					oWhenMetadataFinishedStub = sinon.stub(oApplication, "whenMetadataIsFinished");
				oController.onSearch(oEvent);
				ok(oWhenMetadataFinishedStub.calledAfter(oFilterStub), "Potential refresh of metadata must be called after binding has been reset");
				oFilterStub.restore();
				oWhenMetadataFinishedStub.restore();
			});

		QUnit.module("S2_PurchaseOrder.controller: onRefresh", {
			afterEach: fnCleanUp
		});

		QUnit.test(
			"Get an initialized instance of S2 controller and call onRefresh",
			function() {
				var oController = fnGetObjectUnderTest(),
					oCallback = {},
					oWhenMetadataFinishedStub = sinon.stub(oApplication, "whenMetadataIsFinished", function(fnCallback) {
						oCallback.callback = fnCallback;
					});
				oController.onRefresh();
				oWhenMetadataFinishedStub.restore();
				// Check what happens if metadata are loaded successfully
				var oRefreshStub = sinon.stub(oListBinding, "refresh");
				oCallback.callback(true);
				ok(oRefreshStub.calledOnce, "List refresh must be called");
				oRefreshStub.restore();
				// Check what happens if metadata are not loaded successfully
				oPullToRefreshHideStub = sinon.stub(oPullToRefresh, "hide");
				oCallback.callback(false);
				ok(oPullToRefreshHideStub.calledOnce, "Hide must have been called on PullToRefresh");
				oPullToRefreshHideStub.restore();
				oPullToRefreshHideStub = null;
			});

		function fnTestOnSelect(bItemAsParameter) {
			QUnit.module("S2_PurchaseOrder.controller: onSelect (" + (bItemAsParameter ? "list item from event parameter)" :
				"list item from event source)"), {
				beforeEach: function() {
					oGlobalModel = new JSONModel({
						isMultiSelect: false
					});
				},
				afterEach: fnCleanUp
			});

			var oListItem,
				oListEvent = {
					getParameter: function(sParam) {
						strictEqual(sParam, "listItem", "Only parameter 'listItem' might be retrieved");
						return bItemAsParameter && oListItem;
					},
					getSource: function() {
						return bItemAsParameter ? {} : oListItem;
					}
				};
			QUnit.test(
				"Get an initialized instance of S2 controller and call onSelect on an item",
				function() {
					var oController = fnGetObjectUnderTest(),
						oDisplayStub = fnGetTargetDisplayStub(),
						sId = "$§'",
						oNavToStub = fnGetNavToStub(sId);
					oListItem = fnGetListItemStub(sId, true);
					var oSetSelectedSpy = sinon.spy(oListItem, "setSelected");
					oController.onSelect(oListEvent);
					ok(oSetSelectedSpy.calledOnce, "list item must be set selected");
					ok(oDisplayStub.calledOnce, "Target must be set");
					ok(oNavToStub.calledOnce, "Navigation must be triggered");
					oDisplayStub.restore();
					oNavToStub.restore();
				});

			QUnit.test(
				"Get an initialized instance of S2 controller, set to multiselect and call onSelect on an item while being busy with approving",
				function() {
					var oController = fnGetObjectUnderTest();
					oListItem = {}; // in this state no methods should be called on the list item, since the event should just be ignored
					oGlobalModel.setProperty("/isMultiSelect", true);
					oGlobalModel.setProperty("/isBusyApproving", true);
					oController.onSelect(oListEvent);
				});

			var fnTestMultiSelect = function(iCount, iAtPosition) {
				var oController = fnGetObjectUnderTest(),
					sId = "$§'",
					aSelectedPurchaseOrders = [],
					aExpectedPurchaseOrders = [],
					bAlreadySelected = false,
					oPurchaseOrder = {
						POId: sId
					};

				for (var i = 0; i < iCount; i++) {
					var oAdd;
					if (i === iAtPosition) {
						oAdd = oPurchaseOrder;
						bAlreadySelected = true;
					} else {
						oAdd = {
							POId: i
						};
						aExpectedPurchaseOrders.push(oAdd);
					}
					aSelectedPurchaseOrders.push(oAdd);
				}
				if (!bAlreadySelected) {
					aExpectedPurchaseOrders.push(oPurchaseOrder);
				}
				oListItem = fnGetListItemStub(sId, !bAlreadySelected);
				oGlobalModel.setProperty("/isMultiSelect", true);
				oGlobalModel.setProperty("/selectedPurchaseOrders", aSelectedPurchaseOrders);
				oODataModel = {
					getObject: function(sPath) {
						strictEqual(sPath, "path:" + sId, "only path for given id must be retrieved");
						return oPurchaseOrder;
					}
				};
				oController.onSelect(oListEvent);
				strictEqual(aSelectedPurchaseOrders.length, iCount, "Property must not be changed by manipulating the array");
				deepEqual(oGlobalModel.getProperty("/selectedPurchaseOrders"), aExpectedPurchaseOrders,
					"Selected Purchase Orders must have been adapted");
			};

			QUnit.test(
				"Get an initialized instance of S2 controller, set to multiselect and call onSelect on an (now selected) item",
				fnTestMultiSelect.bind(undefined, 0, -1));

			QUnit.test(
				"Get an initialized instance of S2 controller, set to multiselect with some items selected and call onSelect on an (now selected) item",
				fnTestMultiSelect.bind(undefined, 2, -1));

			QUnit.test(
				"Get an initialized instance of S2 controller, set to multiselect with some items selected and call onSelect on an (now unselected) item",
				fnTestMultiSelect.bind(undefined, 5, 2));

		}
		fnTestOnSelect(true);
		fnTestOnSelect(false);

	});