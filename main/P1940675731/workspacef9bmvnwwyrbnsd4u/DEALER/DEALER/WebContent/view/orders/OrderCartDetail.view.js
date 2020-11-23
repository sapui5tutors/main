
sap.ui.jsview("com.vikalp.dealermgmt.view.orders.OrderCartDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.orders.OrderCartDetail
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.orders.OrderCartDetail";
	},

	/** Is initially called 	once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.orders.OrderCartDetail
	*/ 
	createContent : function(oController) {

		var oLayout2 = new sap.ui.layout.form.ResponsiveGridLayout({
//		    labelSpanL: 3,
          labelSpanM: 4,
//          labelSpanS: 2,
//          emptySpanL: 1,
//          emptySpanM: 1,
//          emptySpanS: 1,
//          columnsL: 2,
//          columnsM: 2,
//          breakpointL: 800,
//          breakpointM: 40
		});
		var cartForm = new sap.ui.layout.form.Form("cartForm",{
			//title: new sap.ui.core.Title({text: "Information",}),
		//	editable: false,
			layout: oLayout2,
			formContainers: [
				new sap.ui.layout.form.FormContainer({
					title: "Delivery Schedules",
					design:"Bold",
					formElements: [
						new sap.ui.layout.form.FormElement({
								label: "Customer",
							fields: [new sap.m.Text("cartCustomer",{text:"{/datacon1/0/Customer}"})]
							
						}),
						new sap.ui.layout.form.FormElement({
							label: "Requested Delivery",
							fields: [new sap.m.DatePicker("cartDate",{
//								dateValue : "{/datacon1/0/RequiredDelivery}",
							  editable:true,
							  width : "20%"})]
						
						}),
				          ]
				}),]
		});
	
		
		
//	var	cartList = new sap.m.List("cartList",{
//		inset: false
//	});
//		
//	 var cartListItem = new sap.m.ObjectListItem("cartListItem",{
//			
//			title : "Delivery Schedules",
////			number:"{OrderValue}",
////			numberUnit:"{Currency}",
////			intro: "{Currency}",
////			introTextDirection :sap.ui.core.TextDirection.RTL ,
//	        attributes:[
//                         {
//                           text : "Customer: {Customer}"	
//                        },
//          
//                        ]
//	 
//	 });
//	 
//	 
//	 cartList.bindAggregation("items","/datacon1",cartListItem);
		 
	     var cartTable = new sap.m.Table({

	  	    id: "cartTable",
	  	    inset : true,
	  	    mode:sap.m.ListMode.Delete,
	  	    headerText: "Items()",
	  	    
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

	  	    text: "Product No." 
	  	    	})

	  	    }),

	  	    new sap.m.Column({

	  	    width: "20%",

	  	    header: new sap.m.Label({

	  	    text: "Requested Quantity"

	  	    })

	  	    }),
	  	    
	  	    

	  	    new sap.m.Column({  

	  	    width: "20%",

	  	    header: new sap.m.Label({

	  	    text: "Requested Delivery"

	  	    })
 
	  	    }),
