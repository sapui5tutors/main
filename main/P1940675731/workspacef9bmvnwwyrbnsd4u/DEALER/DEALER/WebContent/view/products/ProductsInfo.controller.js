var flagProduct;
sap.ui.controller("com.vikalp.dealermgmt.view.products.ProductsInfo", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.orders.Orders
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.orders.Orders
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.orders.Orders
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.orders.Orders
*/
//	onExit: function() {
//
//	}
	updatewill:function(oEvent){
		var datevalue = sap.ui.getCore().byId("Date").getDateValue();
		var currentdatevalue = new Date();
		
		if(datevalue!= null)
			{
		debugger;
//		updateFinished : oController.updatewill
//		var datevalue = sap.ui.getCore().byId("ReqDate").getDateValue();
		var seldate = datevalue.getDate();
//		var selmonth =datevalue.toDateString().split(" ")[1];
		var selmonth = datevalue.getMonth() + 1;
		var selyear = datevalue.getFullYear()
		formatteddate = datevalue.toJSON().split(".")[0];
		
		var currdate = currentdatevalue.getDate();
//		var currmonth = currentdatevalue.toDateString().split(" ")[1];
		var currmonth = currentdatevalue.getMonth() + 1;
		var curryear = currentdatevalue.getFullYear();
//		curr = currentdate.getDate();
		
		if(seldate < currdate && selmonth <= currmonth && selyear <= curryear )
			{
				if(selyear <= curryear){
				
			sap.ui.getCore().byId("Date").setValueState("Warning");
			sap.ui.getCore().byId("confirmationDialogProduct").open();
				}
			}
		else{
			sap.ui.getCore().byId("Date").setValueState("None");
		}
			}
		
	},
	
	
	onCheckButtonClick: function()
	{debugger;
		if(flagProduct==1)
			{
			sap.ui.getCore().byId("checkProductsTables").destroy();
			flagProduct = 0;
			}
		
		var quantityValue = sap.ui.getCore().byId("Quantity").getValue();
		var dateValue = sap.ui.getCore().byId("Date").getDateValue();
		
		if(quantityValue == "" || dateValue == null)
			{

			sap.ui.getCore().byId("ProductsErrorDialog").open();
			return;
			}
//		oDataModel.read("/ProductCheckInfoSet?$filter=ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"'' and Material eq '"+material+"' and ReqDate eq  datetime'2015-04-15T00:00:00' and  ReqQty eq 100m",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		oDataModel.read("/ProductCheckInfoSet?$filter=ImCustomerid eq '"+customerId+"' and ImSalesOrg eq '"+SalesOrg+"' and Material eq '"+material+"' and ReqDate eq datetime'"+formatteddate+"' and  ReqQty eq "+quantityValue+"m",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		
		var checkListJson = new sap.ui.model.json.JSONModel();
		checkListJson.setData({datacheckProducts:loginResult.results});
		console.log("checkListJson",checkListJson);
		
		alteredDate = sap.ui.getCore().byId("Date").getValue();
		var ComQty = loginResult.results[0].ComQty;
		if (ComQty != "0.000")
			{		var checkItemTable = new sap.m.Table({
                    inset:true,
			        id:"checkProductsTables",
			
//			    	"ItemTables",

//			    itemPress : [ oController.ItemPress,oController ],

			    columns: [

			    new sap.m.Column({

			    width: "20%",

			    header: new sap.m.Label({

			    text: "Quantity",
			    design: sap.m.LabelDesign.Bold
			    	}),
//			    	 footer : new sap.m.Label({ // footer of the second column
//			    		  text : "Availability Date:"
//			    	 }),
			    }),

			    new sap.m.Column({

			    width: "20%",

			    header: new sap.m.Label({

			    text: "List Price",
			    design: sap.m.LabelDesign.Bold
			    	}),
//			    	footer : new sap.m.Label({ // footer of the second column
//			    		  text : alteredDate
//			    	 }),
			    }),

			    new sap.m.Column({

			    width: "20%",

			    header: new sap.m.Label({

			    text: "Your Price",
			    design: sap.m.LabelDesign.Bold

			    })

			    }),
			    

			    new sap.m.Column({  

			    width: "20%",

			    header: new sap.m.Label({

			    text: "Net Amount",
			    design: sap.m.LabelDesign.Bold

			    })

			    }),
			    new sap.m.Column({  

				    width: "20%",

				    header: new sap.m.Label({

				    text: "Available Date",
				    design: sap.m.LabelDesign.Bold

				    })

				    }),
				    
			   ]
			    });
		    var checkItemTableTemplate = new sap.m.ColumnListItem({

//		   	     id: "ItemTablesTemplate",
//		   	     type: "Navigation",
		   	     visible: true,
		   	     cells: [
		               new sap.m.Text( {
		            	    text: quantityValue + BaseUomDesc,
		            	    design : "Bold"
		            	      }),
		            	      new sap.m.Text( {
		  	            	    text: "{Price} {Currency}",
		  	            	    design : "Bold"
		  	            	      }),
		  	            	    new sap.m.Text( {
		  		            	    text: "{Customerprice} {Currency}",
		  		            	    design : "Bold"
		  		            	      }),
		  		            	    new sap.m.Text( {
		  			            	    text: "{TotalPrice} {Currency}",
		  			            	    design : "Bold"
		  			            	      }),
		  			            	    new sap.m.Text( {
			  			            	    text: alteredDate,
			  			            	    design : "Bold"
			  			            	      }),
		  			            	      
		  			            	      ]});

		    oDataModel.read("/ProductCheckInfoSet?$filter=ImCustomerid eq '"+customerId+"' and ImSalesOrg eq '"+SalesOrg+"' and Material eq '"+material+"' and ReqDate eq datetime'"+formatteddate+"' and  ReqQty eq "+quantityValue+"m",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
			
			var checkListJson = new sap.ui.model.json.JSONModel();
			checkListJson.setData({datacheckProducts:loginResult.results});
			checkItemTable.setModel(checkListJson);
			checkItemTable.bindAggregation("items","/datacheckProducts",checkItemTableTemplate);
			if(flagProduct==2){
				sap.ui.getCore().byId("productsheadertext").destroy();
				sap.ui.getCore().byId("productscontenttext").destroy();
				sap.ui.getCore().byId("VBox").destroy();
			sap.ui.getCore().byId("checkProductsTables").placeAt("DetailPage");
//		    sap.ui.getCore().byId("productpage").addContent(checkItemTable);
			flagProduct = 1;
			}
			else{
				sap.ui.getCore().byId("checkProductsTables").placeAt("DetailPage");
//			    sap.ui.getCore().byId("productpage").addContent(checkItemTable);
				flagProduct = 1;
			}
//			checkItemTable.destroy();
			}
		else{
			if(flagProduct==1)
				{
				sap.ui.getCore().byId("checkProductsTables").destroy();
				var HeaderText = new sap.m.Text("productsheadertext",{text:"Not available on Requested Date"}).addStyleClass("productAvailabilityText");
				var contentText = new sap.m.Text("productscontenttext",{text:"Contact us at undefined"}).addStyleClass("productAvailabilityText2");
				var blankText = new sap.m.Text({text:""});
				var vBox =new sap.m.VBox("VBox",{
					items:[HeaderText,blankText,contentText]
				})
				vBox.placeAt("DetailPage");
//				HeaderText.placeAt("DetailPage");
//				contentText.placeAt("DetailPage");
				flagProduct=2;
				}
			else{
				if(flagProduct==2)
				{
				sap.ui.getCore().byId("productsheadertext").destroy();
				sap.ui.getCore().byId("productscontenttext").destroy();
				sap.ui.getCore().byId("VBox").destroy();
				}
			var HeaderText = new sap.m.Text("productsheadertext",{text:"Not available on Requested Date"}).addStyleClass("productAvailabilityText");
			var contentText = new sap.m.Text("productscontenttext",{text:"Contact us at undefined"}).addStyleClass("productAvailabilityText2");
			var blankText = new sap.m.Text({text:""});
			var vBox = new sap.m.VBox("VBox",{
				items:[HeaderText,blankText,contentText]
			})
			vBox.placeAt("DetailPage");
//			HeaderText.placeAt("DetailPage");
//			contentText.placeAt("DetailPage");
			flagProduct=2;
			}
		}
//		customerListDialog.setModel(checkListJson);	

	},

});


