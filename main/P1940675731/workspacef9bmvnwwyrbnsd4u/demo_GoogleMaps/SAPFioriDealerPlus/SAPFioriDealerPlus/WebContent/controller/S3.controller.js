sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"vikalp/cus/sd/dealer/plus/model/formatter",
	"sap/m/GroupHeaderListItem",
	"sap/m/MessageToast"

], function(Controller, formatter, GroupHeaderListItem, MessageToast) {
	"use strict";
	return Controller.extend("vikalp.cus.sd.dealer.plus.controller.S3", {

		formatter: formatter,

		/**
		 *
		 */
		onInit: function() {
			SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) { return elem.getScreenCTM().inverse().multiply(this.getScreenCTM()); };

			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
			
			
			/**
			 *
			 */
			if (this.extHookOnInit) {
				this.extHookOnInit();
			}

		},

		/**
		 *
		 * @param [object] oEvent
		 */
		_handleRouteMatched: function(oEvent) {
			var _self = this;
			var loObject = oEvent.getParameters().arguments;
			if (_self._isObjectEmpty(loObject)) {
				var loPath = loObject.cusId;
				var loPage = this.getView().getContent()[0];
				var loBindingPath = "/" + loPath;
				var loHeader = loPage.getContent()[0];
				var loHeaderPath = "dealer>" + loBindingPath;
				loHeader.bindElement(loHeaderPath);
				var loFlag = _self._getImageFlag(loBindingPath);
				if (loFlag.flag){				
					var loModel = this.getView().getModel("dealer");
					loHeader.setIcon(loModel.sServiceUrl+ "/CustomerImageSet('"+loFlag.CusId+"')/$value");
				}else{
					loHeader.setIcon(jQuery.sap.getModulePath("vikalp.cus.sd.dealer.plus") + "/img/home/icon_person.png");
				}
				
				
				var loContactList = this.getView().byId("contactslist");

				loContactList.bindItems({
					path: loHeaderPath + "/Contacts?$format=json",
					sorter: new sap.ui.model.Sorter("dealer>FirstName", false, function(oContext) {
						return {
							key: oContext.getProperty("NameChar")
						};
					}),
					template: new sap.m.ObjectListItem({
						title: "{dealer>FirstName} {dealer>LastName}",
						attributes: [new sap.m.ObjectAttribute({
							text: "{dealer>SalesOrgName}"
						}), new sap.m.ObjectAttribute({
							text: "{dealer>DistChannelName}"
						}), new sap.m.ObjectAttribute({
							text: "{dealer>DivisionName}"
						}), new sap.m.ObjectAttribute({
							text: "{dealer>Street}, {dealer>City} ,{dealer>PostlCod1}"
						})],
						firstStatus: new sap.m.ObjectStatus({
							text: "{dealer>Tel1Numbr}",
							icon: "sap-icon://iphone"
						}),
						secondStatus: new sap.m.ObjectStatus({
							text: "{dealer>EMail}",
							icon: "sap-icon://email"
						})

					})

				});
				// Config date value
				var loOrderList = this.getView().byId("idOrderTable");

				loOrderList.bindItems({
					path: loHeaderPath + "/SalesOrders",
					template: new sap.m.ColumnListItem({
						type: "Navigation",
						cells: [

							new sap.m.Text({
								text: "{dealer>SalesOrderNumber}"
							}),
							new sap.m.Text({
								text: {
									path: "dealer>ShippingStatusCode",
									formatter: formatter.Status
								}
							}),
							new sap.m.Text({
								text: {
									path: "dealer>OrderDate",
									type: "sap.ui.model.type.Date",
									formatOptions: {
										source: {
											pattern: "yyyyMMdd"
										}
									}
									//							        		formatter : formatter.DateFormat
								}
							}),
							new sap.m.Text({
								text: {
									path: "dealer>RequestedDate",
									type: "sap.ui.model.type.Date",
									formatOptions: {
										source: {
											pattern: "yyyyMMdd"
										}
									}
									//							        		formatter : formatter.DateFormat
								}
							}),
							new sap.m.ObjectNumber({
								number: {
									path: "dealer>TotalAmount",
									type: "sap.ui.model.type.Float",
									formatOptions: {
										groupingEnabled: true,
										groupingSeparator: ",",
										maxFractionDigits: 2
									}
								},
								numberUnit: "{dealer>Currency}"
							})
						],
						press: function(oPressEvt) {
							_self.onOrderPress(oPressEvt);
						}
					})
				});
				
				if(this._oOrderDialog){
					_self.onOrderFilter();
				}				
				var loCreditInfoPath = "dealer>/CreditInfoSet" + loPath.substr(11);
				var loCreditInfoForm = this.getView().byId("idCreditInfoForm");
				loCreditInfoForm.bindElement(loCreditInfoPath);

				//	      Returns Table
				var loReturnsList = this.getView().byId("idReturnsTable");

				loReturnsList.bindItems({
					path: loHeaderPath + "/ReturnOrders",
					template: new sap.m.ColumnListItem({
						type: "Navigation",
						cells: [

							new sap.m.Text({
								text: "{dealer>SalesOrderNumber}"
							}),
							new sap.m.Text({
								text: {
									path: "dealer>OrderDate",
									type: "sap.ui.model.type.Date",
									formatOptions: {
										source: {
											pattern: "yyyyMMdd"
										}
									}
								}
							}),
							new sap.m.ObjectNumber({
								number: {
									path: "dealer>NetPriceAmount",
									type: "sap.ui.model.type.Float",
									formatOptions: {
										groupingEnabled: true,
										groupingSeparator: ",",
										maxFractionDigits: 2
									}
								},
								numberUnit : "{dealer>Currency}" 
							}),
							new sap.m.Text({
								text: "{dealer>ReasonOfRejection}"
							})
						],
						press: function(oPressEvt) {
							_self.onReturnOrderPress(oPressEvt);
						}
					})
				});

				//					Past Sales Table

				var loPastSalesTable = this.getView().byId("idPastSalesTable");

				loPastSalesTable.bindItems({
					path: loHeaderPath + "/PastSales",
					template: new sap.m.ColumnListItem({
						cells: [
							new sap.m.Text({
								text: "{dealer>Material}"
							}),
							new sap.m.ObjectNumber({
								number: 
								{
									path : 'dealer>ReqQty',
									type: 'sap.ui.model.type.Float',
									formatOptions: { groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 0}
								},
								numberUnit : "{dealer>BaseUom}"
							}),
							new sap.m.ObjectNumber({
								number: 
								{
									path : 'dealer>DlvQty',
									type: 'sap.ui.model.type.Float',
									formatOptions: { groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 0}
								},
								numberUnit : "{dealer>BaseUom}"
							}),
							new sap.m.ObjectNumber({
								number: 
								{
									path : 'dealer>PendingQty',
									type: 'sap.ui.model.type.Float',
									formatOptions: { groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 0}
								},
								numberUnit : "{dealer>BaseUom}",
								state : "Error"
							}),
							new sap.m.ObjectNumber({
								number:
								{
									path : 'dealer>Returns',
									type: 'sap.ui.model.type.Float',
									formatOptions: { groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 0}
								},
								numberUnit : "{dealer>BaseUom}"
							})
						]
					})
				});
				//Past Sales Charts
				var loPastSalesCharts = this.getView().byId("idPastSalesColumnChart");

				var loDataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions: [{
							name: "{i18n>s3PSMaterial}",
							value: "{dealer>Material}"
						}, {
							name: "{i18n>s3PSDescription}",
							value: "{dealer>Description}"
						}

					],
					measures: [{
						name: "{i18n>s3PSQuantity}",
						axis: 1,
						value: "{dealer>Quantity}"
					}],
					data: {
						path: loHeaderPath + "/PastSalesSummary"
					}
				});
//				if (loPastSalesCharts.getDataset() === null) {
					loPastSalesCharts.setDataset(loDataset);
				
				var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": "{i18n>s3PSQuantity}"
				});

				var feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "categoryAxis",
					"type": "Dimension",
					"values": "{i18n>s3PSMaterial}"

				});
				var feedcolor = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "color",
					"type": "Dimension",
					"values": "{i18n>s3PSDescription}"

				});
				
				if (loPastSalesCharts.getFeeds().length === 0 ){
					loPastSalesCharts.addFeed(feedPrimaryValues);
					loPastSalesCharts.addFeed(feedAxisLabels);
					loPastSalesCharts.addFeed(feedcolor);
				}
				loPastSalesCharts.setVizProperties({
					legend: {
						title: {
							visible: true
						}
					},
					title: {
						visible: false
					}
				});
				
				var oPopover = new sap.viz.ui5.controls.Popover();
				oPopover.connect(loPastSalesCharts.getVizUid());
				//Past Sales Drill down Table
				var loPastSalesDrilldownTable = this.getView().byId("idPastSalesDrillDownTable");

				loPastSalesDrilldownTable.bindItems({
					path: loHeaderPath + "/PastSalesItem",
					template: new sap.m.ColumnListItem({
						cells: [
							new sap.m.Text({
								text: "{dealer>Material}"
							}),
							new sap.m.Text({
								text: "{dealer>SdDoc}"
							}),
							new sap.m.Text({
								text: "{dealer>Item}"
							}),
							new sap.m.Text({
								text: {
									path: "dealer>CreationDate",
									type: "sap.ui.model.type.Date",
									formatOptions: {
										source: {
											pattern: "yyyyMMdd"
										}
									}
								}
							}),
							new sap.m.Text({
								text: {
									path: "dealer>ReqDate",
									type: "sap.ui.model.type.Date",
									formatOptions: {
										source: {
											pattern: "yyyyMMdd"
										}
									}
								}
							}),
							new sap.m.Text({
								text: {
									path: "dealer>DlvDate",
									type: "sap.ui.model.type.Date",
									formatOptions: {
										source: {
											pattern: "yyyyMMdd"
										}
									}
									//							        		formatter : formatter.DateFormat
								}
							}),
							new sap.m.ObjectNumber({
								number:{
									path : 'dealer>ReqQty',
									type: 'sap.ui.model.type.Float',
									formatOptions: { groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 0}
								},
								numberUnit : "{dealer>BaseUom}"

							}),
							new sap.m.ObjectNumber({
								number: {
									path : 'dealer>DlvQty',
									type: 'sap.ui.model.type.Float',
									formatOptions: { groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 0}
								},
								numberUnit : "{dealer>BaseUom}"
							}),
							new sap.m.ObjectNumber({
								number: {
										path : 'dealer>PendingQty',
										type: 'sap.ui.model.type.Float',
										formatOptions: { groupingEnabled: true,
											groupingSeparator: ',',
											maxFractionDigits: 0}
								},
								numberUnit : "{dealer>BaseUom}",
								state: "Error"
							}),
							new sap.m.ObjectNumber({
								number: {
									path : 'dealer>Returns',
									type: 'sap.ui.model.type.Float',
									formatOptions: { groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 0}
								},
								numberUnit : "{dealer>BaseUom}"
							})
						]
					})
				});
				
				if(this._oPSDialog){                     
					_self.onPSDateFilter();
				}
				//Upcoming Deliveries Chart

				var loUpcomingDeliveriesCharts = this.getView().byId("idUpcomingDeliveriesColumnChart");

				var loUCDataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions: [{
						name: "{i18n>s3UDRequestedDate}",
						value: 
//							"{dealer>RequestedDate}"
							{
							path : "dealer>RequestedDate",
							formatter : formatter.DateFormat
							}

					}, {
						name: "{i18n>s3UDDescription}",
						value: "{dealer>Material}"
					}],

					measures: [{
						name: "{i18n>s3UDQuantity}",
						value: "{dealer>Quantity}"
					}],
					data: {
						path: loHeaderPath + "/UpcomingDeliveries"
					}
				});