//	  	  new sap.m.Column({  
//
//		  	    width: "20%",
//
//		  	    header: new sap.m.Label({})
//	 
//		  	    }),
	  	    
	  	      ], 
	  	      delete: function(e) {
//	  	    	  debugger;
		  	         var path = e.getParameter('listItem').getBindingContext().sPath;
		  	         var obj = cartTable.getModel().getProperty(path);
		  	         console.log(obj); 
		  	        hj= cartTable.getModel()
		  	        hj.getData().datacon1.splice(parseInt(path.substring(10)),1);
//		  	         cartTable.removeItem(e.getParameter('listItem'));
		  	         hj.refresh(true);
//		  	       var tab2 = sap.ui.getCore().byId("cartTable");
					  var co = cartTable.getItems().length;
					  cartTable.setHeaderText("Items ("+co+")");
					  sap.ui.getCore().byId("cnt1").setText(co);
//					  
		  	         
		  	        
	  	      }
	  	    
	  	    });
	     
	     
	     
	     
	     var    cartTemplate = new sap.m.ColumnListItem({
	    	
	   	     visible: true,
//	   	    type: "Navigation",
	   	     cells: [ 
	   	              
	   	              new sap.m.Label({
         	          text: "{Product}"
     	    }),
     	   new sap.m.Label({
       	    text: "{Material}"	
       	    }),
	   	           
	               new sap.m.Input("lkj",{
	            	   description :"{Unit}",
                       value:"{Quantity}",
                       textAlign :"Left",
	                	 editable : true,
	                	
	   
	            	      }),

	            	      new sap.m.DatePicker({
	            	    	  dateValue : "{RequiredDelivery}",
	            	   
	            	    }),


	                 ],
	                 
	     });
                   	     cartTable.bindAggregation("items","/datacon1",cartTemplate); 
	     
	    
	     
	     
	     
	     
	     
	     
		
 		    return new sap.m.Page({
		    title: "Cart",
			showNavButton: true,
			
			 navButtonTap:function(){ 
				
//	               var   app = sap.ui.getCore().byId("orAppId");  
//	                  app.back();
				 var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
				 router.navTo("OrdersInfo");
	                  },
			
			footer: new sap.m.Toolbar({

				design : sap.m.ToolbarDesign.Solid,
				content:[
				         new sap.m.ToolbarSpacer({}),
				         new sap.m.Button({
				        	 text : "Checkout",
				        	 
				        	 enabled :true,
				        	 type:"Transparent",
				        	 press: function(evt){
//				        		 debugger;
				        		 var aItems = cartTable.getItems();
				        		   var len = aItems.length;
//				        		var p = cartTable.getItems().length;
				        		obj_cart = cartTable.getModel().oData.datacon1 ;
				        		var	priceArray = [];
				        		 var cell3Array = [];	 
				        		 for (var l = 0; l < len; l++ ){

				        			 priceArray[l] = obj_cart[l].NetPrice;
				        			 cell3Array[l] = obj_cart[l].BaseUnit;
				        			 }
				        		 
				 
				        		   
				        		    var cellArray = [];
				        		    var cell1Array = [];
				        		    var cell2Array = [];
				        		   
				        		    var cell4Array = [];
				        		    for(var i=0 ; i < len ; i++)
				        		    {
				        		      cellArray.push(aItems[i].getAggregation("cells")[0].getProperty("text"));
				        		      cell1Array.push(aItems[i].getAggregation("cells")[1].getProperty("text"));
				        		      cell2Array.push(aItems[i].getAggregation("cells")[2].getProperty("value").trim());
//				        		      cell3Array.push(aItems[i].getAggregation("cells")[2].getProperty("description"));
				        		     var inDate = aItems[i].getAggregation("cells")[3].getProperty("dateValue");
				        		      if(inDate.getHours() == 0)
			        		    	   {
			        		    	   inDate.setHours(5);
			        		    	   inDate.setMinutes(30);
			        		    	  }
			        		       cell4Array.push(inDate);				        		    
				        		    }

				        		    var checkoutJson = new sap.ui.model.json.JSONModel();
				        		    checkoutJson.setProperty("/data89", []);

				        		    for(var i= 0 ;  i < len ; i++ ){
                          
				        		  	    
          oDataModel.read("/Material_availabiltySet(ImDescription='"+cellArray[i]+"'," +"ImMaterial='"+cell1Array[i]+"'," +
          		"ImPrice='"+priceArray[i]+"',ImReqDate=datetime'"+cell4Array[i].toJSON().split(".")[0]+"'," +
				"ImReqQuantity='"+cell2Array[i]+"',ImUnit='"+cell3Array[i]+"')",
				null,null,false,onSuccessLogin,function(oError){console.log("error",oError);}); 	    
				        		    	
//                                          if(i==0){
//				        	    		   checkoutJson.setData({data89:loginResult});}
//				        	    		  else{
				 
//									    	 checkoutJson.refresh(true);
									    	  
//						     				  	 checkoutJson.getData().data89.push({
									    	 var aNew =  checkoutJson.getProperty("/data89");
									    	 var newData = {
										  		 Description : loginResult.Description,
										  		ImMaterial : loginResult.ImMaterial,
										  		Material : loginResult.Material,
										  		Unit : loginResult.Unit,
										  		ImReqDate : loginResult.ImReqDate,
										  		ReqDate : loginResult.ReqDate,
										  		ReqQuantity: loginResult.ReqQuantity,
										  		ImPrice : loginResult.ImPrice,
										  		DateStatus : loginResult.DateStatus,
										  		QuantityStatus: loginResult.QuantityStatus,
										  		Subtotal : loginResult.Subtotal,
										  		BaseUnit:obj_cart[i].BaseUnit,
										  		NetPrice:obj_cart[i].NetPrice
										  	   };
									    	 
									    	 aNew.push(newData);	
									    	
										               
									    	 
									    	 checkoutJson.setProperty("/data89", aNew);
									    	
									         	  checkoutJson.refresh(true);
				        	    		
				        	    	
				        		    }
				        		    debugger;
				        		    var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
									 router.navTo("OrderCheckoutDetail");
									 
				        		 sap.ui.getCore().byId("checkoutTable").setModel(checkoutJson);
				        		 sap.ui.getCore().byId("checkoutTable").bindElement("/data89");
				        		 crtCus = sap.ui.getCore().byId("cartCustomer").getText();
				        		crtDate =  sap.ui.getCore().byId("cartDate").getDateValue();
				        		 sap.ui.getCore().byId("checkoutCustomer").setText(crtCus);
				        		 sap.ui.getCore().byId("checkoutDate").setDateValue(crtDate);
				        		 
//				        		 debugger;
				        		 
				        		 
							     var bItems = sap.ui.getCore().byId("checkoutTable").getItems();
					  		     var len = bItems.length;
							
					  		   sap.ui.getCore().byId("checkoutTable").setHeaderText("Items("+len+")");
					  		 var total = 0 ;
					  	   		
					  	   		var sub ; 
							       for(var i=0 ; i < len ; i++)
					 		        {
							         sub = parseInt(bItems[i].getAggregation("cells")[6].getProperty("text"));
							            total = total + sub ; 
					  		           }
							       sap.ui.getCore().byId("total").setText(total);
							       
//				        		 var aContexts = table.getSelectedContexts();
//							      var items = aContexts.map(function(c) {
//							          return c.getObject();
//							      })
//							        sap.m.MessageToast.show(JSON.stringify(items));
							            
				        		 
				        		 
				        
//				        		 	var appPage = sap.ui.getCore().byId("orAppId");
//									    appPage.to("orderCheckoutDetail");   
							       
										
										
	                  
				        	 }	
				       }) 
				       ]
				       }).addStyleClass("footerColor"),
				       content: [
				                 cartForm ,cartTable
							],
		});
	}

});