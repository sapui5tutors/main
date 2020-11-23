jQuery.sap.declare("Custom.control.Select");
jQuery.sap.require("sap.m.Select");
jQuery.sap.require("sap.m.SelectRenderer");

sap.m.Select.extend("Custom.control.Select", {

      metadata: {
		properties: {
			"addValueEnabled": { 
				type: "boolean", 
				defaultValue: true 
			}
		},
		events: {
			"newValueCreated": {}
		}
	},
	
	ADD_OPTION_KEY: "__addNewValue",
	ADD_OPTION_TEXT: "Add...",
	
	init: function() {
	// define variable for control initial loading handling
		this._bInitialLoading = true;
	// call to parent control method
		sap.m.Select.prototype.init.apply(this, arguments);
	},
	
	onBeforeRendering: function() {
		if (this.getAddValueEnabled()) {

	// check if "add..." option does not exist yet. if so, create it
			if (!this.getItemByKey(this.ADD_OPTION_KEY)) {
				// create add value item and add it to select
				var oItem = new sap.ui.core.Item({
					key: this.ADD_OPTION_KEY,
					text: this.ADD_OPTION_TEXT
				});
				this.insertItem(oItem, 0);
			}

	// if control is on initial loading, set item index if there is more than one option
			if (this._bInitialLoading && this.getItems().length > 1) { 
				this.setSelectedItem(this.getItems()[1]);

	// further verifications are not necessary as it will be always new options' creation
				this._bInitialLoading = false;
			}
		}
		
		sap.m.Select.prototype.onBeforeRendering.apply(this, arguments);
	},
	
	/** 
	 * Extension of parent's event.
	 */
	onSelectionChange: function(oControlEvent) {
	// get selected item 
		var oItem = oControlEvent.getParameter("selectedItem");
		
	// check if the add value option is enabled and if the key is the 'add option' key
		if (this.getAddValueEnabled() && oItem.getKey() === this.ADD_OPTION_KEY) {
			this._createNewOptionDialog();
		} 
		
		sap.m.Select.prototype.onSelectionChange.apply(this, arguments);
	},
	
	_createNewOptionDialog: function() {
	// create dialog with input field
		var that = this;
		var oDialog = new sap.m.Dialog({
			title: 'Add value',
			content: new sap.m.Input({
				id: 'idNewValueInput'
			}),
			beginButton: new sap.m.Button({
				text: 'Add',
				press: function() {
					that._handleNewOption();
					oDialog.close();
				}
			}),
			afterClose: function() {
				oDialog.destroy();
			}
		});

		oDialog.open();
	},
	
	_handleNewOption: function() {
	// get new option value
		var oInput = sap.ui.getCore().byId("idNewValueInput");
		var sNewValue = oInput.getValue();
		
	// create new item to be added in select
		var oItem = new sap.ui.core.Item({
			key: sNewValue,
			text: sNewValue
		});
		
	// add item to select and set it as selected
		this.addItem(oItem);
		this.setSelectedItem(oItem);
				
	// fire an event in case the parent object needs to handle this
		this.fireNewValueCreated({
			value: sNewValue
		});
	},
	
	destroy: function() {
		sap.m.Select.prototype.destroy.apply(this, arguments);
	},

	renderer: "sap.m.SelectRenderer"

});