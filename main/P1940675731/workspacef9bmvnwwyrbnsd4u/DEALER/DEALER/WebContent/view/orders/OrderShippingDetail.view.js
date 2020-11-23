sap.ui.jsview("com.vikalp.dealermgmt.view.orders.OrderShippingDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.orders.OrderShippingDetail
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.orders.OrderShippingDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.orders.OrderShippingDetail
	*/ 
	createContent : function(oController) {
		
	

//		  var oShipList = new sap.m.List("shiplist1",{
//		 	inset:false,});
//		        
//		 	var oShiplisttemplate = new sap.m.ObjectListItem({
//		 	title:"{ImKunnr}",
////			   	  number:"Mobile: {MobileNumber}",
//		   	  intro:"{ImSalesOrg}",
//		   	 attributes: [
//		   	              {
//		   	
//		   	text:"Name:{Name1}"
//		   	            },
//		   	            {
//		   	   	
//		   	   	text:"Address: {Address}"
//		   	   	            },
//		   	           {
//		   	text:"City: {City}"
//		   	           },
//		   	           {
//		   	  text:"State: {State}"
//		   	           },
//		   	           {
//		   	   	  text:"Zip: {Zip}"
//		   	   	           },
//		   	   	           {
//		   	   	   	  text:"Country: {Country}"
//		   	   	   	           },
//		   	   	   	           {
//		   	   	   	   	  text:"phoneNo: {PhoneNo}"	
//		   	   	   	   	           },
//		   	   	   	   	           {
//		   	   	   	   	   	  text:"incoterms: {Incoterms}"
//		   	   	   	   	   	           },
//		   	],
//		   	
//		 	}
//		 	);
//
//		  oShipList.bindAggregation("items","/data121",oShiplisttemplate);
	
		
   		var oLayout = new sap.ui.layout.form.ResponsiveGridLayout({
   		 labelSpanM: 4,
   		});
   		
		var shippingForm = new sap.ui.layout.form.Form("shippingForm",{
			//title: new sap.ui.core.Title({text: "Information",}),
		//	editable: false,
			layout: oLayout,
			formContainers: [
				new sap.ui.layout.form.FormContainer({
					title: "Order Details",
					design:"Bold",
					formElements: [
						new sap.ui.layout.form.FormElement({
							label: "Purchase Order",
							fields: [new sap.m.Input("shpPO",{editable:true})]
							
						}),
						
						new sap.ui.layout.form.FormElement({
							label: "Ship-To Party",
							fields: [
//							         new sap.m.Input({value:"{/data121/0/Name1}",editable:true,})
                              new sap.m.Select("shpToParty",{
//	maxWidth :"20%",
                            	  name:"{/data121/0/Name1}",
	                          items: [

	                          new sap.ui.core.Item({text: "{/data121/0/Name1}",key:"01"
	                        	  })
	                        

 ],

// change:oController.onMonthSelect,
 change:function(){
	 debugger;
	var yu= sap.ui.getCore().byId("shpToParty").getSelectedItem().getText();
	 sap.ui.getCore().byId("shpToParty").setText(yu);
	   
	   	 
 },
	})
							         ],
							  
						}),
						
						
							  new sap.ui.layout.form.FormElement({
									label: "Address",
				
									fields: [new sap.m.Label({text:"{/data121/0/Address}",editable:false})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "City",
									fields: [new sap.m.Label("shpCity",{text:"{/data121/0/City}",editable:false})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "State",
									fields: [new sap.m.Label({text:"{/data121/0/State}",editable:false})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "Zip",
									fields: [new sap.m.Label({text:"{/data121/0/Zip}",editable:false})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "Country",
									fields: [new sap.m.Label({text:"{/data121/0/Country}",editable:false})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "Phone Number",
									fields: [new sap.m.Label("shpPhone",{text:"{/data121/0/PhoneNo}",editable:false})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "Carrier",
									fields: [new sap.m.Label({text:"{}",editable:false})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "Incoterms",
									fields: [new sap.m.Label("shpIncoterms",{text:"{/data121/0/Incoterms}",editable:false})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "Shipping Instruction",
									fields: [new sap.m.Input("shpInstruction",{editable:true})]
									
								}),
								new sap.ui.layout.form.FormElement({
									label: "Notes to Receiver",
									fields: [new sap.m.Input("shpNotes",{editable:true})]
									
								}),
						
						
						]
						
				          
				})
				]
		});
		
//		var shipList = new sap.m.List("shipList",{
//            inset : false			
//		}) 
//		var shipListTemp = new sap.m.CustomListItem({
//			content:[shippingForm]
//		})
//		 shipList.bindAggregation("items","/data_ship",shipListTemp);
////		shippingForm.bindElement("/datacon1");
//		
//		
//		
//		
		
		
		
 		return new sap.m.Page({
			title: "Shipping and Payment",
			showNavButton: true,
		    navButtonTap:function(){ 
//				 var   app = sap.ui.getCore().byId("orAppId");  
//	                  app.back();
	                  var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
						 router.navTo("OrderCheckoutDetail");
	                  },
			
			
			content: [
shippingForm
			   ],
			 
				footer: new sap.m.Toolbar({
//					active: true ,
					design : sap.m.ToolbarDesign.Solid,
					content:[
					         new sap.m.ToolbarSpacer({}),
					        new sap.m.Button({
					        	 text : "Review Order",
					        	 enabled :true,
					        	 type:"Transparent",
					        	 press: function(evt){
					        		 
//					        		 debugger;
					        		 var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
									 router.navTo("OrderReviewDetail");
					        	 		oDataModel.read("/ShipToPartyInfoSet?$filter=ImKunnr eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg1[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
					        			var reviewListJson = new sap.ui.model.json.JSONModel();
					        			reviewListJson.setData({data122:loginResult.results});
					        			sap.ui.getCore().byId("reviewForm").setModel(reviewListJson);
					        			
					        			obj_check1 = sap.ui.getCore().byId("checkoutTable").getModel().oData.data89 ;
					        			len_rw = obj_check1.length;
					        			 var reviewTableJson = new sap.ui.model.json.JSONModel();
					        			 reviewTableJson.setProperty("/data_review", []);
					        			 
					        			 var hjItems = sap.ui.getCore().byId("checkoutTable").getItems();
								        	 for(var k = 0 ; k < len_rw ; k++){
//								        		 dItems[k].getAggregation("cells")[2].getProperty("dateValue");	 
								        		 var indDate = hjItems[k].getAggregation("cells")[2].getProperty("dateValue");
							        		       if(indDate.getHours() == 0)
							        		    	   {
							        		    	   indDate.setHours(5);
							        		    	   indDate.setMinutes(30);
							        		    	  }
								        	var reviewNew =  reviewTableJson.getProperty("/data_review");
								        	var reviewData = {
								        			 Description : obj_check1[k].Description,
												  		ImMaterial : obj_check1[k].ImMaterial,
												  		Material : obj_check1[k].Material,
												  		Unit : obj_check1[k].Unit,
												  		ImReqDate : indDate,
												  		ReqDate : obj_check1[k].ReqDate,
												  		ReqQuantity: obj_check1[k].ReqQuantity,
												  		ImPrice : obj_check1[k].ImPrice,
												  		DateStatus : obj_check1[k].DateStatus,
												  		QuantityStatus: obj_check1[k].QuantityStatus,
												  		Subtotal : obj_check1[k].Subtotal,
												  		BaseUnit:obj_check1[k].BaseUnit,
												  		NetPrice:obj_check1[k].NetPrice
								        	};
								        	reviewNew.push(reviewData);
								        	reviewTableJson.setProperty("/data_review", reviewNew);
								        	reviewTableJson.refresh(true);
								        	 }
//								        	 
								        	var  rt =	sap.ui.getCore().byId("reviewTable");
								        	rt.setModel(reviewTableJson);
								     var   rtItems =	rt.getItems();
								    var rtLen = rtItems.length;
								     rt.setHeaderText("Items("+rtLen+")")
					        		
								      var retotal = 0 ;
					  	   		
					  	   		var resub ; 
							       for(var i=0 ; i < rtLen ; i++)
					 		        {
							         resub = parseInt(rtItems[i].getAggregation("cells")[6].getProperty("text"));
							            retotal = retotal + resub ; 
					  		           }
							       sap.ui.getCore().byId("totalReview").setText(retotal);
							       debugger;
							      var phnNo = sap.ui.getCore().byId("shpPhone").getText();
					        	var	incoterms =  sap.ui.getCore().byId("shpIncoterms").getText();
					        var	po = 	sap.ui.getCore().byId("shpPO").getValue();
					       var ins =  sap.ui.getCore().byId("shpInstruction").getValue();
					      var notes = sap.ui.getCore().byId("shpNotes").getValue();
					   var reqDelivery =    sap.ui.getCore().byId("checkoutDate").getDateValue();
	                         
					   if(reqDelivery.getHours() == 0)
    		    	   {
						   reqDelivery.setHours(5);
						   reqDelivery.setMinutes(30);
    		    	   }
							if(reqDelivery != null){
					   var id1 = reqDelivery.toUTCString();
//							date_value = id1.getDate();
//				            mon_value = id.getMonth();
//				            year_value  = id.getFullYear();
						var splt = id1.split(" ");
				         
				             switch (splt[2]){
				              case  "Jan":
				               {
					             mon_value = "January";
					              break;
				               }
				              case  "Feb":
				               {
					             mon_value = "February";
					             break;
				                }
				              case  "Mar":
				               {
					             mon_value = "March";
					             break;
				               }
				              case "Apr" :
				               {
					             mon_value = "April";
					             break;
				               }
				              case  "May":
				               {
					             mon_value = "May";
					             break;
				               }
				              case  "Jun":
				               {
					             mon_value = "June";
					             break;
				               }
				              case  "Jul":
				               {
					             mon_value = "July";
					             break;
				               }
				              case  "Aug":
				               {
					             mon_value = "August";
					             break;
				               }
				              case  "Sep":
				               {
					             mon_value = "September";
					            break;
				              }
				              case  "Oct":
				               {
					             mon_value = "October";
					             break;
				               }
				              case  "Nov":
				           	{ 
					             mon_value = "November";
					             break;
				               }
				              case  "Dec":
				               {
					             mon_value = "December";
					             break;
				               }
				      }
					  
				    var date = splt[1] + " " + mon_value +","+ splt[3]; 
				    
				   
							}
					   debugger;
					   
					  var shipParty =  sap.ui.getCore().byId("shpToParty").getSelectedItem().getText();
					   
					        sap.ui.getCore().byId("revPhone").setText(phnNo);
				        	sap.ui.getCore().byId("revIncoterms").setText(incoterms);
				        	sap.ui.getCore().byId("revPO").setText(po);
				            sap.ui.getCore().byId("revInstruction").setText(ins);
				            sap.ui.getCore().byId("revNotes").setText(notes);
				            sap.ui.getCore().byId("revDelivery").setText(date);
				            sap.ui.getCore().byId("revTotal").setText(retotal);
				            sap.ui.getCore().byId("revToParty").setText(shipParty)
				            sap.ui.getCore().byId("revSold").setText(customerName[0]);
//					        		 var appPage = sap.ui.getCore().byId("orAppId");
//									    appPage.to("orderReviewDetail");
		                  
		                  
					        	 }
					       }) 
					       ]
					       }).addStyleClass("footerColor") 
		});
	}
 
});