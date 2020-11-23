sap.ui.localResources('control');
jQuery.sap.require("control.SpeechRecognitionInputControl");
sap.ui.controller("custom.controls.demo.controller.CustomControlView", {
  onButtonPress: function(evt){
  var x = new custom.controls.demo.control.SpeechRecognitionInputControl(); 
  var oLayout = this.getView().byId("thisPage");
     oLayout.addContent(x);
  }
});