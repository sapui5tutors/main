sap.ui.define([
               "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";
  return Controller.extend("vikalp.cus.sd.dealer.plus.controller.App", {
    onOpenDialog : function () {
      this.getOwnerComponent().Dialog.open(this.getView());
    }
  });
});