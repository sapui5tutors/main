/*
 * Extended Image Control with Zoom-in Functionality 
 */

sap.ui.commons.Image.extend('com.sapui5tutors.control.Image',{

	metadata : {  
		properties: {
			text: {
				type: "String",
				defaultValue:"Title"
			}

		},  

		// Added Aggregation for the Image

		aggregations: {

			"_overlay" : {

				type : "sap.ui.commons.Dialog",
				multiple : false,
				visibility:"hidden"

			}
		}
	},

	/*
	 * Initialize function
	 */

	init : function() {

		//Defining the Aggregation

		var oDialog = new sap.ui.commons.Dialog({
			title : "Zoomin Image",
			content: [
			          new sap.m.Image({

			        	  height: "200%",
			        	  width : "150%"
			          })

			          ]

		});

		//Setting the Aggregation in the Control

		this.setAggregation("_overlay" , oDialog);

	},

	/*
	 * Function is called when image is clicked.

	 */
	onclick: function(){

		// Get the Source Image

		var oImage = this.getSrc();

		// Get the inside Content

		var oContent = this.getAggregation("_overlay").getContent()[0];

		// Setting Image to the inside content

		oContent.setSrc(oImage);

		//Open the Aggreration

		this.getAggregation("_overlay").open();	


	},



	renderer : "sap.ui.commons.ImageRenderer"



});