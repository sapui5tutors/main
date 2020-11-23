sap.ui.jsview("com.vikalp.dealermgmt.view.payments.PaymentsMenu1", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.Accounts
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.payments.PaymentsMenu1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.Accounts
	*/ 
createContent : function(oController) {
	
//	var oNavCheck1 = new sap.m.SegmentedButton("Test1",{
//		buttons: [
//          new sap.m.Button("Off1", {text: "Invoices"}), 
//          new sap.m.Button("On1", {text: "Payments"}),
////          new sap.ui.getCore().byId("On1").setSelectedButton(true)
//        ],
//        select:function(oEvent){
//			debugger;
//			var test1 = sap.ui.getCore().byId("Test1");
//            var p = test1.getSelectedButton();
//        if(p == "Off1"){
//        	var a = sap.ui.getCore().byId("On");
//        	test.setSelectedButton(a.a.getId());
//        	
//        }
//        
//        
//        }
//	});
	
	
	var button3 = new sap.m.Button({
    	text:"Invoices",
    	width:"155px",
    	press:oController.InvoiceButtonClick,
        press:function(){
        	debugger;
//        var history1 = sap.ui.core.routing.History.getInstance();
//        d = "/" + x;
//        e = "Invoices";
//        c = "Invoices" + d;
//        if(history1.getPreviousHash() == c || history1.getPreviousHash() == e )
////        	history1.aHistory[history1.iHistoryPosition -1 ]
//        	{
//        	var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//			router.navTo("PaymentsInfo",{invoice:x});
//        	}
//        else{
//        	InvoiceNumber1 = loginResult.results[0].Billingdocument; 

        	var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
			router.navTo("PaymentsInfo");
//			,{invoice:InvoiceNumber1}
//        }
//        	var appp = sap.ui.getCore().byId("PaymentTab");
//        	appp.toMaster('paymentsMenu','show');
//			appp.toDetail('paymentsInfo','show');
        }
    });
    var button4 = new sap.m.Button({
    	text:"Payments",
    	type:"Emphasized",
    	width:"155px",

    });
    
    var hBox = new sap.m.HBox({
     	   items:[button3,button4]
		})
	
	var oPaymentInvoice = new sap.m.List("oPaymentInvoice",{
		inset:false,
		updateFinished : function(oEvent){  
			oEvent.getSource().getItems()[0].setSelected(true);
		}

	});
    
    var oMenuPaymentItem = new sap.m.ObjectListItem({
//   	 "oMenuInvoiceItem",
   	   title:"{BillingDoc}",
   	   number:"{Amount}",
   	   numberUnit:"{Currency}",
   	   intro:"Payment",
   	   type:"Active",
//   	   mode:SingleSelect,
   	 attributes: [
                  {
                  text:"Customer Number : {Customers}"
                  },
   	              {
   	              text: {
   	            	 path: "DocumentDate",
   	            	formatter: function(id){
//              			debugger;
                    	if(id != null){
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
                        
                var date ="Duocument Date :  " + date_value + "." + mon_value +"."+ year_value; 
                return date;
               }
                      
                      }	     
   	              }
   	              }
   	              ],
   	   
                    press:oController.onPaymentMenuClick	
		});
    
    oDataModel.read("/UserPaymentsSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//  "+customerId+"
  var paymentListJson = new sap.ui.model.json.JSONModel();
  paymentListJson.setData({data:loginResult.results});        
  console.log("paymentListJson",paymentListJson);			
  oPaymentInvoice.setModel(paymentListJson);			
  oPaymentInvoice.bindAggregation("items","/data",oMenuPaymentItem);
    
            
	 return new sap.m.Page({
//		 title:"All Customer Payments",
		 headerContent: new sap.m.Label({text:"All Customer Payments",textAlign:sap.ui.core.TextAlign.Center,design: sap.m.LabelDesign.Bold,width:'100%'}),

		 subHeader: 
				new sap.m.Bar({
					contentMiddle: [
			new sap.m.SearchField({
//				"searchField2", 
				placeholder: "Search",
				showMagnifier: false,
//				showRefreshButton: true,
				search: oController.onSearch,
				liveChange: oController.onLiveChange,
				width: "100%",
				tooltip: "Search for objects..",
//				refreshButtonTooltip: "Refresh"
			})
		]
                           }),
		 content: [
	                hBox,oPaymentInvoice 
//	                oNavCheck1,
				]
	 });
}
});