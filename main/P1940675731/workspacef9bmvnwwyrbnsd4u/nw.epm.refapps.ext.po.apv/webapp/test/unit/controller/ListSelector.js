sap.ui.require(
	[
		"nw/epm/refapps/purchaseorders/approve/controller/ListSelector",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	],
	function(ListSelector) {
		"use strict";

		QUnit.module("ListSelector: setBoundMasterList", {
			beforeEach: function() {
				sinon.config.useFakeTimers = false;
				this.oListSelector = new ListSelector();
			},
			afterEach: function() {
				this.oListSelector.destroy();
			}
		});

		QUnit.test("Should attach to the list events 'updateStarted', 'updateFinished'", function(assert) {
			// Arrange
			var done = assert.async(),
				oListStub = {
					attachUpdateStarted: this.spy(),
					attachUpdateFinished: this.spy()
				};

			// Act
			this.oListSelector.setBoundMasterList(oListStub);

			// Assert
			setTimeout(function() {
				assert.strictEqual(oListStub.attachUpdateStarted.callCount, 1, "Attach to the event 'updateStarted' of the list");
				assert.strictEqual(oListStub.attachUpdateFinished.callCount, 1, "Attach to the event 'updateFinished' of the list");
				done();
			}, 0);
		});

		QUnit.module("ListSelector: selectAListItem", {
			beforeEach: function() {
				sinon.config.useFakeTimers = false;
				this.oListSelector = new ListSelector();
				this.oListSelector._oWhenListLoadingIsDone = {
					then: function(fnAct) {
						this.fnAct = fnAct;
					}.bind(this)
				};
			}
		});

		function createListStub(bWithList) {
			var fnAttachUpdateStarted = function(fnUpdateStartedCallback) {
					fnUpdateStartedCallback();
				},
				fnAttachUpdateFinished = function(fnUpdateFiniishedCallback) {
					fnUpdateFiniishedCallback();
				};

			return {
				attachUpdateStarted: fnAttachUpdateStarted,
				attachUpdateFinished: fnAttachUpdateFinished
			};
		}
		
		function createStubbedListItem(sBindingPath) {
			return {
				getBindingContext: this.stub().returns({
					getPath: this.stub().returns(sBindingPath)
				})
			};
		}

		QUnit.test("Should select an Item of the list when it is loaded and the binding contexts match", function(assert) {
			// Arrange
			var sBindingPath = "anything",
				oListItemToSelect = createStubbedListItem.call(this, sBindingPath),
				oSelectedListItemStub = createStubbedListItem.call(this, "a different binding path");

			var oList = {
				getMode: this.stub().returns("SingleSelectMaster"),
				getSelectedItem: this.stub().returns(oSelectedListItemStub),
				getItems: this.stub().returns([oSelectedListItemStub, oListItemToSelect, createListStub.call(this, "yet another list binding")]),
				setSelectedItem: function(oItem) {
					//Assert
					assert.strictEqual(oItem, oListItemToSelect, "Did select the list item with a matching binding context");
				}
			};

			// Act
			this.oListSelector.selectAListItem(sBindingPath);
			// Resolve list loading
			this.fnAct(oList);
		});

		QUnit.test("Should not select an Item of the list when it is already selected", function(assert) {
			// Arrange
			var sBindingPath = "anything",
				oSelectedListItemStub = createStubbedListItem.call(this, sBindingPath);

			var oList = {
				getMode: this.stub().returns("SingleSelectMaster"),
				getSelectedItem: this.stub().returns(oSelectedListItemStub)
			};

			// Act
			this.oListSelector.selectAListItem(sBindingPath);
			// Resolve list loading
			this.fnAct(oList);

			// Assert
			assert.ok(true, "did not fail");
		});

		QUnit.test("Should not select an item of the list when the list has the selection mode none", function(assert) {
			// Arrange
			var sBindingPath = "anything";

			var _oList = {
				getMode: this.stub().returns("None")
			};

			// Act
			this.oListSelector.selectAListItem(sBindingPath);
			// Resolve list loading
			this.fnAct(_oList);

			// Assert
			assert.ok(true, "did not fail");
		});
	}

);