sap.ui.jsview("com.vikalp.dealermgmt.view.payments.PaymentsInfo1", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.Accounts
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.payments.PaymentsInfo1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.Accounts
	*/ 
createContent : function(oController) {
	
	
	var oPaymentHeader = new sap.m.List("oPaymentHeader",{
		inset:false,
	      });
	
	 var oPaymentHeaderItem = new sap.m.ObjectListItem({
//   	 "oMenuInvoiceItem",
   	   title:"Payment {BillingDoc}",
   	   number:"{Amount}",
   	   numberUnit:"{Currency}",
//   	   intro:"{CustomerName}",
//   	   type:"Active",
//   	   mode:SingleSelect,
   	 attributes: [
   	           {
               	text: ""
                },
                {
                	text:"Customer : {CustomerName}"
                },
                  {
                  text:"Customer Number : {Customers}"
                  },
   	              {
   	              text: {
   	            	 path: "EntryDate",
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
                        
                var date ="Entry Date :  " + date_value + "." + mon_value +"."+ year_value; 
                return date;
               }
                      
                      }	     
   	              }
   	              }
   	              ],
	
		});
	 oPaymentHeader.bindAggregation("items","/dataHeader",oPaymentHeaderItem);
	 
	   var Z_DMA_headerListInvoice = new sap.m.FlexBox({
//		   "headerWrapper",
			width:"100%",
			direction:"Column",
			items:[oPaymentHeader]
	});
	   
	   
	   var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout({
//			labelSpanL: 3,
//			labelSpanM: ,
			labelSpanS: 12,
//			emptySpanL: 1,
//			emptySpanM: 1,
//			emptySpanS: 12,
//			columnsL: 2,
			columnsM: 2,
//			breakpointL: 800,
//			breakpointM: 400
		});
	   
	   var informationForm = new sap.ui.layout.form.Form("informationForm",{
//			title: new sap.ui.core.Title({text: "Address Data",}),
			editable: true,
			layout: oLayout1,
			formContainers: [
				new sap.ui.layout.form.FormContainer({
//					"F1C1",
					title: "Payment Details",
					formElements: [

new sap.ui.layout.form.FormElement({
	label: "Customer Name",
	fields: [new sap.m.Text({text:"{/dataHeader/0/CustomerName}",editable:false})]
}),
new sap.ui.layout.form.FormElement({
	label: "DocumentType",
	fields: [new sap.m.Text({text:"{/dataHeader/0/DocumentType}",editable:false})]
}),
new sap.ui.layout.form.FormElement({
	label: "Invoice Number",
	fields: [new sap.m.Text({text:"{/dataHeader/0/BillingDoc}",editable:false})]
}),					               						
new sap.ui.layout.form.FormElement({
	label: "Company Code",
	fields: [new sap.m.Text({text:"{/dataHeader/0/CompCode}",editable:false})]
}),	
new sap.ui.layout.form.FormElement({
	label: "Customer Number",
	fields: [new sap.m.Text({text:"{/dataHeader/0/Customers}",editable:false})]
}),
//new sap.ui.layout.form.FormElement({
//	label: "Amount",
//	fields: [new sap.m.Text({text:"{/dataHeader/0/Amount}{ }{/dataHeader/0/Currency}",editable:false})]
//}),
						
						
						]}),
						new sap.ui.layout.form.FormContainer({
//							"F1C2",
							title: "More Details ",
							formElements: [
								
								new sap.ui.layout.form.FormElement({
									label: "Payment Terms",
									fields: [new sap.m.Text({text:"{/dataHeader/0/PaytTerms}",editable:false})]
								}),
								new sap.ui.layout.form.FormElement({
									label: "Allocation Number",							
									fields: [new sap.m.Text({text:"{/dataHeader/0/AllocNmbr}",editable:false})]
								}),
								new sap.ui.layout.form.FormElement({
									label: "Document Number",
									fields: [new sap.m.Text({text:"{/dataHeader/0/DocumentNo}",editable:false})]
								}),
//								new sap.ui.layout.form.FormElement({
//									label: "Currency",
//									fields: [new sap.m.Text({text:"{/dataHeader/0/Currency}",editable:false})]
//								}),
								new sap.ui.layout.form.FormElement({
									label: "Amount",
									fields: [new sap.m.Text({text:"{/dataHeader/0/Amount}{ }{/dataHeader/0/Currency}",editable:false})]
								}),
								
								]
						}),
				]
				});
	   
	   var Z_DMA_informationDetail = new sap.m.FlexBox({
//		   "informationDetail",
	       width:"100%",
	       direction:"Column",
	       items:[informationForm]
	       });
	   
	   var creditInfoTab = new sap.m.IconTabFilter({
//			 "iT",
			    text:"Information",
				icon:"sap-icon://hint",
//				count :"",
				content:[
Z_DMA_informationDetail
			        ]
			   }); 
	   var profileTabFilter = new sap.m.IconTabBar({
			
			items:[creditInfoTab],
//			content:[new sap.m.Button({text:"Click ME"})]
		    });
	   
	   var Z_DMA_oContainer = new sap.m.FlexBox({
		     
		     width:"100%",
		     direction:"Column",
		     items:[profileTabFilter]
		     
		 });
	
	 return new sap.m.Page({
//		 title:"Payments",
		 headerContent: new sap.m.Label({text:"Payments",textAlign:sap.ui.core.TextAlign.Center,design: sap.m.LabelDesign.Bold,width:'100%'}),

		 content: [
Z_DMA_headerListInvoice,Z_DMA_oContainer
				]
	 });
}
});