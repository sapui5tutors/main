sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountOrderitemDetailPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.itemDetailPage
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountOrderitemDetailPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.itemDetailPage
	*/ 
	createContent : function(oController) {
		
//		 var oitemList = new sap.m.List("itemlist",{
//   			inset:false,
//   			  
////   			
//   		});
//   		var itemlisttemplate = new sap.m.ObjectListItem({
//   			title:"{Description}",
//	    	   number:"{NetValue}",
//	    	   numberUnit:"{DocCurrency}",
//	    	   
//	    	  attributes: [{
//	    		   	text:"{OrderQuantity},{UnitOrderQuantity}"
//	            },
//	    		            {
//	    			text:"{NetPrice}per 1{UnitOrderQuantity}"
//	    		            },
//	    		            
//	    		],
//	    		firstStatus: {
//	    			
//	    			text:"{DeliveryStatus}"
//	    		             },
//	    		             
//   		});
//   		oitemList.bindAggregation("items","/data3",itemlisttemplate);
//   		var Z_DMA_itemlist = new sap.m.FlexBox({
//				
//				width:"100%",
//				direction:"Column",
//				items:[oitemList
//          ] })
		
		 var orderItemDetailList = new sap.m.List("ItemsLists",{
	   			inset:false,
	   			  
//	   			
	   		});
	   		var orderItemListTemplate = new sap.m.ObjectListItem({
	   		       title:"{Description}",
		    	   number:"{NetValue}",
		    	   numberUnit:"{DocCurrency}",
		    	   
		    	  attributes: [{
		    		   	text:"{OrderQuantity},{UnitOrderQuantity}"
		            },
		    		            {
		    			text:"{NetPrice} per 1 {UnitOrderQuantity}"
		    		            },
		    		            
		    		],
		    		firstStatus: [
		    		              {
		    			
		    			text:"{DeliveryStatus}",
		    			state:{
		    				path:"DeliveryStatus",
		    			    formatter: function(id)
	                   		{
	                   			if(id == "Shipped")
	                   			{
	                   			return "Success"
	                   			}
	                   			else if(id  == "Open")
	                   			{
	                   			return "Error"
	                   			}
	                   			else if(id == "In Process")
	                   			{
	                   			return "Warning"
	                   			}
	                   		}}}
		    			]
	   		
	   		
		    		             
	   		});
	   		orderItemDetailList.bindAggregation("items","/data3", orderItemListTemplate);
	   		var Z_DMA_orderItemList = new sap.m.FlexBox({
					
					width:"100%",
					direction:"Column",
					items:[orderItemDetailList]
	   		});
	   		var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout({
		   		 labelSpanM: 4,
		   		});
				var oForm1 = new sap.ui.layout.form.Form("MiddleLists",{
					//title: new sap.ui.core.Title({text: "Information",}),
				//	editable: false,
					layout: oLayout1,
					formContainers: [
						new sap.ui.layout.form.FormContainer({
							title: "Information",
							design:"Bold",
							formElements: [
								new sap.ui.layout.form.FormElement({
									label: "Material No.",
									fields: [new sap.m.Text({text:"{/data3/0/Material}",editable:false})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "Cust Material No ",
									fields: [new sap.m.Text({text:"{/data3/0/CustomerMaterial}",editable:false})]
								}),
								
								]
						}),]
				});
//			 var middleList = new sap.m.List("MiddleLists",{
//		   			inset:false,
//		   			  
////		   			
//		   		});
//		   		var middleListTemplate = new sap.m.ObjectListItem({
//		   		       title:"Information",
////			    	   number:"{NetValue}",
////			    	   numberUnit:"{DocCurrency}",
//			    	   
//			    	  attributes: [{
//			    		   	text:"             Material no: {Material}"
//			    	  },
//			    	  {
//			    		    text:"             Customer Material no: {CustomerMaterial} "
//			    	  }]
//		   		});
//		   		middleList.bindAggregation("items","/data3", middleListTemplate);
	   		
			debugger;
			var  label= new sap.m.Label({
//				text: ""
			})
			var oLayout2 = new sap.ui.layout.form.ResponsiveGridLayout({
				 labelSpanM: 4,
			});
			var oForm2 = new sap.ui.layout.form.Form("MiddleLists1",{
//				title: new sap.ui.core.Title(),
//				editable: true,
				layout: oLayout2,
				formContainers: [
					new sap.ui.layout.form.FormContainer({
						title: "Ship To",
						design: "Bold",
						formElements: [
							new sap.ui.layout.form.FormElement({
								label: "Shipping Address",
								fields: [new sap.m.Text({text:"{/data3/0/ShippingAddress}",})
								]
								
							}),
							new sap.ui.layout.form.FormElement({
								label: "",
								fields: [new sap.m.Text({text:"{/data3/0/ShippingAddress1}",})
								]
								
							}),
							new sap.ui.layout.form.FormElement({
								label: "Shipping Carrier",
								
							}),
							
							new sap.ui.layout.form.FormElement({
								label: "Incoterms",
								fields:[
								        new sap.m.Text({text:"{/data3/0/Incoterms}"})]
								
							})
							]
					}),]});
//			 var middleList1 = new sap.m.List("MiddleLists1",{
//		   			inset:false,
//		   			  
////		   			
//		   		});
//		   		var middleList1Template = new sap.m.ObjectListItem({
//		   		       title:"Ship To",
////			    	   number:"{NetValue}",
////			    	   numberUnit:"{DocCurrency}",
//			    	   
//			    	  attributes: [{
//			    		   	text:"Shipping Address: {ShippingAddress1}"
//			    	  },
//			    	  {
//			    		    text:"{ShippingAddress1} "
//			    	  },
//			    	  {
//			    		    text:"Shipping Carrier" 
//			    	  },
//			    	  { 
//			    		    text:"Incoterms: {Incoterms}"
//			    	  }
//			    	  
//		   		]
//			
//		   		});
//		   		middleList1.bindAggregation("items","/data3", middleList1Template);
	
		   		
			
			
			  var orderItemTable = new sap.m.Table({

				    id:"orderItemTables",
//				    	"ItemTables",

//				    itemPress : [ oController.ItemPress,oController ],

				    columns: [

				    new sap.m.Column({

				    width: "20%",

				    header: new sap.m.Label({

				    text: "Quantity"  
				    	})
				    }),

				    new sap.m.Column({

				    width: "20%",

				    header: new sap.m.Label({

				    text: "Requested Date" 
				    	})

				    }),

				    new sap.m.Column({

				    width: "20%",

				    header: new sap.m.Label({

				    text: "Promised Date"

				    })

				    }),
				    

				    new sap.m.Column({  

				    width: "20%",

				    header: new sap.m.Label({

				    text: "Shipped Date"

				    })

				    }),
				    new sap.m.Column({  

				        width: "20%",

				        header: new sap.m.Label({

				        text: "Status"

				        })

				        }),
				      

				            
				      ]
				    });
				        
				    var orderItemTableTemplate = new sap.m.ColumnListItem({

				   	     id: "ItemTablesTemplate",
//				   	     type: "Navigation",
				   	     visible: true,
				   	     cells: [
				               new sap.m.Text( {
				            	    text: "{OrderQuantity}",
				            	    design : "Bold"
				            	      }),

				               new sap.m.Text({
				            	    text:{
				            	    path :"RequestedDate",
				            	    formatter : com.vikalp.dealermgmt.util.Formatter.OrderDate	
				            	    }
				            	    	
				            	    }),

				               new sap.m.Text({
				            	   text:{
					            	    path :"PromisedDate",
					            	    formatter : com.vikalp.dealermgmt.util.Formatter.OrderDate	
					            	    }
				                    }),

				               new sap.m.Text({
				            	   text:{
					            	    path :"ShippedDate",
					            	    formatter : com.vikalp.dealermgmt.util.Formatter.OrderDate	
					            	    }
				            	          
//				            	    	path : "DeliveryDate",
//				            	    	formatter : com.vikalp.dealermgmt.util.Formatter.OrderDate
//				            	    	 }
				            	    }),
//				            	    new sap.m.Text({
//					            	    text: "{DeliveryStatus}",
//					            	    
//					                        path: "DeliveryStatus",
//					                           formatter: function(id)
//					                   		{
//					                        	   debugger;
//					                   			if(id == "Shipped")
//					                   			{
//					                   			return "Success"
//					                   			}
//					                   		if(id  == "Not Shipped")
//					                   			{
//					                   			return "Error"
//					                   			}
//					                   		if(id=="In Process")
//					                   			{
//					                   			return "Warning"
//					                   			}
//					                   		
//					                   		} 
//
//					                    }),
				            	    new sap.m.Text().bindProperty("text","DeliveryStatus",function(id){
			                    	    debugger;
			                    	    if(id == "Shipped")
			                    	    			{
			                    	    			this.addStyleClass("green");
			                    	    		   }
			                    	          		else if(id=="Open"){
			                    	    			this.addStyleClass("red");
			                    	    		}
			                    	    		else if(id == "In Process")
			                    	    			{
			                    	    			this.addStyleClass("yellow");
			                    	    			
			                    	    			}
			                    	    		return id;
			                    	    	}     )
				              
				               
				               ]  ,
				            

				            });		 
				     orderItemTable.bindAggregation("items","/data3",orderItemTableTemplate);
				     
				     var counterList = new  sap.m.List("count2",{
				   			headerText: "",
				   				design: "Bold",
				   				items:{
				   					template: new sap.m.ObjectListItem({
//				   						title: ""
				   					})
				   				}
				   			}).addStyleClass("Z_DMA_oContainer");
				     
				     var Z_DMA_oitemsDetail = new sap.m.FlexBox({
						
						              width:"100%",
						              direction:"Column",
						              items:[orderItemTable]
				      });

		
		
		
		
		
		
 		return new sap.m.Page({
			title: "Item Detail",
			showNavButton: true,
			
			 navButtonTap:function(){ 
				 window.history.go(-1);
	                 
	                 },
			content: [
Z_DMA_orderItemList,oForm1,label,oForm2,counterList,Z_DMA_oitemsDetail 
			]
		});
	}

});