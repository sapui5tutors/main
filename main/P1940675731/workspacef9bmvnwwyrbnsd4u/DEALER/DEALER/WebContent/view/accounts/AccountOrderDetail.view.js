sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountOrderDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountOrderDetail
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountOrderDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountOrderDetail
	*/ 
	createContent : function(oController) {
		var oHeaderDetail = new sap.m.List("headerlist",{
			inset:false,
		});
		var oHeaderDetailItem = new sap.m.ObjectListItem({
//			"headerlisttemplate",
       	 	   title:"Sales Order {ImSalesorder}",
	    	   number:"{OrderValue}",
	    	   numberUnit:"{Currency}",
	    	   attributes: [{
	    		   text:"PO: {PurchOrd}"
	            },
	    		           { 
	            text:{
	            	path:"OrderDate",
	            	formatter : function(evt){
	            		return 'Ordered: '+ com.vikalp.dealermgmt.util.Formatter.OrderDate.call(null,evt)
	            	}
	            		
	            	},
	    		           },
	    		           
	    		           { 
	    		text:{
	    			  path:"RequestedDate",
	    			 formatter :  function(evt){
	    			            		return 'Requested: '+ com.vikalp.dealermgmt.util.Formatter.OrderDate.call(null,evt)
	    			            	} 
	    			            		
	    			            	},
	    			    		           },
	            
//	    		            {
//	    		   	text:"Requested: {RequestedDate}"
//	    		            },
	    		            {
	    		    		   	text:"Ship To: {ShipTo}"
	    		    		            },
	    		    		            
	    		            ],
	    		            firstStatus:[{
	    		            	text:"Overall Status: {OverallStatus}",
	    		            
	    		            }],
	    		            secondStatus:[{
	    		            	text:"Delivery Status: {DeliveryStatus}",
		    		            state:{
		    		            	path:"DeliveryStatus",
		    		            		formatter:function(id)
		    		            		{
		    		            			if(id=="Shipped")
		    		            			{
		    		            			return "Success"
		    		            			}
		    		            			else if(id=="Not Shipped")
		    		            			{
		    		            			return "Error"
		    		            			}
		    		            			else if(id=="In Process")
		    		            			{
		    		            			return "Warning"
		    		            			}
		    		            		}
		    		            
	    		            	}}]
	    		
	   });
//        secondStatus:[{
//        	text:{
//        		path:"OrderDate",
//        	formatter : com.vikalp.dealermgmt.util.Formatter.OrderDate
//        	}}]


 			
         oHeaderDetail.bindAggregation("items","/data1",oHeaderDetailItem);
         
         oHeaderDetail.addEventDelegate({
	    	 onAfterRendering: function() {
	    		 debugger;
	    	 var oObjectText = $('#__status8-headerlist-0').find('.sapMObjStatusText');
	         for (var i = 0; i < oObjectText.length; i++) {
	           var innerHTML = oObjectText[i].innerHTML;
	           var oLength = innerHTML.length;
	           var oSelected = innerHTML.substring(0, 17);
	           var oStatusText = innerHTML.substring(17, oLength);
	           innerHTML = "<span class='highlight'>" + oSelected + "</span>" + oStatusText;
	           oObjectText[i].innerHTML = innerHTML;
	         }
	    	 }
	     },oHeaderDetail);
         
         var Z_DMA_oHeaderDetail = new sap.m.FlexBox("HeaderWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[oHeaderDetail]
         })
        
