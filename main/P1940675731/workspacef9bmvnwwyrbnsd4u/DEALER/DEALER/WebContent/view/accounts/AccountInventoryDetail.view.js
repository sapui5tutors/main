sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountInventoryDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountInventoryDetail
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountInventoryDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountInventoryDetail
	*/ 
	createContent : function(oController) {
		var oHeaderInventory = new sap.m.List("inventoryheaderlist",{
			inset:false,
		});
		var oHeaderInventoryItem = new sap.m.ObjectListItem({
//			"headerlisttemplate",
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
		oHeaderInventory.bindAggregation("items","/inventoryheaderdata",oHeaderInventoryItem);
		//////////
		var OLayout = new sap.ui.layout.form.ResponsiveGridLayout({
          labelSpanM: 6,
		});
		var InformationForm = new sap.ui.layout.form.Form("infoForm",{
			//title: new sap.ui.core.Title({text: "Information",}),
		//	editable: false,
			layout: OLayout,
			formContainers: [
				new sap.ui.layout.form.FormContainer({
//					title: "Availability Check",
//					design:"Bold",
					formElements: [
						new sap.ui.layout.form.FormElement({
								label: "Division",
							fields: [new sap.m.Text({text:"{/inventoryheaderdata/0/DivisionDesc}({/inventoryheaderdata/0/Division})"})]
							
						}),]
				}),]
		});
		////////////////
		var InventoryOverviewTab = new sap.m.IconTabFilter({
			
			icon:"sap-icon://hint",
			content:[InformationForm]
		});
		var TabFilter = new sap.m.IconTabBar({
			
			items:[InventoryOverviewTab],
			
		});
		
		var OLayout = new sap.ui.layout.form.ResponsiveGridLayout({
//		    labelSpanL: 6,
          labelSpanM: 	6,
//          labelSpanS: 6,
//          emptySpanL: 1,
//          emptySpanM: 4,
//          emptySpanS: 1,
//          columnsL: 2,
//          columnsM: 2,
//          breakpointL: 1200,
//          breakpointM: 500,
		});
		var AvailabilityForm = new sap.ui.layout.form.Form("availabilityForm",{
			//title: new sap.ui.core.Title({text: "Information",}),
		//	editable: false,
			layout: OLayout,
			formContainers: [
				new sap.ui.layout.form.FormContainer({
					title: "Availability Check",
					design:"Bold",
					formElements: [
						new sap.ui.layout.form.FormElement("asd",{
								label: "Quantity",
							fields: [new sap.m.Input("Quant",{width: "50%",maxLength:8 })]
							
						}),
						new sap.ui.layout.form.FormElement("sad",{
							label: "Requested Date",
							fields: [new sap.m.DatePicker("ReqDate",{
//		            	    	  dateValue : "{/datacon1/0/RequiredDelivery}",
//								value: {
//						            path:"/dateValue", 
//						            type: dateType
//						        },
						        placeholder: "Date",
						        change:[oController.updatewill],
							  editable:true,
							  width : "50%"}),]
						
						}),
						new sap.ui.layout.form.FormElement("qwe",{
							fields: [new sap.m.ToolbarSpacer({width:"50%"}),new sap.m.Button({text: 'Check',width: "30%",
																press: [oController.onCheckButtonClick],
//																layoutData: new sap.ui.layout.GridData({labelSpanM:"6"})
							}),],})
						
				          ]
				}),]
		});
		var confirmationDialog = new sap.m.Dialog("confirmationDialog",{
			icon:"sap-icon://message-warning",
			state: sap.ui.core.ValueState.Warning,
			title:"Warning",
			width:"50%",
//			noDataText:"The date you have selected is in the past",
			content: [ new sap.m.Text({
    			text : "The date you have selected is in the past"
    		}),],
    		endButton : new sap.m.Button({
    			text :"Ok",
    			press: function(){
    				confirmationDialog.close();
    			}
    		}),
//			rememberSelections:true,
//			confirm:[oController.onOkayButtonClick],
//			search:this.onSearch,
//			liveChange:this.onSearch,
			
				});
		var ErrorDialog = new sap.m.Dialog("ErrorDialog",{
			icon:"sap-icon://message-error",
			state: sap.ui.core.ValueState.Warning,
			title:"Error",
			width:"50%",
//			noDataText:"The date you have selected is in the past",
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
//        secondStatus:[{
//        	text:{
//        		path:"OrderDate",
//        	formatter : com.vikalp.dealermgmt.util.Formatter.OrderDate
//        	}}]
	return new sap.m.Page("productpage",{
			title: "Product",
			showNavButton: true,
			navButtonPress:[oController.onNavigationButtonTap,oController],
			content: [
oHeaderInventory,TabFilter,AvailabilityForm
			]
		});
	}

});