//				if (loUpcomingDeliveriesCharts.getDataset() === null) {

				loUpcomingDeliveriesCharts.setDataset(loUCDataset);
				var feedQuantityValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "valueAxis",
					'type': "Measure",
					'values': "{i18n>s3UDQuantity}"
				});
				var feedPrimaryLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': "{i18n>s3UDRequestedDate}"

				});
				var feedUCAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "color",
					"type": "Dimension",
					"values": "{i18n>s3UDDescription}"

				});
				
				if (loUpcomingDeliveriesCharts.getFeeds().length === 0 ){
				loUpcomingDeliveriesCharts.addFeed(feedQuantityValues);
				loUpcomingDeliveriesCharts.addFeed(feedPrimaryLabels);
				loUpcomingDeliveriesCharts.addFeed(feedUCAxisLabels);
				}
				loUpcomingDeliveriesCharts.setVizProperties({
					legend: {
						title: {
							visible: true
						}
					},
					title: {
						visible: false
					}
				});
				var loUCPopover = new sap.viz.ui5.controls.Popover();
				loUCPopover.connect(loUpcomingDeliveriesCharts.getVizUid());
//				}

				//Upcoming Deliveries table
				var loUpcomingDeliveriesTable = this.getView().byId("idUpcomingDelTable");

				loUpcomingDeliveriesTable.bindItems({
					path: loHeaderPath + "/UpcomingDeliveries",
					template: new sap.m.ColumnListItem({
						cells: [
							new sap.ui.core.Icon({
								src: {
									path: "dealer>CfAmpel",
									formatter: formatter.DeliveryDateState
								}
							}),
							new sap.m.ObjectNumber({
								number: {
									path: "dealer>RequestedDate",
									type: "sap.ui.model.type.Date",
									formatOptions: {
										source: {
											pattern: "yyyyMMdd"
										}
									}
									//							        		formatter : formatter.DeliveryDate
								},
								state: {
									path: "dealer>CfAmpel",
									formatter: formatter.DeliveryDateStatus
								}
							}),
							new sap.m.Text({
								text: "{dealer>Description}"
							}),
							new sap.m.ObjectNumber({
								number: 
								{
									path : 'dealer>Quantity',
								    type: 'sap.ui.model.type.Float',
								    formatOptions: { groupingEnabled: true,
		                                            groupingSeparator: ',',
		                                           maxFractionDigits: 0}
								     },
							numberUnit : "{dealer>UnitOfMeasure}"
							}),
							new sap.m.Text({
								text: "{dealer>DocumentType}"
							}),
							new sap.m.Text({
								text: "{dealer>SalesOrderNumber}"
							}),
							new sap.m.Text({
								text: "{dealer>ItemNumber}"
							})
							
						]
					})
				});

				// Customer Ledger
				var loCustomerLedgerTable = this.getView().byId("idCustomerLedgerTable");

				loCustomerLedgerTable.bindItems({
					path: loHeaderPath + "/CustomerLedgers",
					template: new sap.m.ColumnListItem({
						cells: [
							new sap.m.Text({
								text: {
									path: "dealer>PstngDate",
									type: "sap.ui.model.type.Date",
									formatOptions: {
										source: {
											pattern: "yyyyMMdd"
										}
									}
								}
							}),
							new sap.m.Text({
								text: "{dealer>DocType}"
							}),
							new sap.m.Text({
								text: "{dealer>DocTypeTxt}"
							}),
							new sap.m.Text({
								text: "{dealer>BillDoc}"
							}),
							new sap.m.ObjectNumber({
								number: {
									parts : [{
									path: "dealer>LcAmount",
									type: "sap.ui.model.type.Float",
									formatOptions: {
										groupingEnabled: true,
										groupingSeparator: ",",
										maxFractionDigits: 2
									}
									},
									{
										path: "dealer>Currency"
									}
									]
								},
								emphasized: false,
								numberUnit: {
									path: "dealer>DbCrInd",
									formatter: formatter.DebitFormat
								}

							}),
							new sap.m.ObjectNumber({
								number: {
									parts : [{
									path: "dealer>LcAmount",
									type: "sap.ui.model.type.Float",
									formatOptions: {
										groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 2
									}
									},
									{
										path: "dealer>Currency"
									}
									]
								},
								emphasized: false,
								numberUnit: {
									path: "dealer>DbCrInd",
									formatter: formatter.CreditFormat
								}
							}),
							new sap.m.ObjectNumber({
								number: {
									path: "dealer>Balance",
									type: "sap.ui.model.type.Float",
									formatOptions: {
										groupingEnabled: true,
										groupingSeparator: ",",
										maxFractionDigits: 2
									}
								},
								numberUnit: "{dealer>Currency}"
								
							}),
							new sap.m.Text({
								text: "{dealer>ItemText}"
							})
						]
					})
				});
				
				if(this._oCLDialog){                             
					_self.onCLDateFilter();
				}
				//Ageing Report

				var loAgeingReportTable = this.getView().byId("idAgingReportTable");
				loAgeingReportTable.destroyColumns();
				
				var laColumn = ["{i18n>s3AgeingAmount}"];
				var laData = _self._getColumnField();
				for (var i = 0; i < laData.length; i++ ) {
					laColumn.push(laData[i].DayRange);
				}	
				
				for (var j = 0; j < laColumn.length; j++) {

					var loTableColumn = new sap.m.Column({
						minScreenWidth: "XLarge",
						demandPopin: true,
						header: new sap.m.Text({
							text: laColumn[j]

						})
					});
					loAgeingReportTable.addColumn(loTableColumn);

				}

				loAgeingReportTable.bindItems({
					path: loHeaderPath + "/AgeingSummary",
					template: new sap.m.ColumnListItem({
						cells: [
							new sap.m.Text({
								text: {
									path: "dealer>Amount",
									type: "sap.ui.model.type.Float",
									formatOptions: {
										groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 2
									}
								}
							}),
							new sap.m.Text({
								text: "{dealer>RangeDay1}"
							}),
							new sap.m.Text({
								text: "{dealer>RangeDay2}"
							}),
							new sap.m.Text({
								text: "{dealer>RangeDay3}"
							}),
							new sap.m.Text({
								text: "{dealer>RangeDay4}"
							}),
							new sap.m.Text({
								text: "{dealer>RangeDay5}"
							}),
							new sap.m.Text({
								text: "{dealer>RangeDay6}"
							})

						]
					})
				});

				var loAgeingPieCharts = this.getView().byId("idAgeingReportPieChart");

				var loAgeDataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions: [{
							name: "{i18n>s3AgePieDayRange}",
							value: "{dealer>DayRange}"
						}

					],
					measures: [{
						name: "{i18n>s3AgeingAmount}",
						value: "{dealer>Amount}"
					}],
					data: {
						path: loHeaderPath + "/AgeingPie"
					}
				});
				
