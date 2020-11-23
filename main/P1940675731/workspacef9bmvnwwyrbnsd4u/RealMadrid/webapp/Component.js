sap.ui.define([
	"sap/ui/core/UIComponent"
	],function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("RealMadrid.Component", {

		metadata : {
			rootView : "RealMadrid.Page1",
			dependencies : {
				libs : [
					"sap.m",
					"sap.tnt"
				]
			},
			config : {
				sample : {
					stretch: true,
					files : [
						"Page1.view.xml", "Page1.controller.js"
					]
				}
			}
		}
	});

	return Component;

});