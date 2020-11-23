sap.ui.jsview("com.vikalp.dealermgmt.view.orders.OrderCheckoutDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.orders.OrderCheckoutDetail
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.orders.OrderCheckoutDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.orders.OrderCheckoutDetail
	*/ 
	createContent : function(oController) {
		
   		
   		var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout({
   		 labelSpanM: 4,
   		});
		var chkForm = new sap.ui.layout.form.Form("ckhForm",{
			//title: new sap.ui.core.Title({text: "Information",}),
		//	editable: false,
			layout: oLayout1,
			formContainers: [
				new sap.ui.layout.form.FormContainer({
					title: "Delivery Schedules",
					design:"Bold",
					formElements: [
						new sap.ui.layout.form.FormElement({
							label: "Customer",
							fields: [new sap.m.Text("checkoutCustomer",{editable:false})]
							
						}),
						new sap.ui.layout.form.FormElement({
							label: "Requested Delivery",
							fields: [new sap.m.DatePicker("checkoutDate",{
		            	    	  
								  editable:true,
								  width : "20%"})]
						}),
				          ]
				}),]
		});

		
		

		
		
		
	  var checkoutTable = new sap.m.Table({

		  	    id: "checkoutTable",
		  	    inset : true,
		  	    mode:sap.m.ListMode.Delete,
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
					  	   footer : new sap.m.Label("total",{
					  		   text: "0" 	
					  		  })
				 
					  	    }),
		  	    
		  	    
		  	    
		  	      ], 
		  	      delete : function(e) {
//		  	    	  debugger;
			  	         var path = e.getParameter('listItem').getBindingContext().sPath;
			  	         var obj = checkoutTable.getModel().getProperty(path);
			  	         console.log(obj); 
			  	        hj1= checkoutTable.getModel();
			  	        hj1.getData().data89.splice(parseInt(path.substring(8)),1);
//			  	         cartTable.removeItem(e.getParameter('listItem'));
			  	         hj1.refresh(true);
			  	         
//			  	       hj=  sap.ui.getCore().byId("cartTable").getModel();
//			  	        hj.getData().datacon1.splice(parseInt(path.substring(8)),1);
////			  	         cartTable.removeItem(e.getParameter('listItem'));
//			  	         hj.refresh(true);
////			  	       var tab2 = sap.ui.getCore().byId("cartTable");
//						  var co = sap.ui.getCore().byId("cartTable").getItems().length;
//						  
//						 
//						  sap.ui.getCore().byId("cartTable").setHeaderText("Items ("+co+")");
//						  sap.ui.getCore().byId("cnt1").setText(co);
//
						 var cItems = checkoutTable.getItems();
			  		     var len = cItems.length;
			  		   checkoutTable.setHeaderText("Items ("+len+")");
			  		 sap.ui.getCore().byId("cartTable").setHeaderText("Items ("+len+")");
			  		sap.ui.getCore().byId("cnt1").setText(len);
					
			  		
			  	       var total1 = 0 ;
			  	   	   var sub ; 
					       for(var i=0 ; i < len ; i++)
			 		        {
					         sub = parseInt(cItems[i].getAggregation("cells")[6].getProperty("text"));
					            total1 = total1 + sub ; 
			  		           }
					       sap.ui.getCore().byId("total").setText(total1);
					       temp = checkoutTable.getModel().oData.data89;
					       var model  = sap.ui.getCore().byId("cartTable").getModel();
					       model.setProperty("/datacon1",[]);
//					       sap.ui.getCore().byId("cartTable").setProperty("/datacon1",[]);
					       
					       var bNew =  model.getProperty("/datacon1");			    	 
					       	
					    	  for(var k = 0 ; k < len ; k++){
						  	   var bnewData = {
						  			 Product: temp[k].Description,
						  			Material: temp[k].Material,
						  		    Unit : temp[k].Unit,
						  	     	RequiredDelivery: temp[k].ReqDate,
						  		    Quantity: temp[k].ReqQuantity,
						  		    Price : temp[k].ImPrice,
						  		    NetPrice:temp[k].NetPrice,
						  		    BaseUnit:temp[k].BaseUnit
						  	   }
						  	 bNew.push(bnewData);
						  	 model.refresh(true);
						  	   }
					    	  model.setProperty("/datacon1", bNew);
					    	  	
					    	  model.refresh(true);
					    	  
					    	  }
	  
	        
  	      			       
	   	
    	
	               
    	 
    	
		  	    
		  	    });
		     
		     
		     
		     
		     var    checkoutTemplate = new sap.m.ColumnListItem({
		    	
		   	     visible: true,

		   	     cells: [ 
		   	              
		   	              new sap.m.Label({
	         	          text: "{ImMaterial}{Description}"
	     	    }),
	     	  
		   	           
		               new sap.m.Input({
		            	   value:"{ReqQuantity}",
		            	   description: "{Unit}",
	                      width: "150%",
		                	 editable : true,
		                	
		                 }),
		                 
		                 new sap.m.DatePicker({
	            	    	  dateValue : "{ImReqDate}",
//	            	    	   formatter :function(id){
//	            	    		   debugger;
//	            	    		  var  date = id.getDate();
//	            	    		  date = date + 1;
//	            	    		  
//	            	    		  id.setDate(date);
//	            	    		  
//	            	    		  
//	            	    		   return id;
// 	            	    		   }
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
		     checkoutTable.bindAggregation("items","/data89",checkoutTemplate); 
		    
		
    		return new sap.m.Page({
			title: "Price and Availability Check",
			showNavButton: true,
			navButtonTap:function(){ 
				 debugger;
//				 var   app = sap.ui.getCore().byId("orAppId");
//				 app.back();
				 var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
				 router.navTo("OrderCartDetail");
				 var inDate;
				 var chkDate;
				  chkCus = sap.ui.getCore().byId("checkoutCustomer").getText();
	        		chkDate =  sap.ui.getCore().byId("checkoutDate").getDateValue();
	        		 sap.ui.getCore().byId("cartCustomer").setText(chkCus);
	        		 sap.ui.getCore().byId("cartDate").setDateValue(chkDate);
				 var dItems = checkoutTable.getItems();
				 var dlen = dItems.length;
				 var jkItems = sap.ui.getCore().byId("cartTable").getItems();
				  for(var i=0 ; i < dlen ; i++)
      		    {

      		       var val1 = dItems[i].getAggregation("cells")[1].getProperty("value");
                                 jkItems[i].getAggregation("cells")[2].setProperty("value").setValue(val1);
      		     inDate = dItems[i].getAggregation("cells")[2].getProperty("dateValue");
      		                     jkItems[i].getAggregation("cells")[3].setProperty("dateValue").setDateValue(inDate);
//      		       if(indDate.getHours() == 0)
//      		    	   {
//      		    	   indDate.setHours(5);
//      		    	   indDate.setMinutes(30);
//      		    	  }
//      		       cell4CheckArray.push(indDate);
      		    }
				
				 
	              
	                     
//	                     sap.ui.getCore().byId("cartDate").setDateValue(chkDate);
	                    
	                  },
			
			content: [
                 chkForm, checkoutTable
			],
			
			footer: new sap.m.Toolbar({
//				active: true ,
				design : sap.m.ToolbarDesign.Solid,
				content:[
				         
                       new sap.m.ToolbarSpacer({}),
				       new sap.m.Button("up",{
				        	 text : "Update",
				        	 type:"Transparent",
				        	 press: function(evt){
//				        	  debugger;
				        	  
				        	  var dItems = checkoutTable.getItems();
			        		   var len = dItems.length;
//			        		var p = cartTable.getItems().length;
			        		obj_check = checkoutTable.getModel().oData.data89 ;
			        		var	priceCheckArray = [];
			        		var cellCheckArray = [];
			        		var cell1CheckArray = [];
		        		    var cell2CheckArray = [];
			        		 var cell3CheckArray = [];
			        		 var cell4CheckArray = [];
			        		 for (var l = 0; l < len; l++ ){

			        			 priceCheckArray[l] = obj_check[l].ImPrice;
			        			 cellCheckArray[l] = obj_check[l].Description;
			        			 cell1CheckArray[l] = obj_check[l].ImMaterial;
			        			 cell3CheckArray[l] = obj_check[l].Unit;
			        			 
			        			 }
			        		 
			 
			        		   
			        		    
			        		    
			        		   
			        		   
			        		    for(var i=0 ; i < len ; i++)
			        		    {

			        		      cell2CheckArray.push(dItems[i].getAggregation("cells")[1].getProperty("value").trim());

			        		     var indDate = dItems[i].getAggregation("cells")[2].getProperty("dateValue");
			        		       if(indDate.getHours() == 0)
			        		    	   {
			        		    	   indDate.setHours(5);
			        		    	   indDate.setMinutes(30);
			        		    	  }
			        		       cell4CheckArray.push(indDate);
			        		    }

//			        		    var checkoutJson = new sap.ui.model.json.JSONModel();
//			        		    checkoutJson.setProperty("/data89", []);
			        		    var checkoutJson =   sap.ui.getCore().byId("checkoutTable").getModel();  
                                checkoutJson.setProperty("/data89", []);
			        		    for(var i= 0 ;  i < len ; i++ ){
                     
			        		  	    
     oDataModel.read("/Material_availabiltySet(ImDescription='"+cellCheckArray[i]+"'," +"ImMaterial='"+cell1CheckArray[i]+"'," +
     		"ImPrice='"+priceCheckArray[i]+"',ImReqDate=datetime'"+cell4CheckArray[i].toJSON().split(".")[0]+"'," +
			"ImReqQuantity='"+cell2CheckArray[i]+"',ImUnit='"+cell3CheckArray[i]+"')",
			null,null,false,onSuccessLogin,function(oError){console.log("error",oError);}); 	    
			        		    	
                                
                         
                                         
								    	 var aNew =  checkoutJson.getProperty("/data89");
								    	 var newData = {
									  		 Description : loginResult.Description,
									  		ImMaterial : loginResult.ImMaterial,
									  		Unit : loginResult.Unit,
									  		ImReqDate : loginResult.ImReqDate,
									  		ReqDate : loginResult.ReqDate,
									  		ReqQuantity: loginResult.ReqQuantity,
									  		ImPrice : loginResult.ImPrice,
									  		QuantityStatus : loginResult.QuantityStatus,
									  		DateStatus: loginResult.DateStatus,
									  		Subtotal : loginResult.Subtotal
									  	   };
								    	 
								    	 aNew.push(newData);
								    	
									   checkoutJson.setProperty("/data89", aNew);
								    	
								         	  checkoutJson.refresh(true);
			        	    		
			        	    	
			        		    }
			        		  
			        		 checkoutTable.setModel(checkoutJson);
//			        		 debugger;
						     var bItems = checkoutTable.getItems();
				  		     var len = bItems.length;
						
				  		   checkoutTable.setHeaderText("Items ("+len+")");
				  		 var total = 0 ;
				  	   		
				  	   		var sub ; 
						       for(var i=0 ; i < len ; i++)
				 		        {
						         sub = parseInt(bItems[i].getAggregation("cells")[6].getProperty("text"));
						            total = total + sub ; 
				  		           }
						       sap.ui.getCore().byId("total").setText(total);  
				        
						       
						       
				        	  
				        	  }
				        }),
				         new sap.m.Button("review",{
				        	 text : "Review Shipping",
				              type:"Transparent",
				        	 press: function(){
				        		 
//				 oDataModel.read("/ShipToPartyInfoSet?$filter=Kunnr eq '"+customerId[0]+"' and SalesOrg eq '"+SalesOrg1[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
//				    	var reviewListJson = new sap.ui.model.json.JSONModel();
//				      reviewListJson.setData({data121:loginResult.results});
//				       sap.ui.getCore().byId("reviewlist1").setModel(reviewListJson);
				        		 
				        			debugger;
				        			cusId = customerId[0];
				        			salOrg = SalesOrg1[0];
				        			var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
									 router.navTo("OrderShippingDetail");
									 
 oDataModel.read("/ShipToPartyInfoSet?$filter=ImKunnr eq '"+cusId+"' and ImSalesOrg eq '"+salOrg+"'"
		 ,null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				        		    	var shipListJson = new sap.ui.model.json.JSONModel();
				        		      shipListJson.setData({data121:loginResult.results});
//				        		       sap.ui.getCore().byId("shiplist1").setModel(shipListJson);
				        		      sap.ui.getCore().byId("shippingForm").setModel(shipListJson);
//				        		      sap.ui.getCore().byId("shippingForm").bindElement("/");
				        		      

//									var appPage = sap.ui.getCore().byId("orAppId");
//								    appPage.to("orderShippingDetail");
//									 
				        	 }
				        	 
				         })
                       ]
			}).addStyleClass("footerColor") 
			
		});
	}

});