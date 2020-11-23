sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.vizframe.controller.S1", {
		onInit:function(){
			
			//			1.Get the id of the VizFrame		
			var oVizFrame = this.getView().byId("idcolumn");
			
			//			2.Create a JSON Model and set the data
			var oModel = new sap.ui.model.json.JSONModel();
			var data = {
					'Cars' : [
					          {"Model": "Alto","Value": "758620"},
					          {"Model": "Zen","Value": "431160"},
					          {"Model": "Santro","Value": "515100"},
					          {"Model": "Matiz","Value": "293780"},
					          {"Model": "Wagan R","Value": "974010"},
					          ]};
			oModel.setData(data);

//			3. Create Viz dataset to feed to the data to the graph
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions : [{
					name : 'Model',
					value : "{Model}"}],

					measures : [{
						name : 'Cars Bought',
						value : '{Value}'} ],

						data : {
							path : "/Cars"
						}
			});		
			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(oModel);	
			oVizFrame.setVizType('bar');

//			4.Set Viz properties
			oVizFrame.setVizProperties({
				plotArea: {
					colorPalette : d3.scale.category20().range()
				}});

			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "valueAxis",
				'type': "Measure",
				'values': ["Cars Bought"]
			}), 
			feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "categoryAxis",
				'type': "Dimension",
				'values': ["Model"]
			});
			oVizFrame.addFeed(feedValueAxis);
			oVizFrame.addFeed(feedCategoryAxis);
}


		

	});

});