//				if (loAgeingPieCharts.getDataset() === null) {

				loAgeingPieCharts.setDataset(loAgeDataset);
				var feedAgePrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "size",
					"type": "Measure",
					"values": "{i18n>s3AgeingAmount}"
				});

				var feedAgeAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "color",
					'type': "Dimension",
					'values': "{i18n>s3AgePieDayRange}"

				});
				if (loAgeingPieCharts.getFeeds().length === 0 ){
				loAgeingPieCharts.addFeed(feedAgePrimaryValues);
				loAgeingPieCharts.addFeed(feedAgeAxisLabels);
				}
				loAgeingPieCharts.setVizProperties({
					legend: {
						title: {
							visible: true
						}
					},
					title: {
						visible: false
					}
				});
				var loAgePopover = new sap.viz.ui5.controls.Popover();
				loAgePopover.connect(loAgeingPieCharts.getVizUid());
//				}

				var loAgeingTable = this.getView().byId("idAgingTable");
				loAgeingTable.bindItems({
					path: loHeaderPath + "/Ageing",
					template: new sap.m.ColumnListItem({
						cells: [
							new sap.m.Text({
								text: {
									path: "dealer>DueOn",
									type: "sap.ui.model.type.Date"
								}
							}),
							new sap.m.Text({
								text: "{dealer>OverdueDays}"
							}),
							new sap.m.Text({
								text: "{dealer>DocType}"
							}),
							new sap.m.Text({
								text: "{dealer>Docno}"
							}),
							new sap.m.Text({
								text: {
									path: "dealer>PostingDate",
									type: "sap.ui.model.type.Date"
								}
							}),
							new sap.m.ObjectNumber({
								number: {
									path: "dealer>Amount",
									type: "sap.ui.model.type.Float",
									formatOptions: {
										groupingEnabled: true,
										groupingSeparator: ',',
										maxFractionDigits: 2
									}
								},
								numberUnit: "{dealer>Currency}"
							})

						]
					})
				});
				//Ageing Line chart
				var loAgeingLineCharts = this.getView().byId("idVizFrameLine");

				var loAgeLineDataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions: [{
							name: "Document Number",
							value: "{dealer>Docno}"
						}

					],
					measures: [{
						name: 'Overdue Days',
						value: '{dealer>OverdueDays}'
					}, {
						name: 'Payment Terms',
						value: '{dealer>PmntTrms}'
					}],
					data: {
						path: loHeaderPath + "/Ageing"
					}
				});
