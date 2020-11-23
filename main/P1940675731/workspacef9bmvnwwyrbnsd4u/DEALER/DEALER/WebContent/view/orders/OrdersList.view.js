sap.ui.jsview("com.vikalp.dealermgmt.view.orders.OrdersList", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.orders.OrdersList
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.orders.OrdersList";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.orders.OrdersList
	*/ 
	createContent : function(oController) {

		var salesOrderList = new sap.m.List("salesOrderList",{
//			mode: sap.m.ListMode.SingleSelect,
			inset: false,
			
			
			
			
			
			
			
//			
//			headerToolbar:new sap.m.Toolbar("customerToolbar",{
//				content:[new sap.m.Label("customerButton",{design: sap.m.LabelDesign.Bold,textAlign: sap.ui.core.TextAlign.Center,  width:"100%"}),
////				.addStyleClass("dealerButton"),
//				         new sap.m.ToolbarSpacer({}),
//				         new sap.m.Button({icon:"sap-icon://customer", iconFirst:false,press:oController.onToolbarClicks})]
//				}),		
//			
			
			
			
			updateFinished : function(oEvent){   
				
//		          var firstItem = sap.ui.getCore().byId("orderList").getItems()[0];
//		          console.log("firstItem",firstItem);
//		          sap.ui.getCore().byId("orderList").setSelectedItem(firstItem,true);  
//		          
		          oEvent.getSource().getItems()[0].setSelected(true);
			}
		});
		
		
		debugger;

		oDataModel.read("/SalesOrderListUserInfoSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){
			console.log("error",oError);});
			
	var salesOrderListItem = new sap.m.ObjectListItem("salesOrderListItem",{
			
			title : " SO: {SalesOrder}",
			number:"{OrderValue}",
//			intro : "{SalesOrder}",
			numberUnit:"{Currency}",
			attributes:[
			            {
                          text:"PO {PurchOrd}"				
		             	},
		             	{
		             		text:{
		             			path:"OrderDate",
		             			formatter: com.vikalp.dealermgmt.util.Formatter.OrderDate
		             		}
		             	},
			            {
			            	text :"{CustomerName}"
			            },
			           
			            
			            
			            ],
			            secondStatus:[
                           {
	text : "{DocStatus}",
	 state:{
    	 
        	path:"DocStatus",
        	formatter: function(id){
             
              			if(id == "Shipped")
              			{
              			return "Success"
              			}
              		if(id  == "Not Shipped")
              			{
              			return "Error"
              			}
              		if(id =="In Process")
              			{
              			return "Warning"
              			}
              		}
              		} }
			                          ], 
			type:"Active",
     press : oController.onItemClick
		});
	  salesOrderList.addEventDelegate({
    	  onBeforeRendering: function() {
    		  
    	    // check if nothing is selected
    	    if (this.getSelectedItem() === null) {
    	      var items = this.getItems();

    	      // check if there are items
    	      if (items && loginResult.results.length > 0) {
//    	    	  sap.ui.getCore().byId("orderList").setSelectedItem(loginResult.results[0],true); 
    	        this.setSelectedItem(loginResult.results[0], true);
//    	        x = loginResult.results[0].SalesOrder;
//    	        console.log("sales",x);
    	       
    	      }
    	    }
    	  }
    	},salesOrderList );
			
		
		
     var salesOrderListJson = new sap.ui.model.json.JSONModel();
     salesOrderListJson.setData({data:loginResult.results});
		
//		console.log("salesOrderListJson",salesOrderListJson);
			
		salesOrderList.setModel(salesOrderListJson);
			
	salesOrderList.bindAggregation("items","/data",salesOrderListItem);
		
		
		return new sap.m.Page({
//			title: "All Order List",
//			design: "Bold",
//			headerContent:[
////    new sap.m.Label({
////	text: "Order List",
////	design: sap.m.LabelDesign.Bold,
////	textAlign: sap.ui.core.TextAlign.Center,
//////	width:'100%'l
////	})
			               
			headerContent:[
			               
                   new sap.m.Label("customerTitle",{
            text: "All Order List",
            design: sap.m.LabelDesign.Bold,
            textAlign: sap.ui.core.TextAlign.Center,
            width:'100%'}),
//            new sap.m.ToolbarSpacer({}),
            new sap.m.Button({icon:"sap-icon://customer", iconFirst:false, press:oController.onToolbarClicks}),
	            ],
	            subHeader:
				new sap.m.Bar({
					contentMiddle: [
			new sap.m.SearchField( "searchField", {
				placeholder: "Search",
				showMagnifier: false,
//				showRefreshButton: true,
				search: oController.onSearch,
				liveChange: oController.onLiveSearch,
				width: "100%",
				tooltip: "Search for objects..",
//				refreshButtonTooltip: "Refresh"
			})
			]}),
				footer: new sap.m.Toolbar({
					active: true ,
					design : sap.m.ToolbarDesign.Solid,
					content:[
					       ]
				}).addStyleClass("footerColor") ,
			
			content: [
			salesOrderList
			]
		});
	}

});