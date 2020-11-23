sap.ui.define(["sap/ui/core/format/NumberFormat",
        "sap/ui/core/format/DateFormat"
    ], function(NumberFormat, DateFormat) {
	"use strict";

	return {
		// formatter for the title of the master list. iCount is the number of entries. It is negative when the number has not yet been determined.
		listTitle: function(iCount) {
			var oBundle = this.getResourceBundle();
			return (iCount < 0) ? oBundle.getText("masterTitle") : oBundle.getText("masterTitleCount", [iCount]);
		},

		minus: function(sInput){
		 return (sInput && sInput.substring(0, 1) !== "0") ? "-" + sInput : "";
		},

		// formatter used in the master list to display how many items are available for each PO
		items: function(iItems) {
			if (isNaN(iItems)) {
				return "";
			}
			var oBundle = this.getResourceBundle();
			return (iItems === 1) ? oBundle.getText("xfld.item") : oBundle.getText("xfld.items", [iItems]);
		},

		// Provide the title for the AddBookmark button
		titleForTile: function(sPOId) {
			var oBundle = this.getResourceBundle();
			return oBundle.getText("xtit.tileTitle", [sPOId]);
		},

		summaryPageTitle: function(aPurchaseOrders) {
			var oBundle = this.getResourceBundle();
			return oBundle.getText("xtit.summaryTitle", [aPurchaseOrders.length]);
		},

		// Provide the title of the table of items on the detail page. Note that iCount is negative while the list of items is retrieved from the backend.
		itemListTitle: function(iCount) {
			var oBundle = this.getResourceBundle();
			return iCount < 0 ? oBundle.getText("xtit.itemListTitle") : oBundle.getText("xtit.itemListTitleCount", [iCount]);
		}
	};
});