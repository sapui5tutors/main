sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.DealerPaymentDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountPaymentMaster
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.DealerPaymentDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountPaymentMaster
	*/ 
	createContent : function(oController) {
	
		var oDataset1 = new sap.viz.ui5.data.FlattenedDataset({		 						

			dimensions: [
			             {
			            	 axis : 1,
			            	 name : "Billing Doc Number",
			            	 value:"{Billingdoc}",
			            		 
			             },
			             ],
			             measures : [
	 						          {  group : 1,
	 						        	 name : 'PaidAmount',
	 						        	 value : "{PaidAmount}"
	 						          },
	 						          { 
	 						        	  group : 2,
	 						        	  name : "DueAmount",
	 					            	  value : "{DueAmount}"
	 						          }
	 						          ],


		          data : {
		        	  path:"/dataStack"
		          }});

	var DualSC1 = new sap.viz.ui5.DualStackedColumn("DualSC1",{
		 
		width : "100%",
		height : "400px",
		title : {
            visible : true,
            text : 'Payment Report'
          },
		
		dataset: oDataset1,
//		 xAxis : new  sap.viz.ui5.types.Axis({color: "#FFFFFF", lineSize: 3, visible: false}),
//		yAxis: {
//	         color: '#FF0000'
//	     },
		 plotArea: { 
       	  primaryValuesColorPalette:  ["#00bfff"],
       	  secondaryValuesColorPalette :["#8c0000"],
       	  isRoundCorner: true, 
       	  animation:{dataLoading:false}, 
       	  drawingEffect: sap.viz.ui5.types.VerticalBar_drawingEffect.glossy 
       	  }      
	});
		
		
		var itemTable1 = new sap.m.Table({

		    id: "itemTablePayment",

//		    itemPress : [ oController.ItemPress,oController ],

		    columns: [

		    new sap.m.Column({

		    width: "20%",
		    

		    header: new sap.m.Label({

		    text: "Billing Doc Number",
		    	design: sap.m.LabelDesign.Bold
		    	})
		    }),

		    new sap.m.Column({

		    width: "20%",

		    header: new sap.m.Label({

		    text: "Total Amount" ,
		    design: sap.m.LabelDesign.Bold
		    	})

		    }),

		    new sap.m.Column({

		    width: "20%",

		    header: new sap.m.Label({

		    text: "Paid Amount",
		    design: sap.m.LabelDesign.Bold

		    })

		    }),
		    

		    new sap.m.Column({  

		    width: "20%",

		    header: new sap.m.Label({

		    text: "Due Amount",
		    design: sap.m.LabelDesign.Bold

		    })

		    }),
		   
		      ]
		    });
		        
		    var itemTable1Template = new sap.m.ColumnListItem({

//		       id: "ItemTemplate",
//		   	 type: "Navigation",
		   	     visible: true,
		   	     cells: [
		               new sap.m.Label({
		            	    text: "{Billingdoc}"
		            	     }),

		               new sap.m.Label({
		            	    text: "{TotalAmount} {Currency}"
		            	    }),

		               new sap.m.Label({
		            	    text: "{PaidAmount} {Currency}"			            	    			            	
		                    }),

		               new sap.m.Label({
		            	    text: "{DueAmount} {Currency}"
		                    }),
		               ]  ,
//		              select : oController.onTableItemClick  

		            });		 
		     itemTable1.bindAggregation("items","/dataTable",itemTable1Template);
		     
		     var Z_DMA_oitemsDetail = new sap.m.FlexBox({
				
				              width:"100%",
				              direction:"Column",
				              items:[itemTable1]
		       });	
		
		
var dataset = new sap.viz.ui5.data.FlattenedDataset({
			
			dimensions: [
			             {
			            	 axis : 1,
			            	 name : "Period",
			            	 value : "{Period}",
			             }
			             ],
		measures : [
		          {
		        	  name : 'Amount',
		        	  value : "{Amount}",
		          }
		          ],
		          data : {
		        	  path:"/dataPayment"
		          }
			             
		});
		
		var pie = new sap.viz.ui5.Pie("PiePayment",{
			width : "80%",
			height : "400px",
			
//			text:'country',
			title : {	
				visible : true,
//				showLegend: true,
//				text : 'Country',
				text : 'Ageing Report',
			},
//			dataLabel :{
//				visible : true
//			},
		  	 			
			
			dataset:dataset,
		})
			     
			     
			     var itemTable2 = new sap.m.Table({

					    id: "itemTablePayment2",
//					    headerText : "Due Amount :",
					    
//					    itemPress : [ oController.ItemPress,oController ],

					    columns: [

					    new sap.m.Column({

					    width: "20%",
					    

					    header: new sap.m.Label({

					    text: "Amount",
					    	design: sap.m.LabelDesign.Bold
					    	})
					    }),

					    new sap.m.Column({

					    width: "20%",

					    header: new sap.m.Label({

					    text: "0 To 30 Days" ,
					    design: sap.m.LabelDesign.Bold
					    	})

					    }),

					    new sap.m.Column({

					    width: "20%",

					    header: new sap.m.Label({

					    text: "31 To 60 Days",
					    design: sap.m.LabelDesign.Bold

					    })

					    }),
					    

					    new sap.m.Column({  

					    width: "20%",

					    header: new sap.m.Label({

					    text: "61 To 90 Days",
					    design: sap.m.LabelDesign.Bold

					    })

					    }),
					    
					    new sap.m.Column({  

						    width: "20%",

						    header: new sap.m.Label({

						    text: "91 To 120 Days",
						    design: sap.m.LabelDesign.Bold

						    })

						    }),
						    
						    new sap.m.Column({  

							    width: "20%",

							    header: new sap.m.Label({

							    text: "121 To 360 Days",
							    design: sap.m.LabelDesign.Bold

							    })

							    }),
							    
							    new sap.m.Column({  

								    width: "20%",

								    header: new sap.m.Label({

								    text: ">360 Days",
								    design: sap.m.LabelDesign.Bold

								    })

								    }),
					   
					      ]
					    });
					        
					    var itemTable1Template2 = new sap.m.ColumnListItem({

//					       id: "ItemTemplate",
//					   	 type: "Navigation",
					   	     visible: true,
					   	     cells: [
					               new sap.m.Label({
					            	    text: "{Amount} {Currency}"
					            	     }),

					               new sap.m.Label({
					            	    text: "{Zero030} {Currency}"
					            	    }),

					               new sap.m.Label({
					            	    text: "{ThirtyOne060} {Currency}"			            	    			            	
					                    }),

					               new sap.m.Label({
					            	    text: "{SixtyOne090} {Currency}"
					                    }),
					                    
					                    new sap.m.Label({
						            	    text: "{NintyOne120} {Currency}"
						                    }),
						                    
						                    new sap.m.Label({
							            	    text: "{OneTwoOne360} {Currency}"
							                    }),
							                    
							                    new sap.m.Label({
								            	    text: "{Gt361} {Currency}"
								                    }),
					               ]  ,
//					              select : oController.onTableItemClick  

					            });		 
					     itemTable2.bindAggregation("items","/dataTable2",itemTable1Template2);
					     
					     var Z_DMA_oitemsDetail2 = new sap.m.FlexBox({
							
							              width:"100%",
							              direction:"Column",
							              items:[itemTable2]
					       });	
			     
			     
			     
			     var paymentInfoTab = new sap.m.IconTabFilter("paymentInfoTab",{
					    text:"Payments",
						icon:"sap-icon://simple-payment",
//						count :"",
						content:[
                            DualSC1,Z_DMA_oitemsDetail
					        ]
					   }); 	        
				 var ageingInfoTab = new sap.m.IconTabFilter("ageingInfoTab",{
					    text:"Ageing",
						icon:"sap-icon://batch-payments",
//						count :"",
						content:[
						         Z_DMA_oitemsDetail2,pie
					        ]
					   });
				 var paymentTabFilter = new sap.m.IconTabBar({
							items:[paymentInfoTab,ageingInfoTab],					
						    });
				 var Z_DMA_oContainerPayment = new sap.m.FlexBox({
				     
				     width:"100%",
				     direction:"Column",
				     items:[paymentTabFilter]
				     
				 }).addStyleClass("Z_DMA_oContainer");
				 
		
		 return new sap.m.Page({
//				title: "Report",
				headerContent: new sap.m.Label({text:"Report",textAlign:sap.ui.core.TextAlign.Center,design: sap.m.LabelDesign.Bold,width:'100%'}),

	content: [
Z_DMA_oContainerPayment
			]
		
		 });		

	}

});
	