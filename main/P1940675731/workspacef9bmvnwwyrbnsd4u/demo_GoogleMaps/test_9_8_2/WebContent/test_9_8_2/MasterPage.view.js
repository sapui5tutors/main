sap.ui.jsview("test_9_8_2.MasterPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf test_9_8_2.MasterPage
	*/ 
	getControllerName : function() {
		return "test_9_8_2.MasterPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf test_9_8_2.MasterPage
	*/ 
	createContent : function(oController) {
		
		var list = new sap.m.List("list",{
			
			
			
			  items:{
				  path:"/Product",
					  template: new sap.m.ObjectListItem({
						  
		 				  title:"{Product Name}",
		 				  number:"{Price}",
		 				  intro:"{Plant}",
		 				  icon:"{image}",
		 				  type : "Active",
				
								  
		attributes: [
		            {
			text:"{Product ID}"
		            },
		            {
		   	text:"{value}"
		            }
		],
		
		
		
		firstStatus: {
		
			text:"{Status}"
		             },
		             press: function(evt)
					  {
		            	 debugger
		            	 var icon = evt.oSource.mProperties.icon; 
		            	 sap.ui.getCore().byId("i").setSrc(icon);
		            	 
		            	 var title = evt.oSource.mProperties.title; 
		            	 sap.ui.getCore().byId("i1").setValue(title);
		            	 
		            	 var intro = evt.oSource.mProperties.intro; 
		            	 sap.ui.getCore().byId("i2").setValue(intro);
		            	 
		            	 var number = evt.oSource.mProperties.number; 
		            	 sap.ui.getCore().byId("i3").setValue(number);
		            	 
		            	 var type = evt.oSource.mProperties.type; 
		            	 sap.ui.getCore().byId("i4").setValue(type);
		            	 
					
					  }
					  
					 
					  })
		 }
		
		
		});
		
 		return new sap.m.Page({
			title: "Master Page",
			subHeader: 
				new sap.m.Bar({
					contentMiddle: [
			new sap.m.SearchField( "searchField", {
				placeholder: "Search",
				showMagnifier: false,
				showRefreshButton: true,
				search: oController.onSearch1,
				liveChange: oController.onSearch,
				width: "100%",
				tooltip: "Search for objects..",
				refreshButtonTooltip: "Refresh"
			})
		]
                              }),   
			content: [
list
			]
		});
	}

});