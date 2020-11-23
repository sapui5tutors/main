sap.ui.jsview("com.vikalp.dealermgmt.view.products.ProductsInfo", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.Accounts
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.products.ProductsInfo";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.Accounts
	*/ 
createContent : function(oController) {

	
	var oProductsHeader = new sap.m.List("ProductsHeader",{
		inset:false,
//		updateFinished : function(oEvent){  
//			oEvent.getSource().getItems()[0].setSelected(true);
//		}
	});
	var oProductsHeaderItem = new sap.m.ObjectListItem({
		
   	 	   title:"{MatlDesc}",
    	   number:"{NetPrice}",
    	   numberUnit:"{Currency}",
    	   attributes: [{
    		   text:"Product Id: {Material}"
            },
    		  {
    		    text:"Your Product No: "
    		    		            },
    		 {
    		    text:"Product Reference No:"
    		  },
	]
   });
	oProductsHeader.bindAggregation("items","/productsheaderdata",oProductsHeaderItem);
	
	var OLayout = new sap.ui.layout.form.ResponsiveGridLayout({
//	    labelSpanL: 3,
      labelSpanM: 6,
//      labelSpanS: 2,
//      emptySpanL: 1,
//      emptySpanM: 1,
//      emptySpanS: 1,
//      columnsL: 2,
//      columnsM: 2,
//      breakpointL: 800,
//      breakpointM: 40
	});
	
	var InformationForm = new sap.ui.layout.form.Form("ProductForm",{
		//title: new sap.ui.core.Title({text: "Information",}),
	//	editable: false,
		layout: OLayout,
		formContainers: [
			new sap.ui.layout.form.FormContainer({
//				title: "Availability Check",
//				design:"Bold",
				formElements: [
					new sap.ui.layout.form.FormElement({
							label: "Division",
							fields: [
							         new sap.m.Text({text:"{/productsheaderdata/0/DivisionDesc}({/productsheaderdata/0/Division})",editable:false}),
							         
							        ]						
					}),]
			}),]
	});
	////////////////
	var ProductsInformationTab = new sap.m.IconTabFilter({
		icon:"sap-icon://hint",
		content:[InformationForm]
	});
	
	var TabFilter = new sap.m.IconTabBar({
		items:[ProductsInformationTab],
	}).addStyleClass("Z_DMA_oContainer");
	
	var OLayout1 = new sap.ui.layout.form.ResponsiveGridLayout({
//	    labelSpanL: 6,
      labelSpanM: 	6,
//      labelSpanS: 6,
//      emptySpanL: 1,
//      emptySpanM: 4,
//      emptySpanS: 1,
//      columnsL: 2,
//      columnsM: 2,
//      breakpointL: 1200,
//      breakpointM: 500,
	});
	var AvailabilityForm = new sap.ui.layout.form.Form("ProductAvailabilityForm",{
		//title: new sap.ui.core.Title({text: "Information",}),
	//	editable: false,
		layout: OLayout1,
		formContainers: [
			new sap.ui.layout.form.FormContainer({
				title: "Availability Check",
				design:"Bold",
				formElements: [
					new sap.ui.layout.form.FormElement({
							label: "Quantity",
						fields: [
						         new sap.m.Input("Quantity",{
							     width: "100%",
							     maxLength:8
								})
						        ]
						
					}),
					new sap.ui.layout.form.FormElement({
						label: "Requested Date",
						fields: [new sap.m.DatePicker("Date",{
							width: "100%",
//	            	    	  dateValue : "{/datacon1/0/RequiredDelivery}",
//							value: {
//					            path:"/dateValue", 
//					            type: dateType
//					        },
					        placeholder: "Date",
					        change:[oController.updatewill],
						  editable:true,
						  width : "50%"}),]
					
					}),
					new sap.ui.layout.form.FormElement({
						fields: [new sap.m.ToolbarSpacer({width:"50%"}),new sap.m.Button({text: 'Check',width: "30%",
															press: [oController.onCheckButtonClick],
//															layoutData: new sap.ui.layout.GridData({labelSpanM:"6"})
						}),],})
					
			          ]
			}),]
	});
	
	var confirmationDialog = new sap.m.Dialog("confirmationDialogProduct",{
		icon:"sap-icon://message-warning",
		state: sap.ui.core.ValueState.Warning,
		title:"Warning",
		width:"50%",
//		noDataText:"The date you have selected is in the past",
		content: [ new sap.m.Text({
			text : "The date you have selected is in the past"
		}),],
		endButton : new sap.m.Button({
			text :"Ok",
			press: function(){
				confirmationDialog.close();
			}
		}),
//		rememberSelections:true,
//		confirm:[oController.onOkayButtonClick],
//		search:this.onSearch,
//		liveChange:this.onSearch,
		});
	
	var ErrorDialog = new sap.m.Dialog("ProductsErrorDialog",{
		icon:"sap-icon://message-error",
		state: sap.ui.core.ValueState.Warning,
		title:"Error",
		width:"50%",
//		noDataText:"The date you have selected is in the past",
		content: [ new sap.m.Text({
			text : "Quantity and Date must not be empty. Enter a valid value"
		}),],
		
		endButton : new sap.m.Button({
			text :"Ok",
			press: function(){
				ErrorDialog.close();
			}
		}),
	});
		
	return new sap.m.Page("DetailPage",{
		 headerContent: new sap.m.Label({text:"Product",textAlign:sap.ui.core.TextAlign.Center,design: sap.m.LabelDesign.Bold,width:'100%'}),

		 content: [
oProductsHeader,TabFilter,AvailabilityForm

		           ]
	 });
}
});