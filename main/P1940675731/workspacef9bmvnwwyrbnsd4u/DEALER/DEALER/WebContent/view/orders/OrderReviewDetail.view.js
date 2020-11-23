sap.ui.jsview("com.vikalp.dealermgmt.view.orders.OrderReviewDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.orders.OrderReviewDetail
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.orders.OrderReviewDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.orders.OrderReviewDetail
	*/ 
	createContent : function(oController) {
		
		
//		 var oReviewList = new sap.m.List("reviewlist1",{
//			 	inset:false,});
//			        
//			 	var oReviewlisttemplate = new sap.m.ObjectListItem({
//			 	title:"{ImKunnr}",
////				   	  number:"Mobile: {MobileNumber}",
//			   	  intro:"{ImSalesOrg}",
//			   	 attributes: [
//			   	              {
//			   	
//			   	text:"Name:{Name1}"
//			   	            },
//			   	            {
//			   	   	
//			   	   	text:"Address: {Address}"
//			   	   	            },
//			   	           {
//			   	text:"City: {City}"
//			   	           },
//			   	           {
//			   	  text:"State: {State}"
//			   	           },
//			   	           {
//			   	   	  text:"Zip: {Zip}"
//			   	   	           },
//			   	   	           {
//			   	   	   	  text:"Country: {Country}"
//			   	   	   	           },
//			   	   	   	           {
//			   	   	   	   	  text:"phoneNo: {PhoneNo}"	
//			   	   	   	   	           },
//			   	   	   	   	           {
//			   	   	   	   	   	  text:"incoterms: {Incoterms}"
//			   	   	   	   	   	           },
//			   	],
//			   	
//			 	}
//			 	);
//
//			  oReviewList.bindAggregation("items","/data122",oReviewlisttemplate);
		
		var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout({
//			labelSpanL: 2,
//			labelSpanM: 1,
			labelSpanS: 12,
//			emptySpanL: 1,
//			emptySpanM: 1,
			emptySpanS: 20,
			columnsL: 2,
			columnsM: 2,
//			breakpointL: 800,
//			breakpointM: 400


		});
		
		var reviewForm1 = new sap.ui.layout.form.Form("reviewForm",{
//			title: new sap.ui.core.Title({text: "Address Data",}),
			editable: true,
			layout: oLayout1,
			formContainers: [
				new sap.ui.layout.form.FormContainer("F1C1",{
					title: "Shipping Details",
					formElements: [
						new sap.ui.layout.form.FormElement({
							label: "Ship To Party",
							fields: [new sap.m.Text("revToParty",{})]
						}),
						new sap.ui.layout.form.FormElement({
							label: "Phone Number",
							fields: [new sap.m.Text("revPhone",{editable:false})]
						}),
						new sap.ui.layout.form.FormElement({
							label: "Requested Delivery",
							fields: [new sap.m.Text("revDelivery",{editable:false})]
						}),
						new sap.ui.layout.form.FormElement({
							label: "Carrier",
							fields: [new sap.m.Text("revCarrier",{editable:false})]
						}),
						new sap.ui.layout.form.FormElement({
							label: "Incoterms",
							fields: [new sap.m.Text("revIncoterms",{editable:false})]
						}),
						new sap.ui.layout.form.FormElement({
							label: "Shipping Instructions",
							fields: [new sap.m.Text("revInstruction",{editable:false})]
						}),
						new sap.ui.layout.form.FormElement({
							label: "Notes to Reciever",
							fields: [new sap.m.Text("revNotes",{editable:false})]
						})
						
						]}),
						new sap.ui.layout.form.FormContainer("F1C2",{
							title: "Order Details ",
							formElements: [
								new sap.ui.layout.form.FormElement({
									label: "Sold-To Party",							
									fields: [new sap.m.Text("revSold",{editable:false})]
								}),
								new sap.ui.layout.form.FormElement({
									label: "Purcase Order",
									fields: [new sap.m.Text("revPO",{editable:false})]
								}),
								new sap.ui.layout.form.FormElement({
									label: "Total",
									fields: [new sap.m.Text("revTotal",{editable:false})]
								}),
//								new sap.ui.layout.form.FormElement({
//									label: "Tax",
//									fields: [new sap.m.Text("revText",{text:"{/data121/0/Address}",editable:false})]
//								}),
//								new sap.ui.layout.form.FormElement({
//									label: "Grand Total",
//									fields: [new sap.m.Text("revGrandTotal",{text:"{/data121/0/Address}",editable:false})]
//								})
								]
						}),
				]
				});
		
		  var reviewTable = new sap.m.Table({

		  	    id: "reviewTable",
		  	    inset : true,
//		  	    mode:sap.m.ListMode.Delete,
		  	    headerText: "Items(0)",
	            columns: [

		  	    new sap.m.Column({

		        header: new sap.m.Label({

		  	    text: "Item"  
		  	    	})
		  	    }),

		  	    new sap.m.Column({

//		  	    width: "20%",

		  	    header: new sap.m.Label({

		  	    text: "Requested Quantity" 
		  	    	})

		  	    }),

		  	    new sap.m.Column({

//		  	    width: "20%",

		  	    header: new sap.m.Label({

		  	    text: "Requested Delivery"

		  	    })

		  	    }),
		  	    
		  	    
		  	    

		  	    new sap.m.Column({  

//		  	    width: "20%",

		  	    header: new sap.m.Label({

		  	    text: "Available Quantity"

		  	    })
	 
		  	    }),
		  	    
		  	  new sap.m.Column({  

//			  	    width: "20%",

			  	    header: new sap.m.Label({

			  	    text: "Estimated Delivery"

			  	    })
		 
			  	    }),
			  	  new sap.m.Column({  

//				  	    width: "20%",

				  	    header: new sap.m.Label({

				  	    text: "Your Price (INR)"

				  	    }),
			  	   footer : new sap.m.Label({ 
			  		  text : "Total"
			  		  })
			 
				  	    }),
				  	  new sap.m.Column({  

//					  	    width: "20%",

					  	    header: new sap.m.Label({

					  	    text: "Subtotal (INR)"

					  	    }),
					  	   footer : new sap.m.Label("totalReview",{
					  		   text: "0" 	
					  		  })
				 
					  	    }),
		  	    
		  	    
		  	    
		  	      ], 
		  });


		     
		     
		     
		     
		     var    reviewTemplate = new sap.m.ColumnListItem({
		    	
		   	     visible: true,

		   	     cells: [ 
		   	              
		   	              new sap.m.Label({
	         	          text: "{ImMaterial} {Description}"
	     	    }),
	     	  
		   	           
		               new sap.m.Label({
		            	   text:"{ReqQuantity} {Unit}",
		            	  
	                      width: "150%",
//		                	 editable : false,
		                	
		                 }),
		                 
		                 new sap.m.Label({
	            	    	  text: {
	            	    	  path:"ImReqDate",
			            	    
			            	    formatter : com.vikalp.dealermgmt.util.Formatter.OrderDate
			            	    }
//	            	    		  
//	            	    		  id.setDate(date);
//	            	    		  
//	            	    		  
//	            	    		   return id;
//	            	    		   }
//	            	    	   }
		                 }),
		            	    
		                 new sap.m.Text().bindProperty("text","QuantityStatus",function(id){
		                	   
		                   	    if(id == "As Requested")
		                   	    			{
		                   	    			this.addStyleClass("green");
		                   	    		   }
		                   	    else{
		                   	    	this.addStyleClass("red");
		                   	    }
		                   	 return id;
		          	       	    }),
		          	       	                 	    	
		                       
		          	       	    
		          	       	 new sap.m.Text().bindProperty("text","DateStatus",function(id){
		          	       	 if(id == "As Requested")
          	    			{
          	    			this.addStyleClass("green");
          	    		   }
          	    else{
          	    	this.addStyleClass("red");
          	    }
          	 return id;
			          	       	    }),
			              
			          	       	 new sap.m.Label({
				          	       	    text: "{ImPrice}"
				          	       	    }),
				          	       	 new sap.m.Label({
					          	       	    text: "{Subtotal}"
					          	       	    }),
					              
		              
//		            	    new sap.m.Button({
//		            	    	icon:"sap-icon://sys-cancel",
//		            	    	press : function(){
//		            	    		
//		            	    	}
//		            	    })

		                 ],
		                 
		     });
		     reviewTable.bindAggregation("items","/data_review",reviewTemplate); 
		    
		
		
		
 		return new sap.m.Page({
			title: "Review and Place Order",
			showNavButton : true,
			 navButtonTap:function(){ 
				 var   app = sap.ui.getCore().byId("orAppId");  
	                  app.back();
	                  },
			
			content: [
reviewForm1,reviewTable     
			
			],
			footer: new sap.m.Toolbar({
//				active: true ,
				design : sap.m.ToolbarDesign.Solid,
				content:[
				         new sap.m.ToolbarSpacer({}),
				        new sap.m.Button({
				        	 text : "Place Order",
				        	 enabled :true,
				        	 type:"Transparent",
				        	 press: oController.placeorder
				       }), 
				         new sap.m.Button({
				        	 text : "Cancel",
				        	 enabled :true,
				        	 type:"Transparent", 
				        	 press: function(){
				        		 var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
								 router.navTo("OrdersInfo");
				        		 debugger;
				        			sap.ui.getCore().byId("cartTable").setModel();
                        			sap.ui.getCore().byId("checkoutTable").setModel();
                        			sap.ui.getCore().byId("shippingForm").setModel();
                        			sap.ui.getCore().byId("reviewForm").setModel();
                        			sap.ui.getCore().byId("reviewTable").setModel();
                        			sap.ui.getCore().byId("cnt1").setText("0");
                        			sap.ui.getCore().byId("cartTable").setHeaderText("Items (0)");
                        			cartCnt = 0;
                        			  var   app = sap.ui.getCore().byId("orAppId"); 
//             	                     app.backToTop();
				        	 }
				       }) 
				       ]
				       }).addStyleClass("footerColor") 
	                  
		});
	}

});