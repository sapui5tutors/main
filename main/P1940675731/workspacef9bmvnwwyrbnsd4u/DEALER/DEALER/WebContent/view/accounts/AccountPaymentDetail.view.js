sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountPaymentDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountPaymentDetail
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountPaymentDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountPaymentDetail
	*/ 
	createContent : function(oController) {
		debugger;
		var headerListInvoice = new sap.m.List("headerListInvoice",{
			inset: false,
//			updateFinished : function(oEvent){  
//			oEvent.getSource().getItems()[0].setSelected(true);
//		}
			
		});
//		debugger;
        var headerListItem = new sap.m.ObjectListItem({
//        	"headerListItem",
			title : "Invoice {ImBillingDocument}",
			number:"{NetValue}",
			numberUnit:"{Currency}",
//			intro: "Bill To: {BillTo1}",
//	        type:"Active",
	       
	        attributes: [
	                     {
	                    	text: ""
	                     },
	    		            {
	    			text: "Bill To: {BillTo1}"
	    		            },
	    		            {
	    		    			text:"{BillTo2}"
	    		    		            },
//	    		            {
//	    		            	 text: {
//	    		                      path: "InvoiceDate",
//	    		                      formatter: com.vikalp.dealermgmt.util.Formatter.OrderDate
//	    		            		         
//	    		                 }
//	    		            }
	    		],
	    		firstStatus:[
	                           {
		text : "{PaytStatus}",
		 state:{
	    	 
	        	path:"PaytStatus",
	        	formatter: function(id){
	             
	              			if(id == "Past Due")
	              			{
	              			return "Error";
	              			}
	              		if(id  == "Unpaid")
	              			{
	              			return "Error"
	              			}
	              		if(id =="Disputed")
	              			{
	              			return "Error"
	              			}
	              		}
	              		} }
				                          ],
	    		  secondStatus:[
	    		                {
	    		                  text: {
	    		                         path: "InvoiceDate",
//	    		                         formatter: com.vikalp.dealermgmt.util.Formatter.OrderDate
	    		                         formatter: function(id){
//	 	    		              			debugger;
//	 	    		                    	if(id != null){
	 	    		            			date_value = id.getDate();
	 	    		                        mon_value = id.getMonth();
	 	    		                        year_value  = id.getFullYear();
	 	    		                        
	 	    		                        switch  (mon_value){
	 	    		                        case  0:
	 	    		                         {
	 	    		          	             mon_value = "01";
	 	    		          	              break;
	 	    		                         }
	 	    		                        case  1:
	 	    		                         {
	 	    		          	             mon_value = "02";
	 	    		          	             break;
	 	    		                          }
	 	    		                        case  2:
	 	    		                         {
	 	    		          	             mon_value = "03";
	 	    		          	             break;
	 	    		                         }
	 	    		                        case  3:
	 	    		                         {
	 	    		          	             mon_value = "04";
	 	    		          	             break;
	 	    		                         }
	 	    		                        case  4:
	 	    		                         {
	 	    		          	             mon_value = "05";
	 	    		          	             break;
	 	    		                         }
	 	    		                        case  5:
	 	    		                         {
	 	    		          	             mon_value = "06";
	 	    		          	             break;
	 	    		                         }
	 	    		                        case  6:
	 	    		                         {
	 	    		          	             mon_value = "07";
	 	    		          	             break;
	 	    		                         }
	 	    		                        case  7:
	 	    		                         {
	 	    		          	             mon_value = "08";
	 	    		          	             break;
	 	    		                         }
	 	    		                        case  8:
	 	    		                         {
	 	    		          	             mon_value = "09";
	 	    		          	            break;
	 	    		                        }
	 	    		                        case  9:
	 	    		                         {
	 	    		          	             mon_value = "10";
	 	    		          	             break;
	 	    		                         }
	 	    		                        case  10:
	 	    		                     	{ 
	 	    		          	             mon_value = "11";
	 	    		          	             break;
	 	    		                         }
	 	    		                        case  11:
	 	    		                         {
	 	    		          	             mon_value = "12";
	 	    		          	             break;
	 	    		                         }
	 	    		                }
	 	    		                        
	 	    		                var date ="Invoice Date: " + date_value + "." + mon_value +"."+ year_value; 
	 	    		                return date;
	 	    		               }
	 	    		                      
	 	    		            		         
	 	    		                 
	    		               		         
	    		                  }  }
	    		                ],	    		                
	    		
		});


	
        headerListInvoice.bindAggregation("items","/data1",headerListItem);
        
   var Z_DMA_headerListInvoice = new sap.m.FlexBox({
//	   "headerWrapper",
		width:"100%",
		direction:"Column",
		items:[headerListInvoice]
})
   var itemTable = new sap.m.Table({

	    id: "itemTableInvoice",

//	    itemPress : [ oController.ItemPress,oController ],

	    columns: [

	    new sap.m.Column({

	    width: "20%",

	    header: new sap.m.Label({

	    text: "Discription",
	    design: sap.m.LabelDesign.Bold
	    	})
	    }),

	    new sap.m.Column({

	    width: "20%",

	    header: new sap.m.Label({

	    text: "Quantity",
	    design: sap.m.LabelDesign.Bold
	    	})

	    }),

	    new sap.m.Column({

	    width: "20%",

	    header: new sap.m.Label({

	    text: "Unit Price",design: sap.m.LabelDesign.Bold

	    })

	    }),
	    

	    new sap.m.Column({  

	    width: "20%",

	    header: new sap.m.Label({

	    text: "Subtotal",
	    design: sap.m.LabelDesign.Bold

	    })

	    }),
	   
	      ]
	    });
	        
	    var itemTableTemplate = new sap.m.ColumnListItem({

//	       id: "ItemTemplate",
//	   	 type: "Navigation",
	   	     visible: true,
	   	     cells: [
	               new sap.m.Label({
	            	    text: "{Description}"
	            	      }),

	               new sap.m.Label({
	            	    text: "{Quantity}"
	            	    }),

	               new sap.m.Label({
	            	    text: "{UnitPrice}"

	                    }),

	               new sap.m.Label({
	            	    text: "{Subtotal}"
	            	    
	               }),
	               ]  ,
//	              select : oController.onTableItemClick  

	            });		 
	     itemTable.bindAggregation("items","/data2",itemTableTemplate);
	     
	     var Z_DMA_oitemsDetail = new sap.m.FlexBox("ItemsWrapper1",{
			
			              width:"100%",
			              direction:"Column",
			              items:[itemTable]
	      });	
 
   
   
   var overViewList = new sap.m.List("overViewList",{
		inset: false
	});
   var overViewListItem = new sap.m.ObjectListItem({
//   	"overViewListItem",
		title : "Sales Order: {SalesOrder}",
		number:"Item Total: {ItemTotal}",
		numberUnit:"Total Freight: {TotalFreight}",
		intro: "Purchase Order: {PurchaseOrder}",
//       type:"Active",
      
       attributes: [
                    {
                   	text: "Ref.Invoice {RefInvoice}"
                    },
   		            {
   			text: "Payment Terms: {PaytTerms}"
   		            },
   		            {
   		    			text:"Carrier: {Carrier}"
   		    		            },
   		    		         {
   		    		    			text:"Incoterms: {Incoterms}"
   		    		    		            },

   		],
   		firstStatus: {
			
			text:"Total Tax: {TotalTax}",
		             },
   		
		             secondStatus: {
		        			text:"Total Amount: {TotalAmount}",		        			
		        			text:"Balance: {Balance}",		        					        			
		        		}  
   		
	});
   overViewList.bindAggregation("items","/data3",overViewListItem);

   var Z_DMA_overViewDetail = new sap.m.FlexBox("overViewDetail",{
		
       width:"100%",
       direction:"Column",
       items:[overViewList]
       });
   
   
   
   var informationList = new sap.m.List("informationList",{
		inset: false
	});
   var informationListItem = new sap.m.ObjectListItem({
	   intro : "{Role}",
	   icon: "sap-icon://employee",
	   title : "{Name1} {Name2}",
	   number:"Company:",
//	   numberUnit:"Name: {McName1}",
//	   type:"Active",
	   attributes: [
	                {
	                text:"Mobile : {Telpr}"	
	                },
	                {
		                text:"Phone : "	
		                },
		                {
			                text:"Email : "	
			                },
	                ],
	            	firstStatus: {
	        			
	        			text:"Name : {McName1}"
	        		             },
	        		secondStatus: {
	        			text:"Address : {McCity1}"
	        		}             
   })
   informationList.bindAggregation("items","/data4",informationListItem);
   
   var Z_DMA_informationDetail = new sap.m.FlexBox("informationDetail",{
		
       width:"100%",
       direction:"Column",
       items:[informationList]
       });

   
   
   

   

 var creditInfoTab = new sap.m.IconTabFilter("iT",{
	    text:"Information",
		icon:"sap-icon://hint",
//		count :"",
		content:[
Z_DMA_overViewDetail
	        ]
	   }); 	        
   	         
 var orders = new sap.m.IconTabFilter({
	    text:"Overview",
		icon:"sap-icon://company-view",
		content:[
Z_DMA_informationDetail   
	            ]
	   }); 
 
 var profileTabFilter = new sap.m.IconTabBar({
		
		items:[creditInfoTab,orders],
//		content:[new sap.m.Button({text:"Click ME"})]
	    });
 
 var Z_DMA_oContainer = new sap.m.FlexBox({
     
     width:"100%",
     direction:"Column",
     items:[profileTabFilter]
     
 }).addStyleClass("Z_DMA_oContainer");
 
 
 var counterList = new  sap.m.List("counter1",{
		headerText: "",
			design: "Bold",
			items:{
				template: new sap.m.ObjectListItem({
//					title: ""
				})
			}
		});
 
		
	 return new sap.m.Page({
//			title: "Invoice",
			headerContent: new sap.m.Label({text:"Invoices",textAlign:sap.ui.core.TextAlign.Center,design: sap.m.LabelDesign.Bold,width:'100%'}),

			showNavButton: true,
			navButtonPress:[oController.NavButtonTap,oController],
			
			 footer: new sap.m.Toolbar({
					active: true ,
					design : sap.m.ToolbarDesign.Solid,
//					content:[
//					         new sap.m.ToolbarSpacer({}),
//  					        new sap.m.Button({
//    					    	  icon:"sap-icon://action",
//    					    	   }),
//					      ]
				}).addStyleClass("footerColor") ,
			
			content: [
            Z_DMA_headerListInvoice,Z_DMA_oContainer,counterList,Z_DMA_oitemsDetail
			]
		});
	}

});