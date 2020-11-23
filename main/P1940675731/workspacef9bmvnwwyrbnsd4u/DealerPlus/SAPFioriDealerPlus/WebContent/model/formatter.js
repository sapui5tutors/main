sap.ui.define([], function () {
	"use strict";
	return {
		Status: function(oStatus){
			var loResourceBundle = this.getModel("i18n").getResourceBundle();
			switch (oStatus) {
			case "NR" :
				return loResourceBundle.getText("StatusNR")
			case "NS":
				return loResourceBundle.getText("StatusNS")
			case	"PS":
				return loResourceBundle.getText("StatusPS")
			case	"SH" :   
				return loResourceBundle.getText("StatusSH")
			case	"OP" :   
				return loResourceBundle.getText("StatusOP")
			case	"IP" :   
				return loResourceBundle.getText("StatusIP")
			case	"CP" :  
				return loResourceBundle.getText("StatusCP")
			case	"RJ" :   
				return loResourceBundle.getText("StatusRJ")
			case	"PR" :  
				return loResourceBundle.getText("StatusPR")
			case	"CB" :   
				return loResourceBundle.getText("StatusCB")
			case	"DB" :  
				return loResourceBundle.getText("StatusDB")
			case	"BL" :   
				return loResourceBundle.getText("StatusBL")
			case	"PB" :  
				return loResourceBundle.getText("StatusPB")
			case	"SV" :   
				return loResourceBundle.getText("StatusSV")
			}
		},
		
		DeliveryStatus: function(oStatus){
			var loResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (oStatus) {
			case "NR" :
				return loResourceBundle.getText("StatusNR")
			case "NS":
				return loResourceBundle.getText("StatusNS")
			case	"PS":
				return loResourceBundle.getText("StatusPS")
			case	"SH" :   
				return loResourceBundle.getText("StatusSH")
			case	"OP" :   
				return loResourceBundle.getText("StatusOP")
			case	"IP" :   
				return loResourceBundle.getText("StatusIP")
			case	"CP" :  
				return loResourceBundle.getText("StatusCP")
			case	"RJ" :   
				return loResourceBundle.getText("StatusRJ")
			case	"PR" :  
				return loResourceBundle.getText("StatusPR")
			case	"CB" :   
				return loResourceBundle.getText("StatusCB")
			case	"DB" :  
				return loResourceBundle.getText("StatusDB")
			case	"BL" :   
				return loResourceBundle.getText("StatusBL")
			case	"PB" :  
				return loResourceBundle.getText("StatusPB")
			case	"SV" :   
				return loResourceBundle.getText("StatusSV")
			}
		},
		
		DateFormat: function(oDate){
			if(oDate != null) {
				
				var loDate = oDate.substr(6,2);
				var loMonth = oDate.substr(4,2);
				var loYear = oDate.substr(0,4);
				
				var loFullDate = loYear+ "-" + loMonth + "-" + loDate;
				var loDateValue = new Date(loFullDate);
				return loDateValue.toDateString().substr("4");
			}
		},
		
		DeliveryDateState: function(oIndi){
			if(oIndi === "1")
			{
				this.setColor("red");
				return ("sap-icon://past");
			}
			else if(oIndi=== "2")
			{
				this.setColor("#d14a02");
				return ("sap-icon://present");
			}
			else if(oIndi === "3")
			{
				this.setColor("green");
				return ("sap-icon://future");
			}
			
		},
		
		DeliveryDateStatus : function(oIndi) {
			if(oIndi === "1")
			{
				return ("Error");
			}
			else if(oIndi=== "2")
			{
				return ("Warning");
			}
			else if(oIndi === "3")
			{
				return ("Success");
			}
			
		},
			
		DebitFormat: function(oDebit){
			if(oDebit==="H")
				this.setNumber("");
				this.setNumberUnit("");
		},
		CreditFormat: function(oCredit){
			if(oCredit==="S")
				this.setNumber("");
				this.setNumberUnit("");
			}
	};
});