//         var oItem = new sap.m.List("headerlist",{
// 			inset:false,
// 			  
//// 			
// 		});
// 		var oHeaderItemtemplate = new sap.m.ObjectListItem({
// 		
// 			
// 		});
        ///////////////////
         var oTable = new sap.m.Table({

             id: "itemstable",

//             itemPress : [ oController.ItemPress,oController ],

             columns: [

             new sap.m.Column({

             width: "20%",

             header: new sap.m.Label({

             text: "Description"  }) }),

             new sap.m.Column({

             width: "20%",

             header: new sap.m.Label({

             text: "Order Quantity" })

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
                 
                 //////////////////
             var template = new sap.m.ColumnListItem({

            	 

                 id: "ItemTemplate",

                 type: "Navigation",

                visible: true,

                 cells: [

    

                 new sap.m.Label( {

                  text: "{Description}"

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

//                   new sap.m.Label({
//
//                   text: "{StatusSummery}"
//
//                     }),
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
                 	    	}     ),
                     new sap.m.Label({

                         text: "{Shipped}"

                           })

                   ],
                   press : oController.onTableItemClicks

   });		 
             oTable.bindAggregation("items","/data2",template);
             
             var Z_DMA_oitemsDetail = new sap.m.FlexBox("ItemsWrappers",{
 				
 				width:"100%",
 				direction:"Column",
 				items:[oTable
             ] })
 ///////// TABLES ACC TO STATUS
             var openTab = new sap.m.Table({

         	    id: "openTab" ,


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
         	 id: "temp1",
        	     type: "Navigation",
        	     visible: true,
        	     cells: [
        	           
                    new sap.m.Label({
                 	    text: "{Description}",
//                 	    design : "Bold"
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
          press : oController.onTableItemClicks
          	
          });
         
//          var f1 = new  sap.ui.model.odata.Filter('StatusSummery', sap.ui.model.FilterOperator.EQ, "Open");  
//          openTable.bindAggregation("items","/data2",templ,f1 );
          
          var f1 = new  sap.ui.model.Filter('StatusSummery', "EQ" , "Open");   
          openTab.bindItems("/data2",templ,null, f1); 
          
          
          var inProcessTab = new sap.m.Table({

      	    id: "inProcessTab",

//      	    itemPress : [ oController.ItemPress,oController ],

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
      	 id: "Items2",
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
        	    press : oController.onTableItemClicks
              	    
       	
       });
//          
//          var f2 = new  sap.ui.model.odata.Filter('StatusSummery', sap.ui.model.FilterOperator.EQ, "In Process");
//          inProcessTable.bindAggregation("items","/data2",templ2,f2 );
          
          var f2 = new  sap.ui.model.Filter('StatusSummery', "EQ" , "In Process");   
          inProcessTab.bindAggregation("items",{path:"/data2", template:templ2, filters:f2}); 
          
          
          var shippedTab = new sap.m.Table({

       	    id: "shippedTab",

//       	    itemPress : [ oController.ItemPress,oController ],

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
       	 id: "Items3",
       	type: "Navigation",
      	     visible: true,
      	     cells: [
      	           
                  new sap.m.Label({
               	    text: "Description",
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
               	 press : oController.onTableItemClicks
        
        });
//          var f3 = new  sap.ui.model.odata.Filter('StatusSummery', sap.ui.model.FilterOperator.EQ, "Shipped");
//          shippedTable.bindAggregation("items","/data2",templ3,f3 );
          
          var f3 = new  sap.ui.model.Filter('StatusSummery', "EQ" , "Shipped");   
          shippedTab.bindAggregation("items",{path:"/data2", template:templ3, filters:f3}); 
             
             
             ///////////////////
 //coding for contact tab           
             var oContactList = new sap.m.List("contactlist",{
      			inset:false,});
             
      		var oContactlisttemplate = new sap.m.ObjectListItem({
      			title:"{Firstname}",
// 	    	   number:"Mobile: {MobileNumber}",
 	    	   intro:"{ImCustomerid}",
 	    	  attributes: [
 	    	               {
	    			
	    			text:"{SalesOrganization}"
	    		             },
	    		             {
	    			    			
	    			    			text:"{DistributionChannel}"
	    			    		             },
	    		            {
	    			text:"Address: {Street},{Region},{City},{Country},{PostalCode}"
	    		            },
	    		            {
	    		   	text:"Division: {Divison}"
	    		            }
	    		],
	    		firstStatus: {
	    			icon:"sap-icon://iphone",
	    		   	text:"{MobileNumber}"
	            },
	    		             secondStatus: {
	    		            	 icon:"sap-icon://email",
	    		            	 text:"{EMail}"},
      		});
      		oContactList.bindAggregation("items","/data3",oContactlisttemplate);
      		var Z_DMA_contacts = new sap.m.FlexBox({
 				
 				width:"100%",
 				direction:"Column",
 				items:[oContactList
             ] })
      		
      		
      		
      		
      		
      		
      		
      		
//      		var oCreditList = new sap.m.List("creditlist",{
//      			inset:false,});
//             
//      		var oCreditlisttemplate = new sap.m.ObjectListItem({
//      			title:"Control Area: {ControlArea}",
// 	    	   number:"Credit Limit: {CreditLimit}",
//// 	    	   intro:"{ImCustomerid}",
// 	    	  attributes: [{
//	    		   	text:"Credit Account: {CreditAccount}"
//	            },
//	    		            {
//	    			text:"Sales Value: {SalesValue}"
//	    		            },
//	    		            {
//	    		   	text:"Receivables: {Receivables}"
//	    		            }
//	    		],
//	    		firstStatus: {
//	    			
//	    			text:"Liabilities: {Liabilities}"
//	    		             },
//	    		             secondStatus: {
//	    			    			
//	    			    			text:"Exceeded Date: {ExceededDate}"
//	    			    		             }
//      		});
//      		oCreditList.bindAggregation("items","/data4",oCreditlisttemplate);
//      		var Z_DMA_credit = new sap.m.FlexBox({
// 				
// 				width:"100%",
// 				direction:"Column",
// 				items:[oCreditList
//             ] })
 //////////////////            
             
             
     		var info = new sap.m.IconTabFilter("infotab",{
     			
     			icon:"sap-icon://hint",
     			count:"",
     			text:"Information",
     			content:[Z_DMA_oitemsDetail]
     		});
     		
     		var contacts = new sap.m.IconTabFilter("Contactstab",{
     			
     			icon:"sap-icon://company-view",
     			count:"",
     			text:"Contacts",
     			content:[Z_DMA_contacts]
     		});
     		 var openicon = new sap.m.IconTabFilter("openicontab",{
     			text: "Open",
     			count:"",
     			icon:"sap-icon://task",
     			iconColor:"Critical" , 
//     			count:"",
     			content:[
     			         openTab
     			         ]
     		});
            
            var inProcessicon = new sap.m.IconTabFilter("inProcessicontab",{
     			text: "In Process",
     			count:"",
     			icon:"sap-icon://process",
     			iconColor:"Negative",  
     			content:[
     			         inProcessTab]
     		});
             
            var shippedicon = new sap.m.IconTabFilter("shippedicontab",{
     			text: "Shipped",
     			count:"",
     			icon:"sap-icon://shipping-status",
     			iconColor: "Positive",
     	        content:[ shippedTab]
     		});
//     		var credit = new sap.m.IconTabFilter("i3",{
//     			
//     			icon:"sap-icon://credit-card",
//     			count:"",
//     			text:"Credit Info",
//     			content:[Z_DMA_credit]
//     		});
     		
//     		var SalesSummary = new sap.m.IconTabFilter("i4",{
//     			
//     			icon:"sap-icon://my-sales-order",
//     			count:"",
//     			text:"Sales Info",
//     			content:[]
//     		});
     		var profileTabFilter = new sap.m.IconTabBar({
     			
     			items:[info,openicon,inProcessicon,shippedicon,contacts]
//     			content:[new sap.m.Button({text:"Click ME"})]
     		});
     		 var Z_DMA_oContainer = new sap.m.FlexBox({
 				
 				width:"100%",
 				direction:"Column",
 				items:[profileTabFilter]
 				
 			}).addStyleClass("Z_DMA_oContainer")
	
 		return new sap.m.Page({
			title: "Sales Order",
  			showNavButton: true,
			navButtonPress:[oController.onNavButtonTap,oController],
//			 navButtonTap:function(){ 
////	               var app = sap.ui.getCore().byId("appNavContainer");  
////	                 app.backTo("account");
//	             	window.history.go(-1);
//	                 },
			content: [
//profileTabFilter
//oHearderDetail
Z_DMA_oHeaderDetail,Z_DMA_oContainer
			]
		});
	}

});