json = {root:[{ "title":"1", "url":"n1.png" }, 
{ "title":"2", "url":"n2.png" }, 
{ "title":"3", "url":"n3.png" }, 
{ "title":"4", "url":"n4.png" }, 
{ "title":"5", "url":"n5.png" }, 
{ "title":"6", "url":"n6.png" }, 
{ "title":"7", "url":"n7.png" }, 
{ "title":"8", "url":"n8.png" }, 
{ "title":"9", "url":"n9.png" }]}
Object {root: Array(9)}
var filteredJson = json.root.filter(function (row) {
if(row.title == "4") { console.log(row);return true; } 
else return false;

});
VM15175:2 Object {title: "4", url: "n4.png"}
