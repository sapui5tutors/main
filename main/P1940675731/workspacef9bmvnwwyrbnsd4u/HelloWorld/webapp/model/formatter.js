sap.ui.define([], function() {
	"use strict";

	return {
		delivery: function(sMeasure, iWeight) {
			
			var	sResult = "";

			if(sMeasure === "G") {
				iWeight = iWeight / 1000;
			}
			if (iWeight < 0.5) {
				sResult = "weight less than .5 KG";
			} else if (iWeight < 5) {
				sResult = "weight less than 5 KG";
			} else {
				sResult = "weight more than 5 KG";
			}

			return sResult;
		}
	};
});
