sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Custom.controller.View1", {
		onSelectionChange: function(oControlEvent) {
     // get selected item
          var oItem = oControlEvent.getParameter("selectedItem");
         
          // check if the add value option is enabled and if the key is the ‘add option’ key
          if (this.getAddValueEnabled() && oItem.getKey() === this.ADD_OPTION_KEY) {
                this._createNewOptionDialog();
     }
        
     // execute standard control method
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
          var oInput = sap.ui.getCore().byId('idNewValueInput');
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
}
	});
});