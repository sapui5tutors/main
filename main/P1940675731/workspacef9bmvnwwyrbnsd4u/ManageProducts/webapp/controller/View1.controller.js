sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.ManageProducts.controller.View1", {
onPress:function(e){
	         //var path = e.getParameter('listItem').getBindingContext().sPath;
	         var tbl = this.getView().byId("idTable");
	       //  var idx = tbl.getSelectedIndex();
	       var idx1 = e.getSource().getBindingContext('RFQDetails').getPath();
	       var idx = idx1.split("/")[1];
        if (idx !== -1) {
          var m = this.getView().getModel("RFQDetails");
          var oProduct = m.getProperty(idx1).items;
          var data = m.getData();
          var removed = data.splice(idx, 1);
          m.setData(data);
          sap.m.MessageToast.show("Product "+oProduct+" has been Deleted");
        }
         //var obj = oTable.getModel().getProperty(path);
         //oTable.getModel().getData().splice(parseInt(path.substring(1)), 1);
         //oTable.removeItem(e.getParameter('listItem'));
}
	});

});