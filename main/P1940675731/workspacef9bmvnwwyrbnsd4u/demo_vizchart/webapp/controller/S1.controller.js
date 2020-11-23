sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.vizchart.controller.S1", {
		onInit:function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.attachRoutePatternMatched(this._handleRouteMatched, this);

		},
		_handleRouteMatched:function(){
			var Bar = this.getView().byId("vizBar");
			var dataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					axis: 1,
					name: "country",
					value: "{country}"
				}],
				measures: [{

					name: 'population',
					value: "{population}"

				}],
				data: {
					path: "/value"
				}

			});
			Bar.setDataset(dataset);

		

		}

	});

});