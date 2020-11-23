
var flag;
sap.ui.controller("com.vikalp.dealermgmt.view.accounts.AccountInventoryDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.accounts.AccountInventoryDetail
*/
//	onInit: function() {
//
//	},
	
	onNavigationButtonTap:function(){
		debugger;
//		window.history.go(-1);
		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
		router.navTo("AccountProfile",{customer:customerName[0]});
		sap.ui.getCore().byId("menulist").getItems()[0].setSelected(true);
	},
	updatewill:function(oEvent){
	var datevalue = sap.ui.getCore().byId("ReqDate").getDateValue();
	var currentdatevalue = new Date();
	
	if(datevalue!= null)
		{
	debugger;
//	updateFinished : oController.updatewill
//	var datevalue = sap.ui.getCore().byId("ReqDate").getDateValue();
	var seldate = datevalue.getDate();
//	var selmonth =datevalue.toDateString().split(" ")[1];
	var selmonth = datevalue.getMonth() + 1;
	var selyear = datevalue.getFullYear()
	formatteddate = datevalue.toJSON().split(".")[0];
	
	var currdate = currentdatevalue.getDate();
//	var currmonth = currentdatevalue.toDateString().split(" ")[1];
	var currmonth = currentdatevalue.getMonth() + 1;
	var curryear = currentdatevalue.getFullYear();
//	curr = currentdate.getDate();
	
//	if(seldate < currdate && selmonth <= currmonth && selyear <= curryear )
	if(datevalue < currentdatevalue)
		{
//			if(selyear <= curryear){
			
		sap.ui.getCore().byId("ReqDate").setValueState("Warning");
		sap.ui.getCore().byId("confirmationDialog").open();
//			}
		}
	else{
		sap.ui.getCore().byId("ReqDate").setValueState("None");
	}
		}
	
},


onCheckButtonClick: function(oEvent)
{debugger;

	 if(flag==1)
		{
		sap.ui.getCore().byId("checkItemTables").destroy();
		flag = 0;
		}
	
	var quantityValue = sap.ui.getCore().byId("Quant").getValue();
	var datevalue = sap.ui.getCore().byId("ReqDate").getDateValue();
	if(quantityValue == "" || datevalue == null)
		{

		sap.ui.getCore().byId("ErrorDialog").open();
		return;
		}
		
	mat = loginResult.results[0].Material;
//	oDataModel.read("/ProductCheckInfoSet?$filter=ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"'' and Material eq '"+material+"' and ReqDate eq  datetime'2015-04-15T00:00:00' and  ReqQty eq 100m",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
	oDataModel.read("/ProductCheckInfoSet?$filter=ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"' and Material eq '"+material+"' and ReqDate eq datetime'"+formatteddate+"' and  ReqQty eq "+quantityValue+"m",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
	
	var checkListJson = new sap.ui.model.json.JSONModel();
	checkListJson.setData({datacheck:loginResult.results});
	console.log("checkListJson",checkListJson);
	
	alteredDate = sap.ui.getCore().byId("ReqDate").getValue();
	var ComQty = loginResult.results[0].ComQty;
	if (ComQty != "0.000")
		{		var checkItemTable = new sap.m.Table({

		    id:"checkItemTables",
//		    	"ItemTables",

//		    itemPress : [ oController.ItemPress,oController ],

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

		    text: "List Price" 
		    	})

		    }),

		    new sap.m.Column({

		    width: "20%",

		    header: new sap.m.Label({

		    text: "Your Price"

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

			    text: "Available Date"

			    })

			    }),
		   ]
		    });
	    var checkItemTableTemplate = new sap.m.ColumnListItem({

//	   	     id: "ItemTablesTemplate",
//	   	     type: "Navigation",
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

	    oDataModel.read("/ProductCheckInfoSet?$filter=ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"' and Material eq '"+material+"' and ReqDate eq datetime'"+formatteddate+"' and  ReqQty eq "+quantityValue+"m",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		
		var checkListJson = new sap.ui.model.json.JSONModel();
		checkListJson.setData({datacheck:loginResult.results});
		checkItemTable.setModel(checkListJson);
		checkItemTable.bindAggregation("items","/datacheck",checkItemTableTemplate);
		if(flag==2){
			sap.ui.getCore().byId("headertext").destroy();
			sap.ui.getCore().byId("contenttext").destroy();
		sap.ui.getCore().byId("checkItemTables").placeAt("productpage");
//	    sap.ui.getCore().byId("productpage").addContent(checkItemTable);
		flag = 1;
		}
		else{
			sap.ui.getCore().byId("checkItemTables").placeAt("productpage");
//		    sap.ui.getCore().byId("productpage").addContent(checkItemTable);
			flag = 1;
		}
//		checkItemTable.destroy();
		}
	else{
		if(flag==1)
			{
			sap.ui.getCore().byId("checkItemTables").destroy();
			var HeaderText = new sap.m.Text("headertext",{text:"Not available on Requested Date"}).addStyleClass("productAvailabilityText");
			var contentText = new sap.m.Text("contenttext",{text:"Contact us at undefined"}).addStyleClass("productAvailabilityText2");
			var BlankText = new sap.m.Text({text:""});
			var vBox1 =new sap.m.VBox({
//				"verticalBox",
				items:[HeaderText,BlankText,contentText]
			})
			vBox1.placeAt("productpage");
//			HeaderText.placeAt("productpage");
//			contentText.placeAt("productpage");
			flag=2;
			}
		else{
			if(flag==2)
				{
				sap.ui.getCore().byId("headertext").destroy();
				sap.ui.getCore().byId("contenttext").destroy();
				}
		var HeaderText = new sap.m.Text("headertext",{text:"Not available on Requested Date"}).addStyleClass("productAvailabilityText");
		var contentText = new sap.m.Text("contenttext",{text:"Contact us at undefined"}).addStyleClass("productAvailabilityText2");
		var vBox1 =new sap.m.VBox({
//			"verticalBox",
			items:[HeaderText,BlankText,contentText]
		})
		vBox1.placeAt("productpage");
//		HeaderText.placeAt("productpage");
//		contentText.placeAt("productpage");
//		HeaderText.destroy();
//		contentText.destroy();
		flag=2;
		}
	}
//	customerListDialog.setModel(checkListJson);	

}
//	onOkayButtonClick:function(){
//		sap.ui.getCore().byId("confirmationDialog").close();
//	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.accounts.AccountInventoryDetail
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.accounts.AccountInventoryDetail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.accounts.AccountInventoryDetail
*/
//	onExit: function() {
//
//	}

});