jQuery.sap.require("sap/ui/thirdparty/d3");
//jQuery.sap.require("sap.st.Gauge.control.utils.Formatter");
jQuery.sap.declare("sap.st.Gauge.control.MiniGaugeItem");

sap.ui.core.Element.extend("sap.st.Gauge.control.MiniGaugeItem", { metadata : {
	properties : {
		"region" : {type : "string", group : "Misc", defaultValue : null},
		"budget" : {type : "string", group : "Misc", defaultValue : null},
		"best" : {type : "string", group : "Misc", defaultValue : null},
		"forecast" : {type : "string", group : "Misc", defaultValue : null},
		"worst" : {type : "string", group : "Misc", defaultValue : null},
		
		"MaxOutRad" : {type : "string", group : "Misc", defaultValue : null},
		"MaxInnRad" : {type : "string", group : "Misc", defaultValue : null},
		"BudOutRad" : {type : "string", group : "Misc", defaultValue : null},
		"BudInnRad" : {type : "string", group : "Misc", defaultValue : null},
		"ForOutRad" : {type : "string", group : "Misc", defaultValue : null},
		
		"ForInnRad" : {type : "string", group : "Misc", defaultValue : null},
		"BesOutRad" : {type : "string", group : "Misc", defaultValue : null},
		"BesInnRad" : {type : "string", group : "Misc", defaultValue : null},
		"WorOutRad" : {type : "string", group : "Misc", defaultValue : null},
		"WorInnRad" : {type : "string", group : "Misc", defaultValue : null}
	}
}});	
sap.ui.core.Control.extend("sap.st.Gauge.control.MiniGauge", {
	metadata : {
		properties: {
			"title": {type : "string", group : "Misc", defaultValue : "Minigauge Chart Title"}
		},
		aggregations : {
			"items" : { type: "sap.st.Gauge.control.MiniGaugeItem", multiple : true, singularName : "item"}
		}
		,
		defaultAggregation : "items",
		events: {
			"onPress" : {},
			"onChange":{}		
		}			
	},

	
	init : function() {
		console.log("sap.st.Gauge.control.MiniGauge.init()");
		this.sParentId = "";
	},
	
	
	createGauges : function() {
		console.log("sap.st.Gauge.control.MiniGauge.createGauges()");
		var oMiniGaugeLayout = new sap.m.VBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.Center});
		var oMiniGaugeFlexBox = new sap.m.FlexBox({height:"320px",alignItems:sap.m.FlexAlignItems.Center});		
		this.sParentId=oMiniGaugeFlexBox.getIdForLabel();
		oMiniGaugeLayout.addItem(oMiniGaugeFlexBox);
		
		
		
		return oMiniGaugeLayout;

	},


	/**
	 * The renderer render calls all the functions which are necessary to create the control,
	 * then it call the renderer of the vertical layout 
	 * @param oRm {RenderManager}
	 * @param oControl {Control}
	 */
	renderer : function(oRm, oControl) {
		var layout = oControl.createGauges();

		//layout.addStyleClass('pointer');
		
		// instead of "this" in the renderer function
		oRm.write("<div");
		oRm.writeControlData(layout); // writes the Control ID and enables event handling - important!
		oRm.writeClasses(); // there is no class to write, but this enables 
		// support for ColorBoxContainer.addStyleClass(...)
		
		oRm.write(">");
		oRm.renderControl(layout);
		oRm.addClass('verticalAlignment');

		oRm.write("</div>");
	
	},
	
	onAfterRendering: function(){
		console.log("sap.st.Gauge.control.MiniGauge.onAfterRendering()");
		console.log(this.sParentId);
		var cItems = this.getItems();
		var data = [];
		for (var i=0;i<cItems.length;i++){
			var oEntry = {};
			for (var j in cItems[i].mProperties) {
				oEntry[j]=cItems[i].mProperties[j];
			}					
			data.push(oEntry);
		}
		//console.log("Data:");
		//console.log(data);
		
		var vis = d3.select("#" + this.sParentId);
		
		var maxval = d3.max(data, function(d){
			return Math.max(d.budget, d.best, d.forecast, d.worst);});
		var cScale = d3.scale.linear()
			.domain([0, maxval])
			.range([0, 1.33 * Math.PI]);
		
		var bgarc = d3.svg.arc()
		.innerRadius(function(d){
			return (d.MaxInnRad);})
		.outerRadius(function(d){
			return (d.MaxOutRad);})
		.startAngle(0)
		.endAngle(cScale(maxval));
		
		var budgetarc = d3.svg.arc()
		.innerRadius(function(d){
			return (d.BudInnRad);})
		.outerRadius(function(d){
			return (d.BudOutRad);})
		.startAngle(0)
		.endAngle(function(d){
			return cScale(d.budget);});
		
		var bestarc = d3.svg.arc()
		.innerRadius(function(d){
			return (d.BesInnRad);})
		.outerRadius(function(d){
			return (d.BesOutRad);})
		.startAngle(0)
		.endAngle(function(d){
			return cScale(d.best);});
		
		var forecastarc = d3.svg.arc()
		.innerRadius(function(d){
			return (d.ForInnRad);})
		.outerRadius(function(d){
			return (d.ForOutRad);})
		.startAngle(0)
		.endAngle(function(d){
			return cScale(d.forecast);});
		
		var worstarc = d3.svg.arc()
		.innerRadius(function(d){
			return (d.WorInnRad);})
		.outerRadius(function(d){
			return (d.WorOutRad);})
		.startAngle(0)
		.endAngle(function(d){
			return cScale(d.worst);});

		var chart = vis.append("svg").attr("width", 800).attr("height", 320).style("background-color","white").selectAll("path").data(data).enter()
			.append("g").attr("transform", 
				function(d, i){ 
				return "translate(" + ((i*120)+150) + ",125)"
				});
		chart.append("path")
			.attr("d", bgarc)
			.style("fill", "#EEEEEE")
			.attr("transform", "rotate(-120)");
		chart.append("path")
			.attr("d", budgetarc)
			.style("fill", "darkblue")
			.attr("transform", "rotate(-120)");
		chart.append("path")
			.attr("d", bestarc)
			.style("fill", "green")
			.attr("transform", "rotate(-120)");
		chart.append("path")
			.attr("d", worstarc)
			.style("fill", "red")
			.attr("transform", "rotate(-120)");
		chart.append("path")
			.attr("d", forecastarc)
			.style("fill", "orange")
			.attr("transform", "rotate(-120)");
		//////////////////////////////
		chart.append("text")
		    .attr("text-anchor", "middle")
		    .text(function(d) {
		    	return d.region;
		    })
		   	.attr("font-family", "sans-serif")
		   	.attr("font-size", "16px")
		   	.attr("font-weight", "bold")
		   	.attr("fill", "darkgrey");
		///////////////////////////////
		chart.append("text")
			.attr("transform", "translate(0,14)")
		    .attr("text-anchor", "middle")
		    .text(function(d) {
		    	var formattedFC = d.forecast;
		    	return formattedFC;
			})
		   	.attr("font-family", "sans-serif")
		   	.attr("font-size", "14px")
		   	.attr("font-weight", "bold")
		   	.attr("fill", "orange");
		/////////////////////////////
		chart.append("text")
			.attr("transform", "translate(0,30)")
		    .attr("text-anchor", "middle")
		    .text(function(d) {
		    	var formattedBG = d.budget;
		    	return formattedBG;
			})
		   	.attr("font-family", "sans-serif")
		   	.attr("font-size", "14px")
		   	.attr("font-weight", "bold")
		   	.attr("fill", "darkblue");
		////////////////////////
		chart.append("text")
		.attr("transform", "translate(0,50)")
	    .attr("text-anchor", "middle")
	    .text(function(d) {
	    	var formattedBG ="Best:"+" "+ d.best;
	    	return formattedBG;
		})
	   	.attr("font-family", "sans-serif")
	   	.attr("font-size", "14px")
	   	.attr("font-weight", "bold")
	   	.attr("fill", "green");
		////////////////////
		chart.append("text")
		.attr("transform", "translate(0,65)")
	    .attr("text-anchor", "middle")
	    .text(function(d) {
	    	var formattedBG = "Worst:"+" "+d.worst;
	    	return formattedBG;
		})
	   	.attr("font-family", "sans-serif")
	   	.attr("font-size", "14px")
	   	.attr("font-weight", "bold")
	   	.attr("fill", "red");		
		
	}
	/////////////////////////////////////////

});
