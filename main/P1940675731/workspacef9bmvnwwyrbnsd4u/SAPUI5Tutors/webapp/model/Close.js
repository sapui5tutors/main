sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		// close: function() {
			
		// 	if (navigator.onLine == false) {
		// 		setTimeout(function() {
		// 				sap.m.MessageToast.show("The app runs online, Please use a stable Internet Connection. Thank You! ", {
		// 					duration: 5000,
		// 					width: "20em"
		// 				});
		// 			},
		// 			150);

		// 		setTimeout(function() {
		// 				window.close();
		// 			},
		// 			5000);

		// 	}
		// 		}
close: function () {
    var xhr = new XMLHttpRequest();
    var file = "https://www.kirupa.com/blank.png";
    var randomNum = Math.round(Math.random() * 10000);
 
    xhr.open('HEAD', file + "?rand=" + randomNum, true);
    xhr.send();
     
    xhr.addEventListener("readystatechange", processRequest, false);
 
    function processRequest(e) {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 304) {
        } else {
        	setTimeout(function() {
						sap.m.MessageToast.show("The app runs online, Please use a stable Internet Connection. Thank You! ", {
							duration: 5000,
							width: "20em"
						});
					},
					150);
					setTimeout(function() {
							navigator.app.exitApp();
					},
					5000);
					
        }
      }
    }
}
		
	

	};

});