var cartCnt = 0 ;
jQuery.sap.declare("com.vikalp.dealermgmt.util.Formatter");
sap.ui.jsview("com.vikalp.dealermgmt.view.orders.OrdersInfo", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.orders.OrdersInfo
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.orders.OrdersInfo";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.orders.OrdersInfo
	*/ 
	createContent : function(oController) {
		
		var headerList = new sap.m.List("headerList",{
			inset: false
		});
		
        var headerListItem = new sap.m.ObjectListItem("headerListItem",{
			
			title : "Sales Order: {ImSalesorder}",
			number:"{OrderValue}",
			numberUnit:"{Currency}",
//			intro: "{Currency}",
			introTextDirection :sap.ui.core.TextDirection.RTL ,
	        attributes:[
                            {
                              text : "PO: {PurchOrd}"	
                           },
	                    {
	                    	text: {
                    
	                    		path : "OrderDate",
	                    		 formatter: function(orderDate) {
	                    		     return 'Ordered: ' + com.vikalp.dealermgmt.util.Formatter.OrderDate.call(null, orderDate);
	                    		  }
	                    		
//	                     formatter : com.vikalp.dealermgmt.util.Formatter.OrderDate
	                    	}
	                    },
	                    {
	                    text: {
	                        
                    		path : "RequestedDate",
                    		 formatter: function(requestDate) {
                    		     return 'Requested: ' + com.vikalp.dealermgmt.util.Formatter.OrderDate.call(null, requestDate);
                    		  }
	                    }
	                    },
	                    {
	                    	text: "Ship To: {ShipTo}"
	                    }
	                    ],
	        firstStatus:[
	                    {
	                     text :"Overall Status: {OverallStatus}",
	                     }
	                    
	                ],
           secondStatus:[
             {
               text:  "Delivery Status: {DeliveryStatus}",
               state :{
            path:"DeliveryStatus",
               formatter: function(id)
       		{
       			if(id == "Shipped")
       			{
       			return "Success"
       			}
       		if(id  == "Not Shipped")
       			{
       			return "Error"
       			}
       		if(id=="In Process")
       			{
       			return "Warning"
       			}
       		} }
            		         
               }  
             ],
//             type:"Active",
		});
        headerList.bindAggregation("items","/data1",headerListItem);
        headerList.addEventDelegate({
	    	 onAfterRendering: function() {
	    		 debugger;
	    	 var oObjectText = $('#__status2-headerList-0').find('.sapMObjStatusText');
	         for (var i = 0; i < oObjectText.length; i++) {
	           var innerHTML = oObjectText[i].innerHTML;
	           var oLength = innerHTML.length;
	           var oSelected = innerHTML.substring(0, 17);
	           var oStatusText = innerHTML.substring(17, oLength);
	           innerHTML = "<span class='highlight'>" + oSelected + "</span>" + oStatusText;
	           oObjectText[i].innerHTML = innerHTML;
	         }
	    	 }
	     },headerList);

	
  
	
    var itemTable = new sap.m.Table({

    id: "itemTable",

//    itemPress : [ oController.ItemPress,oController ],

    columns: [

    new sap.m.Column({

    width: "20%",

    header: new sap.m.Label({

    text: "Description"  
    	})
    }),

    new sap.m.Column({

    width: "20%",

    header: new sap.m.Label({

    text: "Order Quantity" 
    	})

    }),

    new sap.m.Column({

    width: "20%",

    header: new sap.m.Label({

    text: "Price"

    })

    }),
    

    new sap.m.Column({  

    width: "20%",

    header: new sap.m.Label({

    text: "Net Amount"

    })

    }),
    new sap.m.Column({  

        width: "20%",

        header: new sap.m.Label({

        text: "Status Summary"

        })

        }),
        new sap.m.Column({  

            width: "20%",

            header: new sap.m.Label({

            text: "Shipped"

            })

            }),
      ]
    });
        
    var itemTableTemplate = new sap.m.ColumnListItem({

   	     id: "itemTableTemplate",
   	     type: "Navigation",
   	     visible: true,
   	     cells: [
               new sap.m.Label("itemdata", {
            	    text: "{Description}",
            	    design : "Bold"
            	      }),

               new sap.m.Label({
            	    text: "{Ordered}"
            	    }),

               new sap.m.Label({
            	    text: "{Price}"

                    }),

               new sap.m.Label({
            	    text: "{Amount}"
            	      
            	    }),
            	     new sap.m.Text().bindProperty("text","StatusSummery",function(id){
                    	    
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
                    	    	}
                         ),                 	    	
                        
                        

               new sap.m.Label({
            	    text: "{Shipped}"
            	    }),
            	    ],
          
              press : oController.onTableItemClick  

            });		 
     itemTable.bindAggregation("items","/data2",itemTableTemplate);
     var Z_DMA_oitemsDetail = new sap.m.FlexBox("ItemsWrapper",{
		
		              width:"100%",
		              direction:"Column",
		              items:[itemTable]
      });
     
     
     
     
     
     var openTable = new sap.m.Table({

    	    id: "openTable" ,


    	    columns: [

    	    new sap.m.Column({

    	    width: "20%",

    	    header: new sap.m.Label({

    	    text: "Description"  
    	    	})
    	    }),

    	    new sap.m.Column({

    	    width: "20%",

    	    header: new sap.m.Label({

    	    text: "Order Quantity" 
    	    	})

    	    }),

    	    new sap.m.Column({

    	    width: "20%",

    	    header: new sap.m.Label({

    	    text: "Price"

    	    })

    	    }),
    	    

    	    new sap.m.Column({  

    	    width: "20%",

    	    header: new sap.m.Label({

    	    text: "Net Amount"

    	    })

    	    }),
    	    new sap.m.Column({  

    	        width: "20%",

    	        header: new sap.m.Label({

    	        text: "Status Summary"

    	        })

    	        }),
    	        new sap.m.Column({  

    	            width: "20%",

    	            header: new sap.m.Label({

    	            text: "Shipped"

    	            })

    	            }),
    	      ]
    	    });
     
     
     var    templ = new sap.m.ColumnListItem({
    	 id: "ite",
   	     type: "Navigation",
   	     visible: true,
   	     cells: [
   	           
               new sap.m.Label({
            	    text: "{Description}",
            	    design : "Bold"
            	      }),

               new sap.m.Label({
            	    text: "{Ordered}"
            	    }),

               new sap.m.Label({
            	    text: "{Price}"

                    }),

               new sap.m.Label({
            	    text: "{Amount}"
            	      
            	    }),
            	    new sap.m.Text().bindProperty("text","StatusSummery",function(id){
                	    
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
                	    	}
                     ),                 	    	
                    
                    

           new sap.m.Label({
        	    text: "{Shipped}"
        	    }),
        	    ],
        	    press : oController.onTableItemClick  
            	    
     	
     });
     
//     var f1 = new  sap.ui.model.odata.Filter('StatusSummery', sap.ui.model.FilterOperator.EQ, "Open");  
//     openTable.bindAggregation("items","/data2",templ,f1 );
     
     var f1 = new  sap.ui.model.Filter('StatusSummery', "EQ" , "Open");   
     openTable.bindItems("/data2",templ,null, f1); 
     
     
     var inProcessTable = new sap.m.Table({

 	    id: "inProcessTable",

// 	    itemPress : [ oController.ItemPress,oController ],

 	    columns: [

 	    new sap.m.Column({

 	    width: "20%",

 	    header: new sap.m.Label({

 	    text: "Description"  
 	    	})
 	    }),

 	    new sap.m.Column({

 	    width: "20%",

 	    header: new sap.m.Label({

 	    text: "Order Quantity" 
 	    	})

 	    }),

 	    new sap.m.Column({

 	    width: "20%",

 	    header: new sap.m.Label({

 	    text: "Price"

 	    })

 	    }),
 	    

 	    new sap.m.Column({  

 	    width: "20%",

 	    header: new sap.m.Label({

 	    text: "Net Amount"

 	    })

 	    }),
 	    new sap.m.Column({  

 	        width: "20%",

 	        header: new sap.m.Label({

 	        text: "Status Summary"

 	        })

 	        }),
 	        new sap.m.Column({  

 	            width: "20%",

 	            header: new sap.m.Label({

 	            text: "Shipped"

 	            })

 	            }),
 	      ]
 	    });
  
 
  var    templ2 = new sap.m.ColumnListItem({
 	 id: "item2",
 	type: "Navigation",
	     visible: true,
	     cells: [
	           
            new sap.m.Label({
         	    text: "{Description}",
         	    design : "Bold"
         	      }),

            new sap.m.Label({
         	    text: "{Ordered}"
         	    }),

            new sap.m.Label({
         	    text: "{Price}"

                 }),

            new sap.m.Label({
         	    text: "{Amount}"
         	      
         	    }),
         	   new sap.m.Text().bindProperty("text","StatusSummery",function(id){
           	    
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
           	    	}
                ),                 	    	
               
               

      new sap.m.Label({
   	    text: "{Shipped}"
   	    }),
   	    ],
   	   press : oController.onTableItemClick  
         	    
  	
  });
//     
//     var f2 = new  sap.ui.model.odata.Filter('StatusSummery', sap.ui.model.FilterOperator.EQ, "In Process");
//     inProcessTable.bindAggregation("items","/data2",templ2,f2 );
     
     var f2 = new  sap.ui.model.Filter('StatusSummery', "EQ" , "In Process");   
     inProcessTable.bindAggregation("items",{path:"/data2", template:templ2, filters:f2}); 
     
     
     var shippedTable = new sap.m.Table({

  	    id: "shippedTable",

//  	    itemPress : [ oController.ItemPress,oController ],

  	    columns: [

  	    new sap.m.Column({

  	    width: "20%",

  	    header: new sap.m.Label({

  	    text: "Description"  
  	    	})
  	    }),

  	    new sap.m.Column({

  	    width: "20%",

  	    header: new sap.m.Label({

  	    text: "Order Quantity" 
  	    	})

  	    }),

  	    new sap.m.Column({

  	    width: "20%",

  	    header: new sap.m.Label({

  	    text: "Price"

  	    })

  	    }),
  	    

  	    new sap.m.Column({  

  	    width: "20%",

  	    header: new sap.m.Label({

  	    text: "Net Amount"

  	    })

  	    }),
  	    new sap.m.Column({  

  	        width: "20%",

  	        header: new sap.m.Label({

  	        text: "Status Summary"

  	        })

  	        }),
  	        new sap.m.Column({  

  	            width: "20%",

  	            header: new sap.m.Label({

  	            text: "Shipped"

  	            })

  	            }),
  	      ]
  	    });
   
   
   var    templ3 = new sap.m.ColumnListItem({
  	 id: "item3",
 	     visible: true,
 	    type: "Navigation",
 	     cells: [
 	           
             new sap.m.Label({
          	    text: "{Description}",
          	    design : "Bold"
          	      }),

             new sap.m.Label({
          	    text: "{Ordered}"
          	    }),

             new sap.m.Label({
          	    text: "{Price}"

                  }),

             new sap.m.Label({
          	    text: "{Amount}"
          	      
          	    }),
          	  new sap.m.Text().bindProperty("text","StatusSummery",function(id){
          	    
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
          	    	}
               ),                 	    	
              
              

     new sap.m.Label({
  	    text: "{Shipped}"
  	    }),
  	    
          	    ],
          	   press : oController.onTableItemClick  
   
   
   });
//     var f3 = new  sap.ui.model.odata.Filter('StatusSummery', sap.ui.model.FilterOperator.EQ, "Shipped");
//     shippedTable.bindAggregation("items","/data2",templ3,f3 );
     
     var f3 = new  sap.ui.model.Filter('StatusSummery', "EQ" , "Shipped");   
     shippedTable.bindAggregation("items",{path:"/data2", template:templ3, filters:f3}); 
     
     
 	
		var contactList = new sap.m.List("contactList",{
			inset:false,});
      
		var contactListTemplate = new sap.m.ObjectListItem({
			title:"{Fullname}",
//	    	   number:"{MobileNumber}",
//	    	   intro:"{ImCustomerid}",
	    	  attributes: [{
 		   	text:"Company Name:{CompanyName}"
         },

 		            {
 			text:"Address: {Street} / {PostalCode} {City}"
 		            },
 		         
 		            
 		],
 		firstStatus: {
 			 icon:"sap-icon://iphone",
	     			text:"{Mobile}"
 			
 		             },
 		             secondStatus: {
 		            	 icon:"sap-icon://email",
 		     			text:"{Mail}"
 		             }
		});
		contactList.bindAggregation("items","/datacon",contactListTemplate);
     
     
           

    var creditInfoTab = new sap.m.IconTabFilter("i1",{
       text: "Information" ,	
 	   icon:"sap-icon://hint",
 	   count :"",
 	    content:[
               Z_DMA_oitemsDetail
 	         ],
 	         
     });
   var contactTab = new sap.m.IconTabFilter("cont2",{
			text: "Contacts",
		icon:"sap-icon://company-view", 
//			count:"",
			content:[
contactList
			         ]
		});

       var openTab = new sap.m.IconTabFilter("i2",{
			text: "Open",
			count:"",
			icon:"sap-icon://task",
			iconColor:"Critical" , 
//			count:"",
			content:[
openTable
			         ]
		});
       
       var inProcessTab = new sap.m.IconTabFilter("i3",{
			text: "In Process",
			count:"",
			icon:"sap-icon://process",
			iconColor:"Negative",  
			content:[
inProcessTable]
		});
        
       var shippedTab = new sap.m.IconTabFilter("i4",{
			text: "Shipped",
			count:"",
			icon:"sap-icon://shipping-status",
			iconColor: "Positive",
	        content:[ shippedTable]
		});
 //   var salesSummary = new sap.m.IconTabFilter({
 //	
// 	icon:"sap-icon://sales-notification",
// 	content:[new sap.m.Text({text:"Sales Summary Tab"})]
//     });

    var profileTabFilter = new sap.m.IconTabBar({
 	
 	items:[creditInfoTab,openTab,inProcessTab,shippedTab,contactTab],
// 	content:[new sap.m.Button({text:"Click ME"})]
     });
    var Z_DMA_oContainer = new sap.m.FlexBox({
        
        width:"100%",
        direction:"Column",
        items:[profileTabFilter]
        
    }).addStyleClass("Z_DMA_oContainer");
    
//    var cartCnt =0;
		
	 return new sap.m.Page({
//			title: "Order Details",
			headerContent: [ 
			            
			    			               
			                  new sap.m.Label({
			                        text: "Order Details",
			                        design: sap.m.LabelDesign.Bold,
			                        textAlign: sap.ui.core.TextAlign.Center,
			                        width:'100%'}),
			                 new sap.m.Button("cnt1",{icon:"sap-icon://cart", text:"0", iconFirst:true,
				
				
				press : function(){
				
//					var appPage = sap.ui.getCore().byId("orAppId");
//
//					appPage.to("orderCartDetail");
					var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
					 router.navTo("OrderCartDetail");
				}})],
			content: [
                   headerList,Z_DMA_oContainer 
			],
			footer: new sap.m.Toolbar({
//				active: true ,
				design : sap.m.ToolbarDesign.Solid,
				content:[
				         
                       new sap.m.ToolbarSpacer({}),
				       new sap.m.Button("btn_add",{
				        	 text : "Add To Cart",
				        	 enabled :false,
				        	 type:"Emphasized",
				        	 press: function(evt){
				        		
//				        		 debugger;
				        		
				        	 x=sap.ui.getCore().byId("headerList");
				        	 var r ;
				        		 var  q = x.getModel().oData.data1;
				        		 for(i =0 ;i<= q.length ; i++ ){
						    	  for (m in q[i]){
						    		  r = q[i].ImSalesorder;
						            }
						    		  
				        		  }
				        		 var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
								 router.navTo("OrderCartDetail");
								 
						    	  oDataModel.read("/SalesOrderItemDetailsInfoSet?$filter=ImSalesorder eq '"+r+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
						    	  temp = loginResult.results;
						    	  debugger;
						    	  sap.ui.getCore().byId("cartDate").setDateValue(temp[0].RequiredDelivery);

//							  	    var cartJson = new sap.ui.model.json.JSONModel();
//							        	cartJson.setProperty("/datacon1", []);
//							        	 for(var k = 0 ; k <temp.length ; k++){
//							        	var cartNew =  cartJson.getProperty("/datacon1");
//							        	var cartData = {
//							        			Product : temp[k].Product,
//										  		Material : temp[k].Material,
//										  		Unit : temp[k].Unit,
//										  		RequiredDelivery: temp[k].RequiredDelivery,
//										  		Quantity: temp[k].Quantity,
//										  		Price : temp[k].Price,
//										  		NetPrice:temp[k].NetPrice,
//										  		BaseUnit:temp[k].BaseUnit,
//										  		Customer:temp[k].Customer,
//										  		Description:temp[k].Description,
//										  		Amount:temp[k].Amount,
//										  		ItemNo:temp[k].ItemNo
//							        	};
//							        	cartNew.push(cartData);
//							        	 }
//							        	 cartJson.setProperty("/datacon1", cartNew);
//							        	 cartJson.refresh(true);
//							        	 sap.ui.getCore().byId("cartList").setModel(cartJson);
//							        	 sap.ui.getCore().byId("cartTable").setModel(cartJson);
						    	  if( cartCnt ==0){
						    	 
							  	    var cartJson = new sap.ui.model.json.JSONModel();
							          cartJson.setData({datacon1:loginResult.results});
							  	   sap.ui.getCore().byId("cartTable").setModel(cartJson);
							  	 sap.ui.getCore().byId("cartForm").setModel(cartJson);
//							  	 sap.ui.getCore().byId("cartForm").bindElement("/datacon1");
							  	 
							  	   
						    	  }
						    	  
						    	  else{
						    	  var model  = sap.ui.getCore().byId("cartTable").getModel();
						    	  model.refresh(true);
						    	  for(var k = 0 ; k <temp.length ; k++){
							  	   model.getData().datacon1.push({
							  		Product : temp[k].Product,
							  		Material : temp[k].Material,
							  		Unit : temp[k].Unit,
							  		RequiredDelivery: temp[k].RequiredDelivery,
							  		Quantity: temp[k].Quantity,
							  		Price : temp[k].Price,
							  		NetPrice:temp[k].NetPrice,
							  		BaseUnit:temp[k].BaseUnit,
							  		Customer:temp[k].Customer,
							  		Description:temp[k].Description,
							  		Amount:temp[k].Amount,
							  		ItemNo:temp[k].ItemNo
							  	   });
						    	  }
						    	  model.refresh(true);
						    	  }

						    	  cartCnt ++;
//						    	  debugger;
						 		 var tab2 = sap.ui.getCore().byId("cartTable");
								  var count = tab2.getItems().length;
								  sap.ui.getCore().byId("cnt1").setText(count);
								  sap.ui.getCore().byId("cartTable").setHeaderText("Items ("+count+")");
//								var obj = loginResult.results[0];
							
//							  	   console.log(obj);     

						  	    
						    	  
						    	  sap.m.MessageToast.show("Your products are saved to the cart");	 
				        	 }
				      
				         }),
//				         new sap.m.Button("btn_chk",{
//				        	 text : "Checkout",
//				        	 enabled :false,
//				        	 type:"Transparent",
//				        	 press: function(){
//
//									var appPage = sap.ui.getCore().byId("orAppId");
////								
//									appPage.to("orderCheckoutDetail");		 
//				        		 
//				        		 
//				        	 }
				        	 
//				         }),
				       ]
			}).addStyleClass("footerColor") 
		});
	}

});