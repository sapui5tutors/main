//sap.ui.localResources('control');
//jQuery.sap.require("sap.st.Gauge.control.gauge");
//jQuery.sap.require("sap.st.Gauge.control.MiniGauge");
sap.ui.controller("sap.st.Gauge.controller.S2", {
	 onButtonPress: function(evt){
		  var x = new sap.st.Gauge.control.MiniGauge("idGauge",{
//			  		size: "500",
//				    radius : "100",
//				    cx : "100",
//				    cy : "100",
//				    min : "0",
//				    max : "100",
//				    range : "100",
//				    majorTicks : "5",
//				    minorTicks : "5",
//				    greenColor : "#109618",
//				    yellowColor : "#FF9900",
//				    redColor : "#DC3912",
//				    transitionDuration : "500"
		  });
		  var button = this.getView().byId("__button0").setVisible(false);
//		  var oLayout = this.getView().byId("thisPage");
////		      oLayout.addContent(x);
////		      x.placeAt(oLayout);
		  }

});
