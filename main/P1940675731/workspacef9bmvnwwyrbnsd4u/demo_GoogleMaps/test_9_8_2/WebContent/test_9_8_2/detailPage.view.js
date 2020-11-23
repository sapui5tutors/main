sap.ui.jsview("test_9_8_2.detailPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf test_9_8_2.detailPage
	*/ 
	getControllerName : function() {
		return "test_9_8_2.detailPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf test_9_8_2.detailPage
	*/ 
	createContent : function(oController) {
		
		
		var form = new sap.ui.layout.form.SimpleForm("form1",{
			
			maxContainerCols: 2,
			layout:"ResponsiveGridLayout",
			
			content:[
	new sap.m.Image("i",{
	width : "10%",
	height : "10%"
	
}),
		new sap.m.Label("l1",{
			text:"Product Name"
		}),
		new sap.m.Input("i1",{
			maxLength:20,
			width:"30%",
			editable:false,
			
		}),
		new sap.m.Label("l2",{
			text:"Plant Name"
		}),
		new sap.m.Input("i2",{
			maxLength:20,
			width:"30%",	
			
		}),
		new sap.m.Label("l3",{
			text:"Price"
		}),
		new sap.m.Input("i3",{
			maxLength:20,
			width:"30%",
			
		}),
		new sap.m.Label("l4",{
			text:"Status"
		}),
		new sap.m.Input("i4",{
			maxLength:20,
			width:"30%",
			
		})
		]
		})
		
 		return new sap.m.Page({
			title: "Detailed Information",
			content: [
			
form
			    
			          
			]
		});
	}

});