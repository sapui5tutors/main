sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountPerformance", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountPerformance
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountPerformance";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountPerformance
	*/ 
	createContent : function(oController) {
		
		
	//For overall	
		var dataset = new sap.viz.ui5.data.FlattenedDataset({		 						

				dimensions: [
				             {
				            	 axis : 1,
				            	 name : "Month",
//				            	 value:"{Zmonth}",
				            	 value : { path : 'Zmonth',
			            			 formatter : function(evt){
			            	 	            
			      	            		switch (evt){
			      	                   case  "1":
			      	                    {
			      	                	 this.mon_value1 = "Jan";
			      	     	              break;
			      	                    }
			      	                   case  "2":
			      	                    {
			      	                	 this.mon_value1 = "Feb";
			      	     	             break;
			      	                     }
			      	                   case  "3":
			      	                    {
			      	                	 this.mon_value1 = "Mar";
			      	     	             break;
			      	                    }
			      	                   case "4" :
			      	                    {
			      	                	 this.mon_value1 = "Apr";
			      	     	             break;
			      	                    }
			      	                   case  "5":
			      	                    {
			      	                	 this.mon_value1 = "May";
			      	     	             break;
			      	                    }
			      	                   case  "6":
			      	                    {
			      	                	 this.mon_value1 = "Jun";
			      	     	             break;
			      	                    }
			      	                   case  "7":
			      	                    {
			      	                	 this.mon_value1 = "Jul";
			      	     	             break;
			      	                    }
			      	                   case  "8":
			      	                    {
			      	                	 this.mon_value1 = "Aug";
			      	     	             break;
			      	                    }
			      	                   case  "9":
			      	                    {
			      	                	 this.mon_value1 = "Sep";
			      	     	            break;
			      	                   }
			      	                   case  "10":
			      	                    {
			      	                	 this.mon_value1 = "Oct";
			      	     	             break;
			      	                    }
			      	                   case  "11":
			      	                	{ 
			      	     	             this.mon_value1 = "Nov";
			      	     	             break;
			      	                    }
			      	                   case  "12":
			      	                    {
			      	     	             this.mon_value1 = "Dec";
			      	     	             break;
			      	                    }
			      	                   
			      	           }
			      	            		return this.mon_value1 ;	}
			            				 
			            		 
			            		 }
				            	 
				             },
				             ],
				             measures : [ {
				                 name : 'Target',
				                 value : '{Ztarget}'
				               }, {
				                 name : 'Actual',
				                 value : '{Zactuals}'
				               } ],

			          data : {
			        	  path:"/data7"
			          }});

		var Line = new sap.viz.ui5.Line("cht",{
			 
			width : "100%",
			height : "300px",
			title : {
                visible : true,
                text : 'Target Vs Actuals'
              },
			
			dataset: dataset,
			
		});
		
		//Based on products
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({		 						

			dimensions: [
			             {
			            	 axis : 1,
			            	 name : "Product",
			            	 value:"{Product2}",
			            		 
			             },
			             ],
			             measures : [
	 						          {  group : 1,
	 						        	 name : 'Target',
	 						        	 value : "{TargetQty}"
	 						          },
	 						          { 
	 						        	  group : 2,
	 						        	  name : "Actual",
	 					            	  value : "{ActualQty}"
	 						          }
	 						          ],


		          data : {
		        	  path:"/data9"
		          }});

	var DualSC = new sap.viz.ui5.DualStackedColumn("dualSC",{
		 
		width : "100%",
		height : "300px",
		title : {
            visible : true,
            text : 'Target Vs Actuals'
          },
		
		dataset: oDataset,
//		 xAxis : new  sap.viz.ui5.types.Axis({color: "#FFFFFF", lineSize: 3, visible: false}),
//		yAxis: {
//	         color: '#FF0000'
//	     },
		 plotArea: { 
       	  primaryValuesColorPalette:  ["#2E9AFE"],
       	  secondaryValuesColorPalette :["#9AFE2E"],
       	  isRoundCorner: true, 
       	  animation:{dataLoading:false}, 
       	  drawingEffect: sap.viz.ui5.types.VerticalBar_drawingEffect.glossy 
       	  }      
	});
		
		
		
		
		
		
		var oPerformanceTable = new sap.m.Table({

            id: "performancetabledata",

//            itemPress : [ oController.ItemPress,oController ],

            columns: [

            new sap.m.Column({

            width: "20%",

            header: new sap.m.Label({

            text: "Month" ,
            design: sap.m.LabelDesign.Bold}) }),

            new sap.m.Column({

            width: "20%",

            header: new sap.m.Label({

            text: "Fiscal Year",
            design: sap.m.LabelDesign.Bold})

            }),

            new sap.m.Column({

            width: "20%",

            header: new sap.m.Label({

            text: "Actual(INR)",
            design: sap.m.LabelDesign.Bold

            })

            }),
            

            new sap.m.Column({  

            width: "20%",

            header: new sap.m.Label({

            text: "Target(INR)",
            design: sap.m.LabelDesign.Bold

            })

            }),
            
                ]
        });
                
                //////////////////
            var template1= new sap.m.ColumnListItem({

               visible: true,

                cells: [

   

                new sap.m.Label( {

//                 text: "{Zmonth}",
                 text:{
 	            	path:"Zmonth",
 	            	formatter : function(evt){
 	            
 	            		switch (evt){
 	                   case  "1":
 	                    {
 	     	             mon_value = "Jan";
 	     	              break;
 	                    }
 	                   case  "2":
 	                    {
 	     	             mon_value = "Feb";
 	     	             break;
 	                     }
 	                   case  "3":
 	                    {
 	     	             mon_value = "Mar";
 	     	             break;
 	                    }
 	                   case "4" :
 	                    {
 	     	             mon_value = "Apr";
 	     	             break;
 	                    }
 	                   case  "5":
 	                    {
 	     	             mon_value = "May";
 	     	             break;
 	                    }
 	                   case  "6":
 	                    {
 	     	             mon_value = "Jun";
 	     	             break;
 	                    }
 	                   case  "7":
 	                    {
 	     	             mon_value = "Jul";
 	     	             break;
 	                    }
 	                   case  "8":
 	                    {
 	     	             mon_value = "Aug";
 	     	             break;
 	                    }
 	                   case  "9":
 	                    {
 	     	             mon_value = "Sep";
 	     	            break;
 	                   }
 	                   case  "10":
 	                    {
 	     	             mon_value = "Oct";
 	     	             break;
 	                    }
 	                   case  "11":
 	                	{ 
 	     	             mon_value = "Nov";
 	     	             break;
 	                    }
 	                   case  "12":
 	                    {
 	     	             mon_value = "Dec";
 	     	             break;
 	                    }
 	                   
 	           }
 	            		return mon_value ;	
 	            	
 	            	}
 	            	}

                   }),

                new sap.m.Label({

                 text: "{Zyear}"

                         }),

                new sap.m.Label({

                 text: "{Zactuals}"

                   }),

                   new sap.m.Label({

                       text: "{Ztarget}"

                         }),

                  ],
              

  });		 
            oPerformanceTable.bindAggregation("items","/data7",template1);

            debugger;
            var oMonthdrpdwnList = new sap.m.Select("select",{
            	maxWidth :"20%",
            	  items: [

            	    item1 =  new sap.ui.core.Item("item11", {text: "Jan",key:"01"}),
            	    item2 =  new sap.ui.core.Item("item12", {text: "Feb",key:"02"}),
            	    item3 =  new sap.ui.core.Item("item13", {text: "Mar",key:"03"}),
            	    item4 = new sap.ui.core.Item("item14", {text: "Apr",key:"04"}),
            	    item5 =  new sap.ui.core.Item("item15", {text: "May",key:"05"}),
            	    item6 = new sap.ui.core.Item("item112",{text: "Jun",key:"06"}),
            	    item7 = new sap.ui.core.Item("item16", {text: "Jul",key:"07"}),
            	      item8 = new sap.ui.core.Item("item17", {text: "Aug",key:"08"}),
            	      item9 = new sap.ui.core.Item("item18", {text: "Sep",key:"09"}),
            	      item10 = new sap.ui.core.Item("item19", {text: "Oct",key:"10"}),
            	      item11 = new sap.ui.core.Item("item110", {text: "Nov",key:"11"}),
            	      item12 = new sap.ui.core.Item("item111", {text: "Dec",key:"12"}),

             ],
//             selectionChange:oController.onMonthSelect,
             change:oController.onMonthSelect,

            	});
            sap.ui.getCore().byId("select").mProperties.selectedKey = "04"
//            sap.ui.getCore().byId("select").setSelectedItems([ item4 ])
            
//           var x = sap.ui.getCore().byId("select");
//           var y = x.mProperties.selectedKey;
//           console.log("x equals",x);
//           cosole.log("y equals",y);
		
//////////////		
		var accountOverviewTab = new sap.m.IconTabFilter({
			
			icon:"sap-icon://overview-chart",
//			iconColor: "Positive",
			text:"Annual",
			content:[Line,oPerformanceTable]
		});
		
		var creditInfoTab = new sap.m.IconTabFilter({
			
			icon:"sap-icon://product",
//			iconColor: "Critical",
			text:"Product Performance",
			content:[oMonthdrpdwnList,DualSC]
		});
		var profileTabFilter = new sap.m.IconTabBar({
			
			items:[accountOverviewTab,creditInfoTab],
			
		});
		var Z_DMA_oContainer = new sap.m.FlexBox({
				
				width:"100%",
				direction:"Column",
				items:[profileTabFilter]
				
			}).addStyleClass("Z_DMA_oContainer")
			
			return new sap.m.Page({
			title: "Statistical Representation",
			content: [Z_DMA_oContainer
			
			]
		});
	}

});