//				if (loAgeingLineCharts.getDataset() === null) {
				loAgeingLineCharts.setDataset(loAgeLineDataset);
				var feedAgeLinePrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "valueAxis",
					'type': "Measure",
					'values': ["Overdue Days", "Payment Terms"]
				});

				var feedAgeLineAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["Document Number"]

				});
				var loAgeLinePopover = new sap.viz.ui5.controls.Popover();
				loAgeLinePopover.connect(loAgeingLineCharts.getVizUid());
				if (loAgeingLineCharts.getFeeds().length === 0 ){
				loAgeingLineCharts.addFeed(feedAgeLinePrimaryValues);
				loAgeingLineCharts.addFeed(feedAgeLineAxisLabels);
				}
				loAgeingLineCharts.setVizProperties({
					legend: {
						title: {
							visible: true
						}
					},
					title: {
						visible: false
					}
				});
//				}

			}
			
			/**
			 * @ControllerHook  
			 * 
			 */
			
			if (this.extHookOnHandleRouteMatched) {
				this.extHookOnHandleRouteMatched(oEvent);
			}
			
		},
		
	
		/**
		 * To get the Image flag 
		 * 
		 * @param [object] oEvent: Binding Path
		 */
		
		_getImageFlag: function(oPath) {
			
			var loFlag = {};
			var loModel = this.getView().getModel("dealer");
			var loPath = loModel.sServiceUrl+ oPath;
			OData.request({
				requestUri: loPath,
				method: "GET",
				async: false
			},
			function(oData) {
				loFlag.flag = oData.ImageFlag;
				loFlag.CusId= oData.CustomerId;

			}, function() {
				MessageToast.show("Read failed");
			}
		);
			return loFlag;
			
		},
		
		/**
		 * get the Ageing date busket
		 * 
		 */
		
		_getColumnField : function() {
			var _self = this;
			if (!this.raFieldData) {
				var loModel = this.getView().getModel("dealer");
				var oPath = loModel.sServiceUrl;
				var loHasher = sap.ui.core.routing.HashChanger.getInstance();
				var locurrentURL = "/" + loHasher.getHash().split("/")[1];
				OData.request({
						requestUri: oPath + locurrentURL + "/AgeingPie?$format=json",
						method: "GET",
						async: false
					},
					function(oData) {
						_self.raFieldData = oData.results;		

					}, function() {
						MessageToast.show("Read failed");
					}
				);

			}

			return _self.raFieldData;
		},

		/**
		 * Get Data for the Config date
		 *
		 * @param [object] oEvent
		 */
		_getData: function() {
			var _self = this;
			if (!this.raData) {
				var loConfigPath = "/PeriodSet?$format=json";
				var loModel = this.getView().getModel("dealer");
				var oPath = loModel.sServiceUrl + loConfigPath;
				OData.request({
						requestUri: oPath,
						method: "GET",
						async: false
					},
					function(oData) {
						_self.raData = oData.results;

					}, function() {
						MessageToast.show("Read failed");
					}
				);

			}

			return _self.raData;
		},
		
		/**
		 * On Click of the Sales Order
		 * 
		 */

		_getOrderDialog: function() {
			if (!this._oOrderDialog) {
				this._oOrderDialog = sap.ui.xmlfragment("vikalp.cus.sd.dealer.plus.view.Order", this);
				this.getView().addDependent(this._oOrderDialog);
			}
			return this._oOrderDialog;
		},

		/**
		 * on Filter button Press
		 *
		 * @param [object] oEvent
		 */
		onOrderFilterPress: function() {
			var loDialog = this._getOrderDialog();
			var laData = this._getData();
			var loContent = loDialog.getContent()[0].getContent();
			var loFromDate = loContent[1];
			var loToDate = loContent[3];

			if (loFromDate.getDateValue() === null && loToDate.getDateValue() === null) {
				if (laData.length > 0){
					loFromDate.setValue(laData[0].DateFrom);
					loToDate.setValue(laData[0].DateTo);
				}
				
			}
			loDialog.open();
		},

		/**
		 * On Close of Date Filter Menu
		 *
		 */
		onOrderCloseDialog: function() {
			this._getOrderDialog().close();
		},

		/**
		 * Date filter of Sales Order
		 *
		 */
		onOrderFilter: function() {
			var loView = this.getView();
			var loDialog = this._getOrderDialog();
			var loContent = loDialog.getContent()[0].getContent();
			var loFromDate = loContent[1];
			var loToDate = loContent[3];
			var loTable = loView.byId("idOrderTable");
			var loToDateValue = loToDate.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var loFromDateValue = loFromDate.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var laFilter = [];
			var loToFilter = new sap.ui.model.Filter("OrderDate", sap.ui.model.FilterOperator.LE, loToDateValue);
			var loFromFilter = new sap.ui.model.Filter("OrderDate", sap.ui.model.FilterOperator.GE, loFromDateValue);
			laFilter.push(loToFilter);
			laFilter.push(loFromFilter);
			var loFilters = new sap.ui.model.Filter(laFilter, true);
			var loBinding = loTable.getBinding("items");
			loBinding.filter(loFilters, sap.ui.model.FilterType.Application);
			loDialog.close();
		},

		/**
		 * On Close of Filter Menu
		 *
		 */

		_getCLDialog: function() {
			if (!this._oCLDialog) {
				this._oCLDialog = sap.ui.xmlfragment("vikalp.cus.sd.dealer.plus.view.CustomerLedger", this);
				this.getView().addDependent(this._oCLDialog);
			}
			return this._oCLDialog;
		},

		/**
		 * On click of Customer Ledger filter button 
		 *
		 *
		 */
		onCLFilterPress: function() {

			var loDialog = this._getCLDialog();
			var laData = this._getData();
			var loContent = loDialog.getContent()[0].getContent();
			var loFromDate = loContent[1];
			var loToDate = loContent[3];

			if (loFromDate.getDateValue() === null && loToDate.getDateValue() === null) {
				if (laData.length > 0){
				loFromDate.setValue(laData[0].DateFrom);
				loToDate.setValue(laData[0].DateTo);
				}
			}
			loDialog.open();
		},

		/**
		 *
		 *
		 */
		onCLCloseDialog: function() {
			this._getCLDialog().close();
		},
		/**
		 *
		 * Date Filter of Customer Ledger
		 */

		onCLDateFilter: function() {

			var loView = this.getView();
			var loDialog = this._getCLDialog();
			var loContent = loDialog.getContent()[0].getContent();
			var loFromDate = loContent[1];
			var loToDate = loContent[3];
			var loTable = loView.byId("idCustomerLedgerTable");
			var loToDateValue = loToDate.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var loFromDateValue = loFromDate.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var laFilter = [];
			var loToFilter = new sap.ui.model.Filter("PstngDate", sap.ui.model.FilterOperator.LE, loToDateValue);
			var loFromFilter = new sap.ui.model.Filter("PstngDate", sap.ui.model.FilterOperator.GE, loFromDateValue);
			laFilter.push(loToFilter);
			laFilter.push(loFromFilter);
			var loFilters = new sap.ui.model.Filter(laFilter, true);
			var loBinding = loTable.getBinding("items");
			loBinding.filter(loFilters, sap.ui.model.FilterType.Application);
			loDialog.close();
		},

		/**
		 * Getting reference of the Past Sales Fragment
		 *
		 */

		_getPSDialog: function() {
			if (!this._oPSDialog) {
				this._oPSDialog = sap.ui.xmlfragment("vikalp.cus.sd.dealer.plus.view.PastSales", this);
				this.getView().addDependent(this._oPSDialog);
			}
			return this._oPSDialog;
		},

		/**
		 * On Click of close button of Past Sales filter menu
		 *
		 *
		 */

		onPSCloseDialog: function() {
			this._getPSDialog().close();
		},

		/**
		 * On Press of Past Sales filter button
		 *
		 */
		onPSFilterPress: function() {

			var loDialog = this._getPSDialog();
			var laData = this._getData();
			var loContent = loDialog.getContent()[0].getContent();
			var loFromDate = loContent[1];
			var loToDate = loContent[3];

			if (loFromDate.getDateValue() === null && loToDate.getDateValue() === null) {
				if (laData.length > 0){
				loFromDate.setValue(laData[0].DateFrom);
				loToDate.setValue(laData[0].DateTo);
				}
			}
			loDialog.open();

		},

		/**
		 * Date filter of Past Sales
		 *
		 */

		onPSDateFilter: function() {

			var loView = this.getView();
			var loDialog = this._getPSDialog();
			var loContent = loDialog.getContent()[0].getContent();
			var loFromDate = loContent[1];
			var loToDate = loContent[3];
			var loTable = loView.byId("idPastSalesDrillDownTable");
			var loToDateValue = loToDate.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var loFromDateValue = loFromDate.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var laFilter = [];
			var loToFilter = new sap.ui.model.Filter("CreationDate", sap.ui.model.FilterOperator.LE, loToDateValue);
			var loFromFilter = new sap.ui.model.Filter("CreationDate", sap.ui.model.FilterOperator.GE, loFromDateValue);
			laFilter.push(loToFilter);
			laFilter.push(loFromFilter);
			var loFilters = new sap.ui.model.Filter(laFilter, true);
			var loBinding = loTable.getBinding("items");
			loBinding.filter(loFilters, sap.ui.model.FilterType.Application);
			loDialog.close();

		},

		/**
		 * To Show/Hide the Past sales filter button
		 *
		 * @param [object] oEvent
		 */

		onPSContentChange: function(oEvent) {
			var loButton = this.getView().byId("idPSIcon");
			var loSelectedId = oEvent.getParameters().selectedItemId.split("--")[1];
			if (loSelectedId === "idPastSalesDrillDownTable") {
				loButton.setVisible(true);
			} else {
				loButton.setVisible(false);
			}

		},

		/**
		 * on Press of Order
		 *
		 * @param [object] oEvent
		 */
		onOrderPress: function(oEvent) {
			var loPath = oEvent.getSource().getBindingContext("dealer").getPath().substr(1);
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("order", {
				order: loPath
			});
		},
		/**
		 * On Press of Return Order
		 *
		 * @param [object] oEvent
		 */
		onReturnOrderPress: function(oEvent) {
			var loPath = oEvent.getSource().getBindingContext("dealer").getPath().substr(1);
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("return", {
				rOrder: loPath
			});
		},

		/**
		 * On press of chart button of Past Sales Tab
		 *
		 * @param [object] oEvent
		 */
		onPastSalesChartPress: function() {
			var loPastSalesChart = this.getView().byId("idPastSalesColumnChart");
			var loPastSalesTable = this.getView().byId("idPastSalesTable");
			this.getView().byId("idPastSalesdrilldownbuttons").setVisible(false);
			this.getView().byId("idPastSalesDrillDownTable").setVisible(false);
			if (loPastSalesChart.getVisible() === false) {
				loPastSalesChart.setVisible(true);
				loPastSalesTable.setVisible(false);
			}
		},

		/**
		 * On press of Grid button of Past Sales Tab
		 *
		 * @param [object] oEvent
		 */
		onPastSalesGridPress: function() {
			var loPastSalesChart = this.getView().byId("idPastSalesColumnChart");
			var loPastSalesTable = this.getView().byId("idPastSalesTable");
			this.getView().byId("idPastSalesDrillDownTable").setVisible(false);

			if (loPastSalesTable.getVisible() === false) {
				loPastSalesTable.setVisible(true);
				loPastSalesChart.setVisible(false);
			}
		},
		
		/**
		 * On press of Chart button of Upcoming Deliveries Tab
		 */
		
		onUpcomingDeliveriesChartPress: function() {
			this.getView().byId("idUpcomingDelTable").setVisible(false);
			this.getView().byId("idUpcomingDeliveriesColumnChart").setVisible(true);

		},
		
		/**
		 * On press of Grid button of Upcoming Deliveries Tab
		 */
		
		onUpcomingDeliveriesGridPress: function() {
			this.getView().byId("idUpcomingDeliveriesColumnChart").setVisible(false);
			this.getView().byId("idUpcomingDelTable").setVisible(true);

		},

		/**
		 * On press of Pie button of Ageing Tab
		 */
		
		onAgeingPiePress: function() {
			var loAgeingReportTable = this.getView().byId("idAgingReportTable");
			var loAgeingReportPie = this.getView().byId("idAgeingReportPieChart");
			var loAgeingTable = this.getView().byId("idAgingTable");
			var loAgeingReportLine = this.getView().byId("idVizFrameLine");

			loAgeingReportTable.setVisible(true);
			loAgeingReportPie.setVisible(true);
			loAgeingTable.setVisible(false);
			loAgeingReportLine.setVisible(false);

		},

		/**
		 * On press of Grid button of Ageing Tab
		 */
		
		onAgeingGridPress: function() {
			var loAgeingReportTable = this.getView().byId("idAgingReportTable");
			var loAgeingReportPie = this.getView().byId("idAgeingReportPieChart");
			var loAgeingTable = this.getView().byId("idAgingTable");
			var loAgeingReportLine = this.getView().byId("idVizFrameLine");

			loAgeingReportTable.setVisible(false);
			loAgeingReportPie.setVisible(false);
			loAgeingTable.setVisible(true);
			loAgeingReportLine.setVisible(false);

		},
		
		/**
		 * On press of Line Chart button of Ageing Tab
		 */

		onAgeingLineChartPress: function() {
			var loAgeingReportTable = this.getView().byId("idAgingReportTable");
			var loAgeingReportPie = this.getView().byId("idAgeingReportPieChart");
			var loAgeingTable = this.getView().byId("idAgingTable");
			var loAgeingReportLine = this.getView().byId("idVizFrameLine");

			loAgeingReportTable.setVisible(false);
			loAgeingReportPie.setVisible(false);
			loAgeingTable.setVisible(false);
			loAgeingReportLine.setVisible(true);
		},
		
		/**
		 * On press of Grid button of Past Sales Tab
		 */

		onPastSalesDrillDownPress: function() {
			var loPastSalesToolbar = this.getView().byId("idPastSalesdrilldownbuttons");
			loPastSalesToolbar.setVisible(true);
		},
		
		/**
		 * On press of DrillDown Table button of Past Sales Tab
		 */

		onPastSalesDrillDownTableClick: function() {
			var loPastSalesToolbar1 = this.getView().byId("idPastSalesTable");
			loPastSalesToolbar1.setVisible(false);
			var loPastSalesToolbar3 = this.getView().byId("idPastSalesColumnChart");
			loPastSalesToolbar3.setVisible(false);
			var loPastSalesToolbar2 = this.getView().byId("idPastSalesDrillDownTable");
			loPastSalesToolbar2.setVisible(true);
		},

		/**
		 * get the Count for Detail Tab
		 *
		 * @param [object] oEvent
		 */
		onGetCount: function(oEvent) {
			var loContent = oEvent.getSource();
			var loTab = loContent.getParent();
			var loKey = loTab.getKey();

			if (loKey === "Contacts") {
				var loCount;
				var loModel = this.getView().getModel("dealer");
				var oPath = loModel.sServiceUrl;
				var loHasher = sap.ui.core.routing.HashChanger.getInstance();
				var locurrentURL = "/" + loHasher.getHash().split("/")[1];
				OData.request({
						requestUri: oPath + locurrentURL + "/Contacts/$count",
						method: "GET",
						async: false
					},
					function(oData) {
						loCount = oData;

					}, function() {
						MessageToast.show("Read failed");
					}
				);
				loTab.setCount(loCount);
			} else if (loKey === "Orders") {
				loTab.setCount(loContent.getGrowingInfo().total);
			} else if (loKey === "Returns") {
				loTab.setCount(loContent.getGrowingInfo().total);
			} else if (loKey === "Customer Ledger") {
				loTab.setCount(loContent.getGrowingInfo().total - 1);
			}

		},

		/**
		 * Get the count for Upcomming Delivery
		 *
		 * @param [object] oEvent
		 */

		onUCGetCount: function(oEvent) {

			var loContent = oEvent.getSource();
			var loTab = this.getView().byId("idUCTabFilter");
			loTab.setCount(loContent.getGrowingInfo().total);

		},

		/**
		 * On date Change
		 *
		 * @param [object] oEvent
		 */
		onDateChange: function() {
			var loToDateValue = this.getView().byId("ToDate");
			var loToDate = loToDateValue.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var loFromDateValue = this.getView().byId("FromDate");
			var loFromDate = loFromDateValue.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var loOrderTable = this.getView().byId("idOrderTable");
			var laFilter = [];
			var loToFilter = new sap.ui.model.Filter("OrderDate", sap.ui.model.FilterOperator.LE, loToDate);
			var loFromFilter = new sap.ui.model.Filter("OrderDate", sap.ui.model.FilterOperator.GE, loFromDate);
			laFilter.push(loToFilter);
			laFilter.push(loFromFilter);
			var loFilters = new sap.ui.model.Filter(laFilter, true);
			var loBinding = loOrderTable.getBinding("items");
			loBinding.filter(loFilters, sap.ui.model.FilterType.Application);

		},

		/**
		 * On date Change Past Sales
		 *
		 * @param [object] oEvent
		 */
		onDateChangePS: function() {
			var loToDateValue = this.getView().byId("ToDatePS");
			var loToDate = loToDateValue.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var loFromDateValue = this.getView().byId("FromDatePS");
			var loFromDate = loFromDateValue.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var loOrderTable = this.getView().byId("idPastSalesDrillDownTable");
			var laFilter = [];
			var loToFilter = new sap.ui.model.Filter("CreationDate", sap.ui.model.FilterOperator.LE, loToDate);
			var loFromFilter = new sap.ui.model.Filter("CreationDate", sap.ui.model.FilterOperator.GE, loFromDate);
			laFilter.push(loToFilter);
			laFilter.push(loFromFilter);
			var loFilters = new sap.ui.model.Filter(laFilter, true);
			var loBinding = loOrderTable.getBinding("items");
			loBinding.filter(loFilters, sap.ui.model.FilterType.Application);

		},

		/**
		 * On Customer Ledger date Change
		 *
		 * @param [object] oEvent
		 */
		onDateChangeCL: function() {
			var loToDateValue = this.getView().byId("ToDateCL");
			var loToDate = loToDateValue.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var loFromDateValue = this.getView().byId("FromDateCL");
			var loFromDate = loFromDateValue.getDateValue().toISOString().slice(0, 10).replace(/-/g, "");
			var loCustomerLedgerTable = this.getView().byId("idCustomerLedgerTable");
			var laFilter = [];
			var loToFilter = new sap.ui.model.Filter("PstngDate", sap.ui.model.FilterOperator.LE, loToDate);
			var loFromFilter = new sap.ui.model.Filter("PstngDate", sap.ui.model.FilterOperator.GE, loFromDate);
			laFilter.push(loToFilter);
			laFilter.push(loFromFilter);
			var loFilters = new sap.ui.model.Filter(laFilter, true);
			var loBinding = loCustomerLedgerTable.getBinding("items");
			loBinding.filter(loFilters, sap.ui.model.FilterType.Application);

		},

		/**
		 * On Click of the Back Button
		 */
		onBackPress: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("main");
		},

		/**
		 * On Search of the Orders.
		 *
		 * @param [object] oEvent : Search Field
		 */
		onOrderSearch: function(oEvent) {
			var laFilter = [];
			var loValue = oEvent.getSource().getValue();
			var loTable = this.getView().byId("idOrderTable");
			var laParam = ["SalesOrderNumber"];
			for (var i = 0; i < laParam.length; i++) {

				var filter = new sap.ui.model.Filter(laParam[i], sap.ui.model.FilterOperator.Contains, loValue);
				laFilter.push(filter);
			}

			var loFilters = new sap.ui.model.Filter(laFilter, false);
			var loBinding = loTable.getBinding("items");
			loBinding.filter(loFilters, sap.ui.model.FilterType.Application);

		},
		/**
		 * On Change of FromDate in the filter manu
		 *
		 * @param [object] oEvent : Selected Date Object
		 */
		handleChange: function(oEvent){
			var loFromDate = oEvent.getSource();
			var loToDate = loFromDate.getParent().getContent()[3];
			var loSelectedFromDate = loFromDate.getDateValue().getTime();
			var loSelectedToDate = loToDate.getDateValue().getTime();
			var loTodayDate = new Date();
			if(loSelectedFromDate>loTodayDate.getTime() || loSelectedFromDate>loSelectedToDate) {
				loFromDate.setValueState("Warning");
				loFromDate.setValue(null);
				return;
				}
			if((loSelectedFromDate<=loTodayDate.getTime() && loSelectedFromDate<loSelectedToDate)||(loSelectedToDate<loTodayDate.getTime())){
				loFromDate.setValueState("None");
				loToDate.setValueState("None");
		       }
		},
		
		/**
		 * On Change of TODate in the Filter Menu
		 * 
		 *  @param [object] oEvent : Selected Date Object
		 */
		handleChangeTo: function(oEvent){
			var loToDate = oEvent.getSource();
			var loFromDate = loToDate.getParent().getContent()[1];
			var loSelectedFromDate = loFromDate.getDateValue().getTime();
			var loSelectedToDate = loToDate.getDateValue().getTime();
			var loTodayDate = new Date();
			if(loSelectedToDate<loSelectedFromDate || loSelectedToDate>loTodayDate.getTime()){
				loToDate.setValueState("Warning");
				loToDate.setValue(null); 
				return;
				}
			if((loSelectedFromDate<=loTodayDate.getTime() && loSelectedFromDate<loSelectedToDate)||(loSelectedToDate<loTodayDate.getTime())){
				loFromDate.setValueState("None");
				loToDate.setValueState("None");
		       }
		},
		
		/**
		 * To check the Object is Empty or Not
		 *
		 * @param [object] oEvent : Router argument Object
		 */
		_isObjectEmpty: function(oEvent) {
			for (var key in oEvent) {
				if (key === "cusId") {
					return true;
				}
			}
			return false;
		}

	});
});