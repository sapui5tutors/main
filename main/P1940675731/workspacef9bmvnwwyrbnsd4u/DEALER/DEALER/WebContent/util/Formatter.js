jQuery.sap.declare("com.vikalp.dealermgmt.util.Formatter");

  com.vikalp.dealermgmt.util.Formatter = {
		
		OrderDate : function(id){
			
			if(id != null){
			id1 = new Date(id).toUTCString();
//			date_value = id1.getDate();
//            mon_value = id.getMonth();
//            year_value  = id.getFullYear();
		var splt = id1.split(" ");
         
             switch (splt[2]){
              case  "Jan":
               {
	             mon_value = "January";
	              break;
               }
              case  "Feb":
               {
	             mon_value = "February";
	             break;
                }
              case  "Mar":
               {
	             mon_value = "March";
	             break;
               }
              case "Apr" :
               {
	             mon_value = "April";
	             break;
               }
              case  "May":
               {
	             mon_value = "May";
	             break;
               }
              case  "Jun":
               {
	             mon_value = "June";
	             break;
               }
              case  "Jul":
               {
	             mon_value = "July";
	             break;
               }
              case  "Aug":
               {
	             mon_value = "August";
	             break;
               }
              case  "Sep":
               {
	             mon_value = "September";
	            break;
              }
              case  "Oct":
               {
	             mon_value = "October";
	             break;
               }
              case  "Nov":
           	{ 
	             mon_value = "November";
	             break;
               }
              case  "Dec":
               {
	             mon_value = "December";
	             break;
               }
      }
	  
    var date = splt[1] + " " + mon_value +","+ splt[3]; 
    return date;
   }},
   
  